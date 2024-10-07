const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createConnection, authPlugins } = require('mysql2');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables based on the NODE_ENV, which can be sent either by pm2 when a  Jenkins pipeline is triggered
// or via the package.json scripts when executed in the local machine
const envFile = process.env.NODE_ENV === 'development' 
  ? path.resolve(__dirname, '.env.development') 
  : process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, '.env.test')
  : path.resolve(__dirname, '.env.production');

  console.log(`envFile: ${envFile}`);

  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
  } else {
    console.error(`Warning: ${envFile} does not exist. Using default environment variables or process.env.`);
  }

const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Midlleware error handling function
app.use((error, req, res, next) =>{
  console.log(`Middleware error: ${error}`);
  res.status(err.status).json({message: err.message});
})

// class for throwing errors, with customized messages
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode <= 400 && statusCode < 500 ? 'fail' : 'error';
  }
}

app.listen(4000, ()=> {
    console.log('Listening on port 4000...');
})


// Generate the pre-signed URL required for accessing private S3 objects
async function generatePreSignedUrl({ bucket, key }) {

  const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
  const { getSignedUrl }  = require("@aws-sdk/s3-request-presigner");

  // No need to pass the object with the region and the credentials to the S3 as this parameters were configured in AWS CLI by running the AWS CONFIGURE command in both the EC2 instance and the dev environment
  const client = new S3Client();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const url = (await getSignedUrl(client, command));
  return JSON.stringify(url);
}

async function connectToDb(){
  const dbConnection = createConnection({
      host: config.dbHost,
      user: config.dbUserName,
      password: config.dbSecret,
      database: config.dbName,
      // authPlugins: {
      //   mysql_clear_password: authPlugins.mysql_clear_password
      // }
  });

  return dbConnection;
}

app.get('/thumbnails/:thumbnail', async (req, res) => {

  const { GetObjectCommand, S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

  const client = new S3Client({
      region: "us-east-2",
  });

  const command = new GetObjectCommand({
      Bucket: 'vegan-mundi-thumbnail',
      Key: `${req.params.thumbnail}`,
  });

  const data = await client.send(command);

  res.send(data);

});

// GET ALL FREE CLASSES (VEGAN-MUNDI.CLASSES.CATEGORY_ID = 1)
app.get('/classes/free', async (req, res) => {
    const dbConnection = await connectToDb();

    try {

        dbConnection.query(
          'SELECT RCP.RECIPE_ID, RCP.TITLE, RCP.DESCRIPTION, RCP.PHOTO, RCP.VIDEO, RCP.PUBLISH_DATE, RCP.DISPLAY_ORDER ' +
          ' FROM ' + 
          ' CLASS CLS' +  
          '  INNER JOIN CLASS_RECIPE CLR ON' + 
          '    CLS.CLASS_ID = CLR.CLASS_ID ' + 
          '    AND CLS.CATEGORY_ID = 1' + 
          '  INNER JOIN RECIPE RCP ON  ' + 
          '    CLR.RECIPE_ID = RCP.RECIPE_ID' +
          '  ORDER BY DISPLAY_ORDER', 
          function (err, result, fields)
           {
            if (err) throw err;
            res.send(result);
        });

      } catch (err) {
        console.log(err);
      }
      finally{
        dbConnection.end();
      }
})


// -------------------- CLASSES CATEGORIES --------------------

// GET CLASSES CATALOG (VEGAN-MUNDI.CLASSES.CATEGORY_ID IN (2, 3, 4, 5))

app.get('/classes/categories', async (req, res) => {

  const dbConnection = await connectToDb();

  try {

      dbConnection.query('SELECT * FROM CLASS_CATEGORY WHERE CATEGORY_ID IN (2, 3, 4) ORDER BY DISPLAY_ORDER', function (err, result, fields) {
          if (err) throw err;
          res.send(result);
      });

    } catch (err) {
      console.log(err);
    }
    finally{
      dbConnection.end();
    }

})

app.get('/classes/category/:category', async (req, res) => {
  const dbConnection = await connectToDb();

  try {

      dbConnection.query(`SELECT DISTINCT CAT.TITLE AS CATEGORY_TITLE, CLS.CATEGORY_ID, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO , ` +
                        ` ( SELECT GROUP_CONCAT(TITLE SEPARATOR '|') 
                            FROM 
                              RECIPE R 
                                INNER JOIN CLASS_RECIPE C ON 
                                  R.RECIPE_ID = C.RECIPE_ID 
                                  AND C.CLASS_ID = CLS.CLASS_ID
                                  AND (SELECT COUNT(TITLE) FROM RECIPE R INNER JOIN CLASS_RECIPE C ON R.RECIPE_ID = C.RECIPE_ID AND C.CLASS_ID = CLS.CLASS_ID ) > 1
                              ) CLASSES_LIST ` + 
                      ` FROM ` +
                        ` CLASS_CATEGORY CAT ` + 
                        ` INNER JOIN CLASS CLS ON ` +
                        `   CAT.CATEGORY_ID = CLS.CATEGORY_ID ` + 
                        `   AND UPPER(CAT.CATEGORY_ID) = ${req.params.category} ` + 
                        ` INNER JOIN CLASS_RECIPE CLR ON ` +
                        `   CLS.CLASS_ID = CLR.CLASS_ID ` +
                        ` INNER JOIN RECIPE RCP ON ` +
                        `   CLR.RECIPE_ID = RCP.RECIPE_ID `,
        function (err, result, fields)
         {
          if (err) throw err;

          // Adds the description of the category being searched by its ID to the returned result, so the front-end doesn't  need
          // to make another call just to get the description of the gaterory based onits ID
          const categoryTitle= result[0].CATEGORY_TITLE;
          const resultObject = {
            categoryTitle,
            classes: result,
          }
          res.send(resultObject);
      });

    } catch (err) {
      console.log(err);
    }
    finally{
      dbConnection.end();
    }
})


// -------------------- SEARCH FOR CLASSES WITH KEYWORD TYPED IN THE SEARCH INPUT --------------------

app.get('/classes/filter/:keyword', async (req, res) => {

  const dbConnection = await connectToDb();

  try {

      dbConnection.query(
        `SELECT DISTINCT CLS.CATEGORY_ID, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO, ` +
        ` ( SELECT GROUP_CONCAT(TITLE SEPARATOR '|') 
            FROM 
            RECIPE R 
              INNER JOIN CLASS_RECIPE C ON 
                R.RECIPE_ID = C.RECIPE_ID 
                AND C.CLASS_ID = CLS.CLASS_ID
                AND (SELECT COUNT(TITLE) FROM RECIPE R INNER JOIN CLASS_RECIPE C ON R.RECIPE_ID = C.RECIPE_ID AND C.CLASS_ID = CLS.CLASS_ID ) > 1
            ) CLASSES_LIST ` + 
         ` FROM ` +
         ` CLASS CLS ` +
         ` INNER JOIN CLASS_RECIPE CLR ON ` +
         `   CLS.CLASS_ID = CLR.CLASS_ID ` +
         ` INNER JOIN RECIPE RCP ON ` +
         `   CLR.RECIPE_ID = RCP.RECIPE_ID ` +
         `   AND RCP.KEYWORD LIKE '%${req.params.keyword}%'`,
        function (err, result, fields)
         {
          if (err) throw err;
          res.send(result);
      });

    } catch (err) {
      console.log(err);
    }
    finally{
      dbConnection.end();
    }
})

app.get('/delivery-methods', async (req, res) => {

  const dbConnection = await connectToDb();

  try {

      dbConnection.query('SELECT * FROM DELIVERY_METHOD ORDER BY DISPLAY_ORDER', function (err, result, fields) {
          if (err) throw err;
          res.send(result);
      });

    } catch (err) {
      console.log(err);
    }
    finally{
      dbConnection.end();
    }

})

// GET THUMBNAIL FOR A SPECIFIC CLASS

app.get('/assets/thumbnails/:pictureName', (req, res) => {
  
  const dir = `${__dirname}\/assets\/thumbnails\/`;
  res.sendFile(`${dir}${req.params.pictureName}`);
})



// -------------------- VIDEOS --------------------

// GET THE VIDEO FOR A SPECIFIC CLASS

app.get('/assets/videos/:videoName', (req, res) => {
  const dir = `${__dirname}\/assets\/videos\/`;
  res.sendFile(`${dir}${req.params.videoName}`);
})


// -------------------- PRICES --------------------

// GET A LIST OF PRICES

app.get('/prices', async (req, res) => {

  const dbConnection = await connectToDb();

  try {
      dbConnection.query('SELECT * FROM PRICE', function (err, result) {
          if (err) throw err;
          res.send(result);
      });

    } catch (err) {
      console.log(err);
    }
    finally{
      dbConnection.end();
    }

})

// -------------------- GALLERY --------------------

// GET A LIST OF THE GALLERYS PICTURES

app.get('/gallery', async (req, res) => {


  const dbConnection = await connectToDb();

  try {

      dbConnection.query('SELECT * FROM GALLERY', function (err, result) {
          if (err) throw err;
          res.send(result);
      });

    } catch (err) {
      console.log(err);
    }
    finally{
      dbConnection.end();
    }

})

// GET THE PICTURE OF A SPECIFIC GALLERY ITEM

app.get('/gallery/picture/:pictureName', (req, res) => {
  
  const dir = `${__dirname}\/assets\/gallery\/`;
  res.sendFile(`${dir}${req.params.pictureName}`);
})

//  Get any S3 object based on the bucket name and the object name (key)
// API call example:
app.get('/s3/:bucket/:key' , async (req, res) => {

  try {

    const clientUrl = await generatePreSignedUrl({
      bucket: `${req.params.bucket}`,
      key: `${req.params.key}`,
    });

    res.send(clientUrl);

  } catch (err) {
    console.error(err);
  }

})


// -------------------- USER --------------------

// CREATE NEW USER ACCOUNT

app.post('/account/create', async (req, res, next) => {
  const dbConnection = await connectToDb();
  const {firstName, lastName, email, password} = req.body;

  // Hash the password with bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  dbConnection.query(
      `INSERT INTO ACCOUNT VALUES(
        '${email}', 
        '${firstName}', 
        '${lastName}', 
        '${hashedPassword}')`,
    (err, result) => {
      if (err)if(err.code === 'ER_DUP_ENTRY') {
        next(new CustomError(`There is already an account registered with the e-mail '${email}'`, 400));
      }
      else {
        next(new CustomError("There was an error while creating your account", 500));
      }
      else {
        dbConnection.end();          
        res.status(200).send("Account created successfully");
      }
        
  });
})


// SIGNIN

app.post('/signin', async (req, res, next) => {
  const dbConnection = await connectToDb();
  const {email, password} = req.body;

  dbConnection.query(
      `SELECT * FROM ACCOUNT WHERE EMAIL = '${email}'`,
    (err, result) => {
      if (err) {
        next(new CustomError(`There was an error while signin in`, 500));
        return;
      }
      else if (result.length === 0) {
          next(new CustomError(`There e-mail ${email} is not registered in this site`, 400));
          return;
      }
      else {

        bcrypt.compare(password, result[0].PASSWORD, (err, result) => {
          if (err) {
            next(new CustomError(`There was an error while signin in`, 500));
            return;
          }
          else {
            if (result) {
              res.status(200).send("Signin successfull");
            }
            else {
              console.log("Invalid credentials")
              next(new CustomError(`Invalid credentials`, 400));
            }
          }
        });
      }

      dbConnection.end();          

  });
})