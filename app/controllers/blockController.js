import moment from 'moment';
import dbQuery from '../db/dbQuery'

import { 
    isEmpty,
    hashBlock,
    hashNonce,
    isValidBlock,
} from '../helpers/validation';

import {
    successMessage,
    errorMessage,
    status,
} from '../helpers/status';

const createVote = async (req, res) => {
    const { user_nik, candidate_id } = req.body;
    const timestamp = moment(new Date());
    if (isEmpty(user_nik) || isEmpty(candidate_id)) {
        errorMessage.error = 'Some field is empty';
        return res.status(status.bad).send(errorMessage);
    }
    const dataNonce = candidate_id.toString() + timestamp.toString();
    const nonce = hashNonce(dataNonce);
    const dataHash = user_nik + candidate_id + nonce + timestamp;
    const hash = hashBlock(dataHash);
    const getLastBlockQuery = 'SELECT * FROM blockchain ORDER BY index DESC LIMIT 1';
    const createVoteQuery = `INSERT INTO 
        blockchain VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
    try {
        const { rows } = await dbQuery.query(getLastBlockQuery);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Genesis not inserted';
            return res.status(status.bad).send(errorMessage);
        }
        const block = {
            index: dbResponse.index+1,
            user_nik: user_nik,
            candidate_id: candidate_id,
            nonce: nonce,
            hash: hash,
            previous_hash: dbResponse.hash,
            timestamp: timestamp,
        };
        const values = Object.values(block);
        if (isValidBlock(block, dbResponse)) {
            const { rows } = await dbQuery.query(createVoteQuery, values);
            const dbResponse = rows;
            delete dbResponse.nonce;
            delete dbResponse.hash;
            delete dbResponse.previous_hash;
            successMessage.data = dbResponse;
            return res.status(status.created).send(successMessage);
        }
        errorMessage.error = "Blockchain was not right";
        return res.status(status.error).send(errorMessage);
    } catch (error) {
        errorMessage.error = `Operation was not successful`;
        return res.status(status.error).send(errorMessage);
    }
};

const getAllVote = async (req, res) => {
    const getAllVoteQuery = 'SELECT * FROM blockchain WHERE index > 0';
    try {
        const { rows } = await dbQuery.query(getAllVoteQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'Vote never submitted';
            return res.status(status.bad).send(errorMessage);
        }
        delete dbResponse.nonce;
        delete dbResponse.hash;
        delete dbResponse.previous_hash;
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = `Operation was not successful ${error}`;
        return res.status(status.error).send(errorMessage);
    }
}

export { 
    createVote,
    getAllVote,
 };