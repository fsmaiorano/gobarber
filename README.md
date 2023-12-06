## :page_with_curl: About

This repository contains a Node.js REST API as the back-end, a ReactJS application as the front-end, and a React Native mobile app, all using TypeScript.
This is the GoBarber application, a scheduling platform for owners of barbershops or beauty salons. In this application, users can access all registered service providers through a mobile app, allowing them to choose a provider to schedule their appointment.
Service providers, through a web interface, can access all their schedules, viewing both occupied and available time slots.

## :books: Requirements

    Have Git to clone the project.
    Have Node.js installed.
    Have Docker running a PostgreSQL container.
    A device or iOS or Android emulator.

## :books: Requirements

- Have [**Git**](https://git-scm.com/) to clone the project.
- Have [**Node.js**](https://nodejs.org/en/) installed.
- Have [**Docker**](https://www.docker.com/) running a PostgreSQL container.
- A device or iOS or Android emulator.

## :gear: Starting back-end

```bash

  $ docker run --name some-redis -p 6379:6379 -d redis redis-server --save 60 1 --loglevel warning

  $ docker run --name gobarber -e POSTGRESQL_USERNAME='postgres' -e POSTGRESQL_PASSWORD='postgres' -e POSTGRESQL_DATABASE=gobarber -p 5432:5432 bitnami/postgresql:latest

  $ cd backend

  $ yarn

  $ yarn typeorm migration:run

  $ yarn dev:server
```

## :computer: Starting front-end

```bash
  $ cd frontend

  $ yarn

  $ yarn start
```

## :iphone: Starting mobile

```bash
  $ cd mobile

  $ yarn

  $ yarn ios ou yarn android
```

## :hammer: Attention
All configuration files are in the project only for study purposes, so they are not secure enough for a production environment.

## :memo: License
This project is under the MIT license. See the [LICENSE]

## Desktop
![Screen_1](https://github.com/fsmaiorano/gobarber/blob/master/github/gobarber-1.png)
![Screen_2](https://github.com/fsmaiorano/gobarber/blob/master/github/gobarber-2.png)

## Mobile
![Screen_3](https://github.com/fsmaiorano/gobarber/blob/master/github/gobarber-3.png)
![Screen_4](https://github.com/fsmaiorano/gobarber/blob/master/github/gobarber-4.png)