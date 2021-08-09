"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("../models/user.js"));
const userController = {
    async get(req, res) {
        try {
            const { userId, } = req.params;
            const user = await user_js_1.default
                .findById(userId)
                .populate('hobbies')
                .exec();
            res
                .json(user);
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({
                error
            });
        }
    },
    async create(req, res) {
        try {
            const { userName, } = req.params;
            const user = new user_js_1.default({
                name: userName,
                hobbies: []
            });
            await user.save();
            res
                .json(user);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error
            });
        }
    },
    async update(req, res) {
        const { userName, } = req.params;
        const { newName } = req.body;
        try {
            const updated = await user_js_1.default
                .findOneAndUpdate({ name: userName }, { name: newName });
            res
                .json(updated);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error
            });
        }
    },
    async delete(req, res) {
        try {
            const { userName, } = req.params;
            const deleted = await user_js_1.default
                .deleteOne({ name: userName });
            res
                .json(deleted);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error
            });
        }
    },
    async all(req, res) {
        try {
            const users = await user_js_1.default
                .find({})
                .sort({ name: 1 });
            res
                .json(users);
        }
        catch (error) {
            res
                .status(500)
                .json({
                error
            });
        }
    }
};
exports.default = userController;
