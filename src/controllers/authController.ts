import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user: any = await User.create({ email, password });
    res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id.toString()),
    });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
