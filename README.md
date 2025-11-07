# User CRUD Koa-Sequelize

In order to run this project you need to follow the next steps.

## 1. Configure env variables

To start the data base and koa server some env variables are required.
You should add them in a .env file in the root the project.

| Name        | Description                       |
|-------------|-----------------------------------|
| PORT        | Port where the server will listen |
| DB_USERNAME | Username for db connection        |
| DB_PASSWORD | Password for db connection        |
| DB_HOST     | Host of db instance               |
| DB_PORT     | Port of db instance               |
| DB_NAME     | Name of the database              |

## 2. Run docker compose

To create the mysql instance we created a docker-compose file with the required configurations, you just need to run.

``` bash
  docker compose up -d
```

This will create the database and user that is configured in .env file.

## 3 Run koa server

Finally, once the database is ready you can start the server running the following command.

```bash
  npm start
```

## 4 Try the endpoints

To try the endpoints we also included a insonmia collection in the root of this folder with name `UsersCollection.yaml`.
