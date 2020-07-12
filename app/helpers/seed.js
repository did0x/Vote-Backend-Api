import pool from '../../config';
import hashPassword from '../helpers/validation';

pool.on('connect', () => {
    console.log('connected to the db');
});

const seedUser = () => {
    const userSeedQuery = `INSERT INTO users VALUES
    (1301184402, '${hashPassword('password')}', default, NOW()),
    (1301194119, '${hashPassword('password')}', default, NOW()),
    (1301182420, '${hashPassword('password')}', default, NOW())`;
    pool.query(userSeedQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const seedCandidate = () => {
    const candidateSeedQuery = `INSERT INTO candidate VALUES
    (default, 'Ir. H. Joko Widodo', 'Prof. Dr. KH. Maruf Amin'),
    (default, 'H. Prabowo Subianto', 'H. Sandiaga Salahuddin Uno')`;
    pool.query(candidateSeedQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const seed = () => {
    seedUser();
    seedCandidate();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export { seed };

require('make-runnable');
