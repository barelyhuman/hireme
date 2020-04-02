# Invok

An API first solution to generating Invoices

## Badges

![server](https://github.com/barelyhuman/invok/workflows/server/badge.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Setup

Clone this repository

```sh
  git clone git@github.com:barelyhuman/invok.git
```

Change directory to the repository

```sh
  cd invok
```

Install required dependencies

```sh
  npm i
  # or
  yarn install
```

Then run the server

```sh
npm start:server #Prod Mode
npm start:worker #Run the worker
npm run dev #Run server in developer mode
```

## Code Style and Consistency

This project uses [husky](https://github.com/typicode/husky) and [prettier](https://github.com/prettier/prettier) to maintain code consistency both during you code and when you commit.

Make sure you check the git status again after you commit to see if the formatter has made any changes.

To format all needed files run

```bash
  npm run prettier:format
```

For overall consistency in this setup the following settings in your editor, the below are for `vscode` but you find the synonymous settnig for other editors as well.

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.trimAutoWhitespace": true,
  "files.insertFinalNewline": true
}
```

## Handling Migrations

The repo uses [Knex.js](http://knexjs.org/) for Migrations and Database queries and every new modification to the table should be added a new migration file to avoid issues in productions environments. To learn about Knex.js and its cli tools for migrations, read their docs here [Knex.js](http://knexjs.org/#Migrations);

## Architechture and Technology

This is just a gist of what's being used in this project

- Database: [PostgreSQL](https://www.postgresql.org/)
- Runtime: [Node.js](https://nodejs.org/)
- Web Frameword: [KoaJS](https://koajs.com/)
- Query Builder: [Knex.js](http://knexjs.org/)
- Migrations Manager: [Knex.js](http://knexjs.org/)
- Router: [CottageJS](https://github.com/therne/cottage)
- Code Formatter: [Prettier](https://github.com/prettier/prettier)
- Git Hooks: [Husky](https://github.com/typicode/husky)
- Authorization(Current): [JWT](https://www.npmjs.com/package/jsonwebtoken)
- Authorization(Future Releases): [Magic.Link](https://magic.link/)
- Crypto: [bcrypt](https://www.npmjs.com/package/bcrypt)
