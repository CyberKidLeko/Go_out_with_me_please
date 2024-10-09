require('dotenv').config();
const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const nodemailer = require('nodemailer');


const app = express();
const PORT = 7000;

/* Oracle DB Configurations
const dbConfig = {
    user: '*****',
    password: '********',
    connectString: 'localhost/XEPDB1'
};*/

const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    const formData = req.body;

    try {
        // Establish connection to Oracle DB
        const connection = await oracledb.getConnection(dbConfig);

        // SQL query to insert data into the 'date_choices' table
        const insertQuery = `INSERT INTO date_choices (location, date_of_event, time_of_event) 
                             VALUES (:location, TO_DATE(:date_of_event, 'YYYY-MM-DD'), :time_of_event)`;

        // Execute the query with form data
        await connection.execute(insertQuery, {
            location: formData.location,  // Field name should match the one sent from frontend
            date_of_event: formData.date, // Date value from frontend
            time_of_event: formData.time  // Time value from frontend
        });

        // Commit the transaction
        await connection.commit();

        // Close the connection
        await connection.close();
        console.log('loaded to db');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: '*************@gmail.com', // Change this to the email youll receive notifications on
            subject: 'Got user input',
            text:`Form data: ${JSON.stringify(formData)}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ success: false, message: 'Failed to send email', error: error.message });
            }
            console.log('Email sent:', info.response);
            res.status(200).send({ success: true, message: 'Email sent successfully' });
        });

        res.status(200).send({ success: true, message: 'Response stored successfully in Oracle DB' });
    } catch (error) {
        console.error('Error storing data in Oracle DB:', error);
        res.status(500).send({ success: false, message: 'Failed to store response in DB' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
