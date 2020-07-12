import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const hashNonce = data => bcrypt.hashSync(data, salt);
const hashBlock = data => bcrypt.hashSync(data, salt);

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
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
    const dataNonce = block.candidate_id.toString() + block.timestamp.toString();
    const realNonce = hashNonce(dataNonce);
    if (realNonce !== block.nonce) {
        return false;
    }
    const dataHash = block.user_nik + block.candidate_id + block.nonce + block.timestamp;
    const realHash = hashBlock(dataHash);
    if (realHash !== block.hash) {
        return false;
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
    hashNonce,
    hashBlock,
    comparePassword,
    isValidPassword,
    isValidBlock,
    isEmpty,
    generateUserToken,
};
