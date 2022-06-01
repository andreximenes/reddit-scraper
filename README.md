# Welcome to Reddit Scraper!

This project use the Reddit API to scrape the most recent posts from subreddit:  https://www.reddit.com/r/photo. By default the service will always scrape the 25 most recent posts, but is possible to increase this limit passing by parameter.



### The service was divided in two projects:

#### requirements for both

 - NodeJS 14+
 - Npm 6.14+	



## Backend 
The backend was built using nodeJS, express and sqlite3.

### Start project Instrunctions:

Working directory

    reddit-srcrapper/backend/

1 -  Install dependencies

    npm install

2 - Run server

    npm start

3 - Access the API documentation  (sawagger) 

    http://localhost:8000/ or http://localhost:8000/api/v1/api-docs/


**Important**
> *For security reasons we shouldn't commit the .env file with sensitive data in the github repository, but I had to commit it so that it is possible to run the project as expected, because the Reddit API credentials are in the .env file*

___


## Frontend
The frontend was build using ReactJS and Tailwindcss


Working directory

    reddit-srcrapper/frontend/

1 -  Install dependencies

    npm install

2 - Run server

    npm start


3 - Access the web app :

    http://localhost:3000

