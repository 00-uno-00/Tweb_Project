# Installation guide

## Prerequisites
- Python 3.10 or higher
- Java 22 or higher
- Node 18 or higher
- pgAdmin 4 or higher
- MongoCompas 1.43 or higher
- IntelliJ IDEA 2024

## Installation
1. Clone the repository
2. Python
   1. Install the required packages
      ```bash
      pip install -r requirements.txt
      ``` 
   2. Set up a virtual environment (optional)
      ```bash
      python -m venv venv
      source venv/bin/activate
      ```
   3. Ensure you have all the required datasets: due to GitHub's file size limit, the appereaces dataset is not included in this repository.
3. MongoDB
   1. Install MongoDB
   2. Start the MongoDB server
   ```bash
   systemctl start mongod
   ```
   3. connect to your local MongoDB server through the Compass app
   4. Create a new database called `Tweb`(note that the name of the database is case sensitive, you can change the name of the database in the [database.js](./express_server/database/database.js) file)
   5. create 5 new collections in the `Tweb` database: `appearances`, `club_games`, `g_events`, `g_lineups`,`games`
   6. add the corresponding datasets to the collections letting mongoDB generate the schema and handling the data types
4. PostgreSQL
   1. Install PostgreSQL
   2. Start the PostgreSQL server
   ```bash
    systemctl start postgresql
    ```
   3. Connect to your local PostgreSQL server through pgAdmin
   4. change the username and password in the [application.properties](./springboot_server/src/main/resources/application.properties) file to your own
   5. Create a new database called `calciotrends` (note that the name of the database is case sensitive, you can change the name of the database in the [application.properties](./springboot_server/src/main/resources/application.properties) file)
5. IntelliJ IDEA
   1. Open the springboot_server folder in IntelliJ IDEA
   2. let gradle do it's thing and run the application
   3. Load the PostgreSQL datasets
      1. You can either load the datasets form intelliJ adding the datasource and right-clikcing on each table and selecting "import data"
      2. Or you can import the datasets through the pgAdmin app by right-clicking on each table and selecting "import data"
      3. In both cases always use the *"corrected"* version of the datasets, for the players table you will need to use the *"updated_players.csv"* file while for `cti_scores` you will nee to use the *"scores.json"* file(note that pgAdmin does not support importing json files, you will need to convert it to a csv file)
   4. After loading all the data IntelliJ should present the option to run 
    ```bash
    npm install
    ``` 
    on both client_server and express_server folders
   5. By default you should have the option of running all 3 servers at the same time, if not you can run them manually by running the following commands:
    ```bash
    npm start
    ``` 
    on the client_server folder
    ```bash
    npm start
    ``` 
    on the express_server folder
    ```bash
    gradle :bootRun
    ``` 
    on the springboot_server folder

6. Open your browser and go to `localhost:3000` to access the application
7. Enjoy!

## Notes
There is a docker compose file but it is not functional, due to time constraints we were not able to make it work properly, we will try to make it work in the future.
The great Licese of this project is taken from [here](https://github.com/ErikMcClure/bad-licenses/tree/master)
