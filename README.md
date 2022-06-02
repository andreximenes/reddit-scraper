# Welcome to Reddit Scraper!

This project use the Reddit API to scrape the most recent posts from subreddit:  https://www.reddit.com/r/photo. By default the service will always scrape the 25 most recent posts, but is possible to increase this limit passing by parameter.




### The service was divided in two projects:

#### requirements for both
 - Node.JS v14 or higher
 - Npm v6.14 or higher



## Backend 
The backend was built using nodeJS, express and sequelize ORM to use sqlite3.

> To make testing and using the application easier, I built the frontent project and put it to be served by the backend server. That way you won't need to start the two services (frontnd and backend) to be able to test. Just follow the backend instructions and open the url shown in the terminal (http://localhost:8000)

### Start project Instructions:

Working directory

    reddit-scraper/backend/

1 -  Install dependencies

    npm install

2 - Run server

    npm start

3 - Application context

| url | context | description
|--|--|--| 
| http://localhost:8000/app		| app | web app  build in react running into backend server| 
| http://localhost:8000/api/ 	| api | api documentation using swagger. use it to test the endpoits | 


 
 
**Important**
> *For security reasons we shouldn't commit the **.env** file with sensitive data in the github repository, but I had to break this rule and commit it so that it is possible to run the project as expected, as the Reddit API credentials are in the **.env** file. In a real situation I would never do that.*

___

## Frontend
The frontend was build using ReactJS and Tailwindcss


Working directory

    reddit-scraper/frontend/

1 -  Install dependencies

    npm install

2 - Run server

    npm start


3 - Access the web app :

    http://localhost:3000
