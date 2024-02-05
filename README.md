# Taskorial

## About

Taskorial is an open source task management web application that was created using the MERN Stack (MongoDB, Express, React, Node). The production frontend is hosted on Netlify and the production backend is hosted on Render. This project is an active development, and is open to contributions. If you are interested in contributing, please consult our [contributing guide](https://github.com/raspberri05/todo-list/blob/main/CONTRIBUTING.md)

## Setting up your environment for local development

1. Create a fork of this repository.
2. Clone your fork of this repository onto your development machine.
3. Within `react-auth` and `server` directories, run `npm install`.
4. In the `react-auth` directory, create a `.env` file and add an environment variable titled `REACT_APP_API_URL` with the value `http://localhost:8080/`.
5. In the `server ` directory, create a `.env` file and add an environment variable titled `DB_URL`.In order to get the value for this variable, you will need to create a shared cluster in MongoDB Atlas and copy the connection url from there.
6. Add another variable to this file titled `RANDOM_TOKEN`. The value for this can be any string containing only English characters; 10 characters should be sufficient.
7. In order to set up nodemailer, you will need the email account password. For security purposes, please email me at vedant.singhania@gmail.com to get the password (Please note this step is only required if you would like to work on the reset password functionality. Otherwise, you can ignore this step and step 8).
8. Once you have the password, add one last variable to this file titled `SMTP_APP_PASSWORD`.

## Starting your local development environment

1. In the `react-auth` directory, run `npm start`.
2. In the `server` directory, run `npm run dev`.
3. The React app will start at `http://localhost:3000/`. This is where the frontend will be served. 
4. The server will start at `http://localhost:8080`. The API calls are made to this url in development. 

## Contributing

We welcome and encourage any types of contributions to this project. Please consult our [contributing guide](https://github.com/raspberri05/todo-list/blob/main/CONTRIBUTING.md) prior to making any contributions.
