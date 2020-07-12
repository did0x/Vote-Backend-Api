import dbQuery from '../db/dbQuery';

import {
    successMessage,
    errorMessage,
    status,
} from '../helpers/status'

const getAllCandidate = async (req, res) => {
    const getAllCandidateQuery = 'SELECT * FROM candidate';
    try {
        const { rows } = await dbQuery.query(getAllCandidateQuery);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'There no candidate';
            return res.status(status.bad).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = `Operation was not successful`;
        return res.status(status.error).send(errorMessage);
    }
};

export { getAllCandidate };
