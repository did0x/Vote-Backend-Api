import pool from '../../config';

pool.on('connect', () => {
    console.log('connected to the db');
});

const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users (
        nik SERIAL PRIMARY KEY,
        password VARCHAR(100) NOT NULL,
        has_voted BOOL DEFAULT(false),
        created_on DATE NOT NULL
    )`;
    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createCandidateTable = () => {
    const candidateCreateQuery = `CREATE TABLE IF NOT EXISTS candidate (
        id SERIAL PRIMARY KEY,
        chairman_name VARCHAR(100) NOT NULL,
        vice_name VARCHAR(100) NOT NULL
    )`;
    pool.query(candidateCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createBlockchainTable = () => {
    const blockchainCreateQuery = `CREATE TABLE IF NOT EXISTS blockchain (
        index SERIAL PRIMARY KEY,
        user_nik INTEGER REFERENCES users(nik) ON DELETE CASCADE,
        candidate_id INTEGER REFERENCES candidate(id) ON DELETE CASCADE,
        nonce VARCHAR(150) NOT NULL,
        hash VARCHAR(150) NOT NULL,
        previous_hash VARCHAR(150) NOT NULL,
        timestamp DATE NOT NULL
    )`;
    pool.query(blockchainCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const dropUserTable = () => {
    const userDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(userDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const dropCandidateTable = () => {
    const candidateDropQuery = 'DROP TABLE IF EXISTS candidate';
    pool.query(candidateDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const dropBlockchainTable = () => {
    const blockchainDropQuery = 'DROP TABLE IF EXISTS blockchain';
    pool.query(blockchainDropQuery)
        .then((res) => {
            console.log(res)
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createAllTables = () => {
    createUserTable();
    createCandidateTable();
    createBlockchainTable();
};

const dropAllTables = () => {
    dropUserTable();
    dropCandidateTable();
    dropBlockchainTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createAllTables,
    dropAllTables,
};

require('make-runnable');
