import jwt from 'jsonwebtoken';
import { 
    errorMessage, status,
} from '../helpers/status';

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            nik: decoded.nik,
        };
        next();
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

export default verifyToken;
