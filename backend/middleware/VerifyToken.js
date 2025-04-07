import jwt from 'jsonwebtoken';

export const VerifyToken = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = decoded;
        next();
    });
};