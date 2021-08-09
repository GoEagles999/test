import express from 'express';
import mongoose from 'mongoose'
import userController from './controllers/userController'
import hobbyController from './controllers/hobbyController'
import swaggerUi from 'swagger-ui-express'
//import swaggerDocument from './swagger.json'

const app = express()

app
    .use(express.json())

const PORT: number = 3000

mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.2un09.mongodb.net/main?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
    .catch((err) => {
        console.log(err)
        process.exit(1);
    });

//app
//    .use(
//        '/api-docs',
//        swaggerUi.serve,
//        swaggerUi.setup(swaggerDocument)
//    )

app
    .get(
        '/user/:userId',
        userController.get
    )

app
    .post(
        '/user/:userName',
        userController.create
    )

app
    .put(
        '/user/:userName',
        userController.update
    )

app
    .post(
        '/hobby/:userId',
        hobbyController.create
    )

app
    .put(
        '/hobby/:hobbyId',
        hobbyController.update
    )

app
    .delete(
        '/hobby/:hobbyId',
        hobbyController.delete
    )

app
    .listen(
        PORT,
        async () => {
            console.log(`app listening at http://localhost:${PORT}`)
        }
    )