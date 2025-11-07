# User CRUD Koa-Sequelize

To run this project, follow the steps below.

## 1. Configure environment variables

To start the database and Koa server, some environment variables are required.
You should add them to a `.env` file in the root of the project.

| Name        | Description                       |
|-------------|-----------------------------------|
| PORT        | Port where the server will listen |
| DB_USERNAME | Username for db connection        |
| DB_PASSWORD | Password for db connection        |
| DB_HOST     | Host of db instance               |
| DB_PORT     | Port of db instance               |
| DB_NAME     | Name of the database              |

## 2. Run docker compose

To create the MySQL instance, we’ve included a `docker-compose.yml` file with the required configuration.
Simply run the following command:

``` bash
  docker compose up -d
```

This will create the database and user configured in your `.env` file.

## 3 Run koa server

Once the database is ready, you can start the server with the following command:

```bash
  npm start
```

## 4 Try the endpoints

To test the endpoints, an Insomnia collection is included in the root folder named `UsersCollection.yaml`.
