# CodersCamp 2021 - JoaoTeam
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Backend:
> [Live version](https://coderscamp-2021-project-3.herokuapp.com/) 

Frontend:
> [Live version](https://coders-camp-2021-project-3.vercel.app/) 

## Project 3 - Cinema management system
*The project was carried out as part of the largest open web programming course in Poland - [CodersCamp 2021](https://www.coderscamp.edu.pl/).*  

### :cinema: About 
As a FullStack project we created website of cinema. The administration panel allows the owner of the cinema to manage the movie database and the screening plan. Cinema customers can read the information about movies and book tickets.

#### :books: Technologies
<details>

<summary>See all</summary>
  

Backend:
* [NodeJS v. 17.5.0](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [CORS](https://www.npmjs.com/package/cors)
* [dotenv](https://github.com/motdotla/dotenv#readme)
* [cookie-parser](https://github.com/expressjs/cookie-parser#readme)
* JSON Web Token 

Database (noSQL):
* [MongoDB Atlas](https://www.mongodb.com/free-cloud-database)
* [Mongoose](https://mongoosejs.com/)

Frontend:
* [React v. 17.0.2](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Primereact](https://www.primefaces.org/primereact/)
* [Axios](https://axios-http.com/docs/intro)
* [Formik](https://formik.org/)

DevTools:
* [Nodemon](https://nodemon.io/)
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)

Testing:
* [Jest](https://jestjs.io/)
* [Cypress](https://www.cypress.io/)
</details>

### :wrench: Development 

#### :cactus: Branches 

1. **`develop`** is the development branch.
2. **`main`** is the production branch.

#### :file_folder: File Structure

```
├── README.md
├── backend
│   ├── config
│   ├── controllers       // Handle requests processing
│   ├── db                // Database handling
│   ├── index.js
│   ├── middleware
│   ├── model             // Mongoose schemas
│   └── routes            // Direct requests to controllers
└── frontend
    ├── public
    │   └── index.html
    └── src
        ├── App.js
        ├── components    // React components
        ├── context
        ├── hooks
        ├── index.js
        └── styles        // Style sheets
```
#### :fire: How to contribute?

To run this project locally clone repository:
```
$ git clone https://github.com/CodersCamp2021/JoaoTeam-Project-3.git
```

Split terminal to two windows:

1/ Change directory to backend:
```
$ cd backend
```
2/ Change directory to frontend:
```
$ cd frontend
```

in both terminal windows, install dependencies:
```
$ npm install
```  

Start local server:  

1/ backend:
```
$ npm run startDev
```
2/ frontend:
```
$ npm run build
$ npm run start
```
:exclamation: Write to one of the **contributors** to get the necessary details to connect to the database and use tokens.
  
:blossom: Pssst... In this project we are trying to use [angular commit message convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
  
### :star2: Inspiration

This project was based on [this idea](https://github.com/CodersCamp2021/Project-React-Node).
### :sparkles: Contributors 

Look at [emoji key](https://allcontributors.org/docs/en/emoji-key):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/JK-Sebastiao"><img src="https://avatars.githubusercontent.com/u/14078333?v=4?s=100" width="100px;" alt=""/><br /><sub><b>João Kiakumbo</b></sub></a><br /><a href="#mentoring-JK-Sebastiao" title="Mentoring">🧑‍🏫</a></td>
    <td align="center"><a href="https://github.com/J-emi"><img src="https://avatars.githubusercontent.com/u/89035278?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Justyna Chmielińska</b></sub></a><br /><a href="https://github.com/CodersCamp 2021 Joao's Team/JoaoTeam-Project-3/commits?author=J-emi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/spidero7"><img src="https://avatars.githubusercontent.com/u/64019212?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bartłomiej Pająk</b></sub></a><br /><a href="https://github.com/CodersCamp 2021 Joao's Team/JoaoTeam-Project-3/commits?author=spidero7" title="Code">💻</a><a href="#projectManagement-spidero7" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/itspatys"><img src="https://avatars.githubusercontent.com/u/58817270?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patryk Pierzchała</b></sub></a><br /><a href="https://github.com/CodersCamp 2021 Joao's Team/JoaoTeam-Project-3/commits?author=itspatys" title="Code">💻</a><a href="#projectManagement-itspatys" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->