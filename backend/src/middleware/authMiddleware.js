import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        return next();
        
        } catch(error){
            console.error(error);
            res.status(401).json({error: 'Not authorized, token failed'});
        }
    }
    if(!token){
        res.status(401).json({error: 'Not authorized, no token'});
    }
};