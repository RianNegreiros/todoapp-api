<h1 align="center"> To-do list API </h1>

<p align="center"id="description"> An API for a to-do list application </p>

<p align="center">
 <a href="#description">Description</a> •
 <a href="#deploy">Deploy</a> • 
 <a href="#features">Features</a> • 
 <a href="#how-to-run-the-application">How to run the application</a> • 
 <a href="#requirements">Requirements</a> • 
 <a href="#author">Author</a>
</p>

## Deploy
  **AWS**
> https://todoapp.riannegreiros.dev/

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

## How to run the application

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
To run with JavaScript
```
npm run build
node dist/shared/infra/http/server.js
```
And to run the tests
```
npm run test
```

### Author
 <sub id="author"><b>Rian Negreiros</b></sub></a>

[![Linkedin Badge](https://img.shields.io/badge/-Rian-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/riannegreiros/) 
[![Gmail Badge](https://img.shields.io/badge/-riannegreiros@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:riannegreiros@gmail.com)
