const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorHandler')

// Load environment variables based on the NODE_ENV, which can be sent either by pm2 when a  Jenkins pipeline is triggered
// or via the package.json scripts when executed in the local machine
const envFile = process.env.NODE_ENV === 'development' 
  ? path.resolve(__dirname, '.env.development') 
  : process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, '.env.test')
  : path.resolve(__dirname, '.env.production');

dotenv.config({ path: envFile });
const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const priceRouter = require('./routes/priceRouter');
const galleryRouter = require('./routes/galleryRouter');
const s3Router = require('./routes/s3Router');
const classesRouter = require('./routes/classRouter');
const deliveryMethodsRouter = require('./routes/deliveryMethodsRouter');
const accountRouter = require('./routes/accountRouter');
const orderRouter = require('./routes/orderRouter');

app.listen(4000, ()=> {
  console.log('Server listening on port 4000');
})

app.use('/prices', priceRouter);
app.use('/gallery', galleryRouter);
app.use('/s3', s3Router);
app.use('/classes', classesRouter);
app.use('/delivery-methods', deliveryMethodsRouter);
app.use('/account', accountRouter);
app.use('/order', orderRouter);

app.use(errorHandler);