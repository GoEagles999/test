import User from '../models/user.js'
import Hobby from '../models/hobby.js'
import { Request, Response } from 'express';

interface Hobby {
    passionLevel: String
    name: String
    year: String
}

const hobbyController = {
    async create(req: Request, res: Response) {
        try {
            const {
                userId
            } = req.params;
            const {
                passionLevel,
                name,
                year
            }: Hobby = req.body;
            const hobby = new Hobby({
                userId,
                passionLevel,
                name,
                year
            });
            await hobby.save()
            const user = await User
                .findById(userId)
            user
                .hobbies
                .push(hobby['_id'])
            await User
                .findByIdAndUpdate(userId, user)
            res
                .json(hobby)
        } catch (error) {
            res
                .status(500)
                .json({
                    error
                })
        }
    },
    async update(req: Request, res: Response) {
        try {
            const {
                hobbyId,
            } = req.params;
            const {
                passionLevel,
                name,
                year
            }: Hobby = req.body;
            const updated = await Hobby
                .findByIdAndUpdate(hobbyId, req.body)
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
                hobbyId,
            } = req.params;
            const deleted = await Hobby
                .findByIdAndDelete(hobbyId)
            const user = await User
                .findById(deleted.userId)
            user.hobbies = user
                .hobbies
                .filter(hobby => hobby['_id'] !== deleted['_id'])
            await User
                .findByIdAndUpdate(deleted.userId, user)
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
}

export default hobbyController