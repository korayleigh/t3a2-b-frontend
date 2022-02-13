# Web Application for 'Mexiquito' Mexican Restaurant

- [Web Application for 'Mexiquito' Mexican Restaurant](#web-application-for-mexiquito-mexican-restaurant)
  - [Introduction](#introduction)
  - [Links](#links)
  - [Getting started with this web app](#getting-started-with-this-web-app)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Testing](#testing)
  - [Building the app](#building-the-app)
  - [Updated Project Details](#updated-project-details)
    - [Menu Filtering](#menu-filtering)
    - [User management](#user-management)
  - [Tech Stack](#tech-stack)
    - [Front-end](#front-end)
      - [React](#react)
        - [Key React Dependencies](#key-react-dependencies)
    - [Back-end](#back-end)
      - [Ruby on Rails](#ruby-on-rails)
        - [Key Rails Dependencies](#key-rails-dependencies)
  - [User Testing](#user-testing)
    - [Development](#development)
    - [Production](#production)
## Introduction

This repository holds the front end resources for a web application for a fictional Mexican restaurant called 'Mexiquito'.  This website is hosted at [https://mexiqui.to](https://mexiqui.to), on Netlify infrastructure.

This web application was developed as part of a project for a web development course.  The front end is developed in React and the backend, hosted in a [different repository](https://github.com/korayleigh/t3a2-b-backend) is developed with Ruby on Rails, and is hosted at Heroku.

The planning documentation for this project is available [at this respository](https://github.com/korayleigh/t3a2-a), but is also included at the end of this document for reference.


## Links

- [Trello Board](https://trello.com/b/CoWRRx5z/full-stack-app)
  containing all of the project management and task allocation information.
- [Original Planning Documentation Repository](https://github.com/korayleigh/t3a2-a)
  containing the documentation as submitted for Part A.
- [This frontend repository](https://github.com/korayleigh/t3a2-b-frontend)
  containing the frontend React application.
- [The backend repository](https://github.com/korayleigh/t3a2-b-backend/)
  containing the backend ruby on rails application
- [Supplementary Part B Documentation repository](https://github.com/korayleigh/t3a2-b-docs)
  containing continued meetings minutes, trello screenshots, entity relationship diagram, site-map, and generally other things that didn't fit in either of the application repositories like shared git hooks.
- [User testing spreadsheets](https://docs.google.com/spreadsheets/d/1s3-LPndBm64y04VEfctXHCvG2uDPyusrkV6-mnXbwiQ/edit?usp=sharing)
- containing records of user testing of development and production sites

## Getting started with this web app

This project was created with [Create React App](https://github.com/facebook/create-react-app).  If you would like to install a locally hosted copy of this web app, you will also need to locally host the ruby on rails backend server.  See the [backend repository](https://github.com/korayleigh/t3a2-b-backend) for instructions on how to install and run.

## Installation

To install and view this web application, first clone the repository:
```sh
git@github.com:korayleigh/t3a2-b-frontend.git
```
then change into the resulting new directory:
```sh
cd t3a2-b-frontend 
```
Assuming you have `npm` or `yarn` already installed, use your preferred package manager to download and install the required dependencies:

### npm<!-- omit in toc -->
```sh
npm install
```

### yarn<!-- omit in toc -->
```sh
yarn install
```

## Running the app

To run the app locally in development mode:

### npm<!-- omit in toc -->
```sh
npm start
```

### yarn<!-- omit in toc -->
```sh
yarn start
```

The automatic browser opening has been disabled, so manually open `http://localhost:3000` in your browser to view the web application.
## Testing

Some unit tests for helper functions are included, and some React component testing.  The package helper scripts can be used to run tests, and an extra script command has been added to show code coverage.

### npm<!-- omit in toc -->
```sh
npm test
```
or...
```sh
npm run test:coverage
```

### yarn<!-- omit in toc -->
```sh
yarn test
```
or...
```sh
yarn test:coverage
```

## Building the app

Building the app will create an optimised and minified bundle inside the `build` directory.  Once built the `build` directory can be served from any static web server. To build and locally serve the optimised production build:

### npm<!-- omit in toc -->
```sh
npm run build
```
Ensure that the `serve` package is globally installed:
```sh
npm install -g serve
```
Also ensure that the directory containing global npm binaries is in your path. The relevant directory is revealed by:
```sh
npm -g bin
```
On Linux/Mac you can temporarily add this to your path with:
```sh
PATH=$PATH:$(npm -g bin)
```
Then you can run the local webserver by passing it the `build` directory as an argument:
```sh
serve build
```

### yarn<!-- omit in toc -->
```sh
yarn build
```
Ensure that the `serve` package is globally installed:
```sh
yarn global add serve
```
Also ensure that the directory containing global yarn binaries is in your path.  The relevant directory is revealed by: 
```sh
yarn global bin
```
On Linux/Mac you can temporarily add this to your path with:
```sh
PATH=$PATH:$(yarn global bin)
```
Then you can run the local webserver by passing it the `build` directory as an argument:
```sh
serve build
```

## Updated Project Details

Best laid plans and all that...

Time pressures have caused use to slightly prune some of the features of the original MVP.  Most features are implemented, although some in a slightly simplified design than the original plan detailed in the Part A documentation.

### Menu Filtering

The sophistication of the menu filtering/searching functions is less than originally planned for MVP.  As a team we decided to delay development of more advanced filtering, based on ingredients, or menu item attributes, until the next version of the app.  Currently the user has the ability to filter by category, and also by a free text search which includes the name and description of the menu item.
### User management

Due to time pressure, our team decided to simplify the user setup for the first release.  Instead of multiple roles, we have one 'Admin' role who can perform functions that are destructive, and view information that is privacy sensitive.

Originally, the 'kitchen', 'waiter' and 'manager' users were intended to have their own logins with access only to the information and functions required to perform their duties.  However without these logins, these users can still use the admin login for access, although they will have too much permission for overall management of the app.

A future update to the app is intended to introduce the fine scale permissions and authorisations that were originally intended.

## Tech Stack

The project contains some extra dependencies than originally planned, and some slight changes to versions of dependencies.

### Front-end

#### React

- **React version:** 17.0.2

##### Key React Dependencies

|Dependency|Version|
|---|---|
|react-scripts|5.0.0|
|react-router|6.2.1|
|styled-components|0.1.0|
|axios|0.25.0|
|bootstrap|5.1.3|
|react-bootstrap|2.1.2
|change-case|4.1.2|
|react-table|7.7.0|

### Back-end

#### Ruby on Rails

- **Rails version:** 6.1.4.4
- **Ruby version:** 2.7.4

##### Key Rails Dependencies
|Dependency|Version|
|---|---|
|devise|4.8.1|
|devise-jwt|0.9.0|
|aws-sdk-s3|1.111.3|
|rack-cors|1.1|
|brakeman|5.2|
|bundle-audit|0.1.0|
|database_cleaner|2.0|
|factory_bot|6.2|
|faker|2.19|
|rspec|5.1|
|rubocop|1.25|
|active_model_serializers||
|cancancan|3.3|


## User Testing

User testing is documented in the [User Testing Spreadsheet](https://docs.google.com/spreadsheets/d/1s3-LPndBm64y04VEfctXHCvG2uDPyusrkV6-mnXbwiQ/edit?usp=sharing)

### Development

At various stages of development, subsections of functionality were able to be tested by family and friends with access to locally hosted apps running in development mode.

### Production

After the bulk of work was done and the site was deployed to production with only minor changes envisaged, family and friends were asked to conduct some user acceptance testing.  A few bugs were actually found in these stages and were able to be caught and fixed.