// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Optional: Use axios if you prefer making HTTP requests easily
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Replace with your Google Form URL
    const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSc8UMqXrLPagQLVVz5DjbQPMhN2vYBPNDMpSenFzEu_DMohtw/formResponse';

    // Format the data to be sent to Google Form
    const formattedData = new URLSearchParams();
    formattedData.append('entry.1ES2QeiKfuAGaMQDiEl3OMruUvbR8o6dxvG1AgBIMNhE', formData.finalChoice);

    // Make a POST request to Google Form
    axios.post(googleFormURL, formattedData)
        .then(response => {
            res.status(200).send({ success: true, message: 'Response submitted successfully' });
        })
        .catch(error => {
            console.error('Error submitting to Google Form:', error);
            res.status(500).send({ success: false, message: 'Failed to submit response' });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
