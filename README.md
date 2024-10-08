Go Out With Me Please 🎉

Project Overview
Go Out With Me Please is a simple interactive web application where users can choose date options through a series of prompts. The goal is to make selecting a date and location fun and engaging! The app offers various options for going out on a date, such as picnics, restaurants, or movie nights, and allows users to pick specific times and places. 💖

Table of Contents

Project Overview

Features

Technologies Used

Setup and Installation

Running the Application

Database Configuration

Contributing

License

Features
Interactive question flow to select date options.
Choose between indoor and outdoor date settings.
Select specific locations, dates, and times.
Submits the chosen options to an Oracle database.
Heart animations for a more engaging user experience. 💖

Technologies Used

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js, Express

**Database:** Oracle Database (using oracledb module)

**Other Tools:** Fetch API for communicating with the backend server

**Setup and Installation**

**Prerequisites**

Node.js (v18 or higher)

Oracle Database (setup and running locally)

Git (optional, for version control)


**Installation**
Clone the repository:

    git clone https://github.com/CyberKidLeko/Go_out_with_me_please.git
    
Navigate to the project directory:

    cd go-out-with-me-please
    
Install the required Node.js dependencies:

    npm install
Configure the Oracle Database:

Update the dbConfig object in server.js with your Oracle database username, password, and connection string:

    const dbConfig = {

    user: 'your-username',
    
    password: 'your-password',
    
    connectString: 'localhost/your-service-name'
    };

Create the date_choices table in Oracle DB (if not already created):



    CREATE TABLE date_choices (

    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    
    location VARCHAR2(255),
    
    date_of_event DATE,
    
    time_of_event VARCHAR2(255)
    );
Run the server:

    node server.js
    
Running the Application
Open your web browser and navigate to:

    http://localhost:7000
    
Interact with the application, select date options, and submit your choice.


Check your Oracle Database to ensure that the data has been stored correctly.


**Database Configuration**
The application uses Oracle Database to store the selected date options. To configure your database:


Make sure the oracledb module is installed in your Node.js environment.

Update your database credentials in the server.js file.

Ensure the database is running locally or on a server that the application can access.

Note: The database files are not included in this repository. You will need to set up the database independently.

**Contributing**

If you'd like to contribute to this project:

Fork the repository.

Create a new branch (git checkout -b feature-branch-name).

Make your changes and commit them (git commit -m 'Add some feature').

Push to the branch (git push origin feature-branch-name).
Open a Pull Request.
I welcome any contributions and improvements!

