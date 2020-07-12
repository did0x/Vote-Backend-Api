import pool from '../../config';
import { hashPassword } from '../helpers/validation';
import { status } from '../helpers/status';

const seedUser = async (req, res) => {
    const seedUserQuery = `INSERT INTO users VALUES
    (1301184402, '${hashPassword('password1')}', default, NOW()),
    (1301194119, '${hashPassword('password2')}', default, NOW()),
    (1301182420, '${hashPassword('password3')}', default, NOW())`;

    try {
        const { rows } = await pool.query(seedUserQuery);
        const dbResponse = rows;
        if (!dbResponse) {
            return res.status(status.bad).send(`Seeding was not successful`);
        }
        return res.status(status.created).send('Seeding user was successfuly');
    } catch (error) {
        return res.status(status.error).send(`An error occured, try later. Message ${error}`);
    }
};

export default seedUser;
