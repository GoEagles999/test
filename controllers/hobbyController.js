"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("../models/user.js"));
const hobby_js_1 = __importDefault(require("../models/hobby.js"));
const hobbyController = {
    async create(req, res) {
        try {
            const { userId } = req.params;
            const { passionLevel, name, year } = req.body;
            const hobby = new hobby_js_1.default({
                userId,
                passionLevel,
                name,
                year
            });
            await hobby.save();
            const user = await user_js_1.default
                .findById(userId);
            user
                .hobbies
                .push(hobby['_id']);
            await user_js_1.default
                .findByIdAndUpdate(userId, user);
            res
                .json(hobby);
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
        try {
            const { hobbyId, } = req.params;
            const { passionLevel, name, year } = req.body;
            const updated = await hobby_js_1.default
                .findByIdAndUpdate(hobbyId, req.body);
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
            const { hobbyId, } = req.params;
            const deleted = await hobby_js_1.default
                .findByIdAndDelete(hobbyId);
            const user = await user_js_1.default
                .findById(deleted.userId);
            user.hobbies = user
                .hobbies
                .filter(hobby => hobby['_id'] !== deleted['_id']);
            await user_js_1.default
                .findByIdAndUpdate(deleted.userId, user);
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
};
exports.default = hobbyController;
