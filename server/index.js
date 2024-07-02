const express = require ('express');
const cors = require('cors');
const { createConnection, authPlugins } = require('mysql2');
const config = require('./config');

const app = express();

app.use(cors());

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

  // Not authenticating with IAM for now as the mysql_clear_password parameter required by mysql2 for doing so is not working (the node package has a bug, as seen in their Github) 
  // const { Signer } = require("@aws-sdk/rds-signer");

  // const signer = new Signer({
  //   hostname: config.dbHost,
  //   port: config.dbPort,
  //   username: config.dbUsername,
  //   region: config.awsRegion,
  // });

  // const token = await signer.getAuthToken();

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
      //  No need to pass credentials as the AWS CLI in the EC2 instance that hosts the application is configured to use the Access Key and the Secret Key
      // This was done by running the AWS CONFIGURE command in the EC2 instance
      //  credentials: {
      //     accessKeyId: 'XXXXXXXXXXX',
      //     secretAccessKey: 'XXXXXXXXXXX'
      // }
  });

  const command = new GetObjectCommand({
      Bucket: 'vegan-mundi-thumbnail',
      Key: `${req.params.thumbnail}`,
  });

  const data = await client.send(command);

  res.send(data);

});

// app.get('/s3/:s3Object', async (req, res) => {

//   const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

//   const client = new S3Client({
//       region: "us-east-2",
//       //  No need to pass credentials as the AWS CLI in the EC2 instance that hosts the application is configured to use the Access Key and the Secret Key
//       // This was done by running the AWS CONFIGURE command in the EC2 instance
//       //  credentials: {
//       //     accessKeyId: 'AKIATCKAM7Y7QDREV4ET',
//       //     secretAccessKey: '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'
//       // }
//   });

//   const command = new GetObjectCommand({
//       Bucket: "vegan-mundi-videos",
//       Key: `${req.params.s3Object}`,
//   });

//   const data = await client.send(command);
//   res.send(data);
// });

// async function executeQuery(statement) {

//   const dbConnection = await connectToDb();

//   try {

//       dbConnection.query(statement, function (err, result, fields) {
//           if (err) throw err;
//           res.send(result);
//       });

//     } catch (err) {
//       console.log(err);
//     }
//     finally{
//       dbConnection.end();
//     }

// }

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

      dbConnection.query(`SELECT DISTINCT CLS.CATEGORY_ID, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO FROM ` +
         ` CLASS_CATEGORY CAT ` + 
         ` INNER JOIN CLASS CLS ON ` +
         `   CAT.CATEGORY_ID = CLS.CATEGORY_ID ` + 
         `   AND UPPER(CAT.TITLE) = UPPER('${req.params.category}') ` + 
         ` INNER JOIN CLASS_RECIPE CLR ON ` +
         `   CLS.CLASS_ID = CLR.CLASS_ID ` +
         ` INNER JOIN RECIPE RCP ON ` +
         `   CLR.RECIPE_ID = RCP.RECIPE_ID `,
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

app.get('/classes/filter/:keyword', async (req, res) => {

  const dbConnection = await connectToDb();

  try {

      dbConnection.query(
        `SELECT DISTINCT CLS.CATEGORY_ID, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO ` +
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

      dbConnection.query('SELECT * FROM PRICE', function (err, result, fields) {
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

      dbConnection.query('SELECT * FROM GALLERY', function (err, result, fields) {
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
// http://localhost:4000/s3/vegan-mundi-thumbnails/seitan.jpg
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