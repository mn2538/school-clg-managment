    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';
    import db from '../db/db.js';
    import dotenv from 'dotenv';

    dotenv.config();
    const JWT_SECRET = process.env.JWT_SECRET;

    export const checkEmail = async (req, res) => {
        const {email} = req.body;
        if(!email){ 
            return res.status(400).json({error: 'send the email.'});
        }

        try{
            const existing = await db('users').where({email}).first();

            if(existing){
                return res.status(200).json({exists: true});
            } else {
                return res.status(200).json({exists: false});
            }
        } catch (error){
            console.log(error); 
            return res.status(500).json({error : 'Internal server error.'});
        }
    }

    export const registerUser = async (req, res) => {
        const {username, email, password, role} = req.body;

        if(!username || !password || !email || !role){ 
            return res.status(400).json({error: 'all details are required.'});
        }
        
        const existing = await db('users').where({email}).first();
        if(existing){
            return res.status(400).json({error: 'email already in use. '});
        } else {
        try{
            const hashedPassword = await bcrypt.hash(password,10);
            const [userId] = await db('users').insert({
                username,
                email,
                password_hash: hashedPassword,
                role
            }).returning('id');

        return res.status(201).json({message: 'User registered successfully', userId});

        } catch(error){
            if(error.code === '23505'){
                return res.status(409).json({error: 'Username already taken.'});
            }
            console.error(error);
            res.status(500).json({error:"Internal server error."});
        }
    }
    }

    export const loginUser = async(req, res) => {
        const body = req.body;

        try{
            const user = await db('users').where({email:body.email}).first();
            if(!user){
                return res.status(401).json({error: 'Invalid Credentials'});
            }

            const match = await bcrypt.compare(body.password, user.password_hash);
            if(!match){
                return res.status(401).json({error: 'Invalid credentials'});
            } 

            const token = jwt.sign({id: user.id, username: user.username, role: user.role}, JWT_SECRET, {expiresIn:'1d'});

            res.status(200).json({message: 'Login successful', token, user: {id: user.id, username: user.username, role: user.role}});
        } catch (error){
            console.log(error);
            res.status(500).json({error: 'Internal server error.'});
        }
    }
