# Simple-Journey-Tracker

## Architechture
| **Backend** | **Frontend** |
| --- | ----------- |
| Express JS  | React JS |

## Folder Structure
- Client (React JS Project)
- src
    - Config (Configuration Variables)
    - Constants (Constants used in the project)
    - Controllers (Business Logic Layer)
    - Middleware (Middlewares)
    - Routes (API Routes)
    - app.js (Entry Point)
- Tests (Unit Testing)

## Instructions to run the project
1. Clone the repo
2. ```npm install``` to install dependencies
3. ```npm start``` to start then express server
4. ```cd client``` for frontend directory
5. ```npm install``` to install fronend dependencies
6. ```npm start``` to start the fronend app

## Unit Testing
Run ```npm test``` from root directory.

## Assumptions
1. If trip duration goes beyond 24 hours, it is considered as a new trip.
2. Unit Testing is done for the limited set of scenarios.
3. Price Information is stored inside a json (Can be stored inside a database for scalability)
