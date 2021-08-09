import User from '../models/user.js'
import { Request, Response } from 'express';

const userController = {
    async get(req: Request, res: Response) {
        try {
            const {
                userId,
            } = req.params;
            const user = await User
                .findById(userId)
                .populate('hobbies')
                .exec()
            res
                .json(user)
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({
                    error
                })
        }
    },
    async create(req: Request, res: Response) {
        try {
            const {
                userName,
            } = req.params;
            const user = new User({
                name: userName,
                hobbies: []
            });
            await user.save()
            res
                .json(user)
        } catch (error) {
            res
                .status(500)
                .json({
                    error
                })
        }
    },
    async update(req: Request, res: Response) {
        const {
            userName,
        } = req.params;
        const {
            newName
        } = req.body;
        try {
            const updated = await User
                .findOneAndUpdate(
                    { name: userName },
                    { name: newName }
                )
            res
                .json(updated)
        } catch (error) {
            res
                .status(500)
                .json({
                    error
                })
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const {
                userName,
            } = req.params;
            const deleted = await User
                .deleteOne({ name: userName });
            res
                .json(deleted)
        } catch (error) {
            res
                .status(500)
                .json({
                    error
                })
        }
    },
    async all(req: Request, res: Response) {
        try {
            const users = await User
                .find({})
                .sort({ name: 1 })
            res
                .json(users)
        } catch (error) {
            res
                .status(500)
                .json({
                    error
                })
        }
    }
}

export default userController