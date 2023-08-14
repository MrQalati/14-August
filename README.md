## Installation and Setup

1. Clone this repository to your local machine.
2. Create a `.env.development` file in the project root and set the database name: `PGDATABASE=your_development_database_name`.
3. Create a `.env.test` file in the project root and set the test database name: `PGDATABASE=your_test_database_name`.
4. Run `npm install` to install project dependencies.
5. Run the database setup scripts: `npm run setup-dbs`.
6. Start the server: `npm start`.

The API should now be accessible at `localhost:9090`.