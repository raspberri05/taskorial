# Taskorial

## About

Taskorial is an open source task management web application that was created using the MERN Stack (MongoDB, Express, React, Node). The production frontend is hosted on Netlify and the production backend is hosted on Render. This project is an active development, and is open to contributions. If you are interested in contributing, please consult our [contributing guide](https://github.com/raspberri05/todo-list/blob/main/CONTRIBUTING.md)

## Setting up your environment for local development

This project is testing on Node v20.11.1. Most other recent versions of Node should fully, but we cannot guarantee full functionality for other versions

### Dependency Installation

1. Within `react-auth` and `server` directories, run `npm install`.

### Environment Variables

1. In the `react-auth` directory, create a `.env` file and add an environment variable titled `REACT_APP_API_URL` with the value `http://localhost:8080/`.
2. In the `server ` directory, create a `.env` file and add an environment variable titled `DB_URL`.In order to get the value for this variable, you will need to create a shared cluster in MongoDB Atlas (See [Shared Cluster Setup Instructions](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup) for help). Once you setup your cluster, you will have access to your connection string, which you should set as the value of `DB_URL`.
3. Add another variable to this file titled `RANDOM_TOKEN`. The value for this can be any string containing only English characters; 10 characters should be sufficient.

### Google Gemini Functionality

Coming Soon

### Mailing Functionality

1. Please note that you currently will not be able to work on any functionality related to nodemailer at the moment, as it requires advanced setup that could pose security vulnerabilities. We are working on resolving this.
   
**If there is an problem with these instructions, please open an issue that explains the problem or open a pull request with a fix. 

## Starting your local development environment

1. In the `react-auth` directory, run `npm start`.
2. In the `server` directory, run `npm run dev`.
3. The React app will start at `http://localhost:3000/`. This is where the frontend will be served. 
4. The server will start at `http://localhost:8080`. The API calls are made to this url in development. 

## Contributing

We welcome and encourage any types of contributions to this project. Please consult our [contributing guide](https://github.com/raspberri05/todo-list/blob/main/CONTRIBUTING.md) prior to making any contributions.

## License

This projecte is licensed under the GNU General Public License v3.0. You can view more info about this license [here](https://github.com/raspberri05/taskorial/blob/main/LICENSE.md).

## Documentation

We are in the process of creating documentation for Taskorial on our [wiki](https://github.com/raspberri05/taskorial/wiki)
