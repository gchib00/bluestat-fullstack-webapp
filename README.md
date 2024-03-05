*How to install and run the app*

Prerequisites:
- Have npm installed
- Have MySQL installed (and make sure to have MySQL instance running)

1) Install packages:
- Clone the project, cd to the project root and run "npm install"
- NOTE: If your desktop's root user is password-protected, make sure to go to ./database/database.js file and add your password for the "password" key. Otherwise, once you run the backend, it will fail to connect to your local MySQL instance.

2) Install the database:
There is a mysqldump file prepared inside the "database" folder. It's essentially a backup code which will populate your local database with the needed data.
- Run command: "mysql -u [your_username] -p -e "CREATE DATABASE bluestat;" (this step will create a new MySQL database instance named "bluestat" locally)
- Run command: "mysql -u [your_username] -p bluestat < database/bluestat-db-backup.sql" (this will populate your local instance of the database with the backed-up data)

3) Run the project:
- Run command: "npm run dev"
- That's it, you can now visit localhost:3001 and interract with the webapp
