import moment from 'moment';
import dbQuery from '../db/dbQuery';

import { 
    hashPassword,
    comparePassword,
    isValidPassword,
    isEmpty,
    generateUserToken,
} from '../helpers/validation';

import {
    successMessage,
    errorMessage,
    status,
} from '../helpers/status';


const createUser = async (req, res) => {
    const { nik, password } = req.body;
    const created_on = moment(new Date());
    if (isEmpty(nik) || isEmpty(password)) {
        errorMessage.error = 'Some field is empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidPassword(password)) {
        errorMessage.error = 'Passowrd must be five(5) character';
        return res.status(status.bad).send(errorMessage);
    }
    const hashedPassword = hashPassword(password);
    const createUserQuery = `INSERT INTO 
        users(nik, password, created_on) VALUES ($1, $2, $3) returning *`;
    const values = [
        nik, hashedPassword, created_on,
    ];

    try {
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbResponse = rows[0];
        delete dbResponse.password;
        const token = generateUserToken(dbResponse.nik);
        successMessage.data = dbResponse;
        successMessage.token = token;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that NIK already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = `Operation was not successful`;
        return res.status(status.error).send(errorMessage);
    }
}

const signinUser = async (req, res) => {
    const { nik, password } = req.body;
    if (isEmpty(nik) || isEmpty(password)) {
        errorMessage.error = 'Somefield is empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidPassword(password)) {
        errorMessage.error = 'Please enter a valid password';
        return res.status(status.bad).send(errorMessage);
    }
    const signinUserQuery = 'SELECT * FROM users WHERE nik = $1';
    try {
        const { rows } = await dbQuery.query(signinUserQuery, [nik]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'User with this nik does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }
        const token = generateUserToken(dbResponse.nik);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = `Operation was not successful`;
        return res.status(status.error).send(errorMessage);
    }
};

export {
    createUser,
    signinUser,
};
