# Vote-Backend-Api
A vote for general election - Such users can vote the candidate, this also implement Blockchain.

## Features
There are following endpoints

- **Seed**

  `GET /seed/user` Insert data to table user
  
  `GET /seed/candidate` Insert data to table candidate
  
  `GET /seed/block` Insert initial block
 
- **Auth**
 
  `POST /auth/signin` Login a user
  
  `POST /auth/signup` Create a user
  
- **Candidate**

  `GET /candidate` Show all candidate
  
- **Vote**

  `POST /vote` Vote for one of candidate
  
  `GET /vote` See all the vote
  
## Getting Started
Before you begin, don't forget to clone this repo first and put it locally wherever you want.

### Prerequisites
Things you need install so that you can run this project is

- NodeJS and NPM (https://nodejs.org/en/download/)

- PostgreSQL (https://www.postgresql.org/download/)

- An .env file, it such a configuration things. I attached `.env_example` so you can know what you have to do. Don't forget rename it to `.env`

### Installing
Open terminal in root of this project where you saved it. And do the following command

```shell
npm install
```

I assume you can set up your database on your own, if not ? You can following these [tutorial](https://www.postgresqltutorial.com/). And then run the command

```shell
npm run setup
```

That command will run the server and also create database that we need.

But your database is still empty, so seed database tables with `/seed/table_name` endpoint.
I think that's enough to make the project running, Ah! **if you want to run the server for the next time use this command**

```shell
npm start
```

## License
developed with 💕 by **Ridho Saputra** - *[Instagram](https://instagram.com/mridhosap)*
