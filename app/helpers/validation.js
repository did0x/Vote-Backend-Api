import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const nonce = data => bcrypt.hashSync(data, salt);
const hashBlock = data => bcrypt.hashSync(data, salt);

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compare(password, hashedPassword);
};

const isValidPassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};

const isValidBlock = (block, previous_block) => {
    if (previous_block.index+1 !== block.index) {
        return false;
    }
    if (bcrypt.compareSync(block.candidate_id, block.nonce)) {
        return false;
    }
    if (bcrypt.compareSync()) {

    }
    if (previous_block.hash !== block.previous_hash) {
        return false;
    } return true;
};


const isEmpty = (data) => {
    const input = data.toString();
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

const generateUserToken = (nik) => {
    const token = jwt.sign({nik}, process.env.SECRET_KEY, 
        { expiresIn: '2h' });
    return token;
};

export {
    hashPassword,
    nonce,
    hashBlock,
    comparePassword,
    isValidPassword,
    isValidBlock,
    isEmpty,
    generateUserToken,
};
