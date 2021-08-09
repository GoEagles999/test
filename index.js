"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userController_1 = __importDefault(require("./controllers/userController"));
const hobbyController_1 = __importDefault(require("./controllers/hobbyController"));
//import swaggerDocument from './swagger.json'
const app = express_1.default();
app
    .use(express_1.default.json());
const PORT = 3000;
mongoose_1.default
    .connect('mongodb+srv://admin:admin@cluster0.2un09.mongodb.net/main?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
//app
//    .use(
//        '/api-docs',
//        swaggerUi.serve,
//        swaggerUi.setup(swaggerDocument)
//    )
app
    .get('/user/:userId', userController_1.default.get);
app
    .post('/user/:userName', userController_1.default.create);
app
    .put('/user/:userName', userController_1.default.update);
app
    .post('/hobby/:userId', hobbyController_1.default.create);
app
    .put('/hobby/:hobbyId', hobbyController_1.default.update);
app
    .delete('/hobby/:hobbyId', hobbyController_1.default.delete);
app
    .listen(PORT, async () => {
    console.log(`app listening at http://localhost:${PORT}`);
});
