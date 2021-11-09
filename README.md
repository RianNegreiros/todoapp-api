<h1 align="center"> To-do list API </h1>

<p align="center" id="description"> An API for a to-do list application </p>

<p align="center">
 <a href="#description">Description</a> •
 <a href="#deploy">Deploy</a> • 
 <a href="#features">Features</a> • 
 <a href="#how-to-run">How to run</a> • 
 <a href="#requirements">Requirements</a> • 
 <a href="#tests">Tests</a> • 
 <a href="#author">Author</a>
</p>

## Deploy
  **AWS**
> https://todoapp.riannegreiros.dev/api-docs

## Features
- User
  - User registration
  - User authentication
  - User password reset
  - User token refresh
- Todo
  - Todo creation
  - Todo deletion
  - Todo change of status
  - Todos listing
  - Todos completed listing
  - Todos uncomplete listing
  - Todos uncompleted deletion

## How to run

#### Requirements
  [Node](https://nodejs.org) <br/>
  [Docker](https://www.docker.com)

1. Clone the project.
  ```
  git clone https://github.com/RianNegreiros/todoapp-api-node.git
  ```
2. Install the dependencies
  ```
  npm install
  ```
3. Run Docker Compose
```
docker-compose up
```
4. Run the migrations
```
npm run typeorm migration:run
```
5. Run the application
```
npm run dev
```
Or
```
npm run build
node dist/shared/infra/http/server.js
```

## Tests
To run automated tests
```
npm run test
```
To manually test with Insomnia <br/>
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=To-do%20list&uri=https%3A%2F%2Fraw.githubusercontent.com%2FRianNegreiros%2Ftodoapp-api-node%2Fmain%2FInsomnia_2021-11-09.json)

To manually test with Postman <br/>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15917186-1b9573b8-c569-4f4f-b348-54b6b4d4e9d8?action=collection%2Ffork&collection-url=entityId%3D15917186-1b9573b8-c569-4f4f-b348-54b6b4d4e9d8%26entityType%3Dcollection%26workspaceId%3D8ff9523b-59ac-4c75-9a4e-9f4fad82850a)

### Author
 <sub id="author"><b>Rian Negreiros</b></sub></a>

[![Linkedin Badge](https://img.shields.io/badge/-Rian-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/riannegreiros/) 
[![Gmail Badge](https://img.shields.io/badge/-riannegreiros@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:riannegreiros@gmail.com)
