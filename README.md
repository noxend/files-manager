# Files Manager

### Description

Server is built on REST API technology using **Express** library. Client created with **React** and **Redux**. The project uses MySQL database and **Knex** library.

### How to start the project:
#### First run the migration
1. Go to directory database – `cd ./database`.
2. To install the dependencies – `npm install`.
3. To open file `database.json` and connect to MySQL.
4. To run the migration – `db-migrate up --config database.json`.

#### Next, start the server
1. Go to directory server – `cd ./server`.
2. To install the dependencies – `npm install`.
3. Create environment variables (create file `.env` and add variables as in the file `.env.example`);
4. To run the server – `npm run dev`.

#### And start the client
1. Go to directory client – `cd ./client`.
2. To install the dependencies – `npm install`.
3. To run the client – `npm run start`.

### Database
![Database schema](./database/schema.png)

Run the migration:
`db-migrate up --config database.json`

Discard the migration:
`db-migrate down --config database.json`
