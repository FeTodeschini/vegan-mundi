const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Call the prices API running on [Test EC2 Private IP]:4000
const url = 'http://172.31.29.148:4000/prices';

console.log('Starting Express server...');

const server = app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error('Failed to start the server:', err.message);
        process.exit(1);  // Exit the process with failure
    }
    console.log(`Test server is running on http://0.0.0.0:${PORT}/test-server`);
});

// The call of http://3.136.5.189:4000/prices tests if:
// - correct .env file was loaded
// - security groups are configured properly and the correct pem/pub keys are being used
// - node server started properly and APIs are reachable in the TEST environment
app.get('/test-server', async (req, res) => {
    try {
        console.log("Called /test-server")
        const response = await axios.get(url);
        console.log("Received URL response")
        
        if (response.data) {
            console.log('Test Passed: Received a valid response from the URL.');
            res.status(200).send('Test Passed');

            // Shutdown the server gracefully after success
            server.close(() => {
                console.log('Server closed after passing test.');
                process.exit(0);
            });
        } else {
            console.error('Test Failed: No data returned.');
            res.status(500).send('Test Failed: No data');

            // Shutdown the server gracefully after failure
            server.close(() => {
                console.log('Server closed after failing test.');
                process.exit(1);
            });
        }
    } catch (error) {
        console.error('Test Failed: Unable to reach the URL.', error.message);
        res.status(500).send('Test Failed: Unable to reach URL');

        // Shutdown the server gracefully after error
        server.close(() => {
            console.log('Server closed after error.');
            process.exit(1);
        });
    }
});

// Handle Linux process termination/interruption signals
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed due to SIGINT.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed due to SIGTERM.');
        process.exit(0);
    });
});