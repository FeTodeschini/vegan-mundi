const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
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
const reviewRouter = require('./routes/reviewRouter');

// In production and test, server HTTPS is used. Locally, HTTP is used
const PORT = process.env.PORT || 4000;

// Certificate handling:
// - Production: as the app is hosted on Render.com, certificate is managed by Render itself
// - Test: Certificate is hosted on disk for test environment (VPS)
// - Local: No certificate. HTTP is used
const isRender = process.env.RENDER === 'true';

const certPath = '/etc/letsencrypt/live/veganmundi.com/fullchain.pem';
const keyPath = '/etc/letsencrypt/live/veganmundi.com/privkey.pem';

if (!isRender && fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    try {
        const credentials = {
            key: fs.readFileSync(keyPath, 'utf8'),
            cert: fs.readFileSync(certPath, 'utf8'),
            ca: fs.readFileSync('/etc/letsencrypt/live/veganmundi.com/chain.pem', 'utf8')
        };
        
        https.createServer(credentials, app).listen(PORT, '0.0.0.0', () => {
            console.log(`[TEST ENVIRONMENT] Server running with manual SSL on port ${PORT}`);
        });
    } catch (err) {
        console.error("SSL failed, falling back to HTTP:", err.message);
        startHttp();
    }
} else {
    app.listen(PORT, '0.0.0.0', () => {
        const envName = process.env.NODE_ENV || 'development';
        console.log(`[${envName.toUpperCase()} ENVIRONMENT] Server listening on port ${PORT}`);
    });
}

app.use('/prices', priceRouter);
app.use('/gallery', galleryRouter);
app.use('/s3', s3Router);
app.use('/classes', classesRouter);
app.use('/delivery-methods', deliveryMethodsRouter);
app.use('/account', accountRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);

app.use(errorHandler);