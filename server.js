import express from 'express'
import dotenv, { config } from 'dotenv'
import './src/model/connect.js'
import booksRoute from './src/routes/books.route.js';
import chapterRouter from './src/routes/chapters.model.js'
import purchasesRouter from './src/routes/purchases.route.js';
import subscriptionRouter from './src/routes/subscriptions.route.js';
import userRouter from './src/routes/auth.route.js';

import { CreateBookTable } from './src/controller/books.controller.js';
import {CreateChapterTable} from './src/controller/chapters.controller.js'
import { CreatePurchasesTable} from './src/controller/purchases.controller.js'
import { CreateSubscriptionsTable } from './src/controller/subscriptions.controller.js';
import { CreateUsersTable } from './src/controller/auth.controller.js';


dotenv.config();
const app = express()

const PORT = 5001

app.use(express.json())

CreateBookTable()
CreateChapterTable()
CreatePurchasesTable()
CreateSubscriptionsTable()
CreateUsersTable()

app.use('/api/users', userRouter);
app.use('/api/books', booksRoute);
app.use('/api/chapters', chapterRouter);
app.use('/api/purchases', purchasesRouter)
app.use('/api/subscriptions', subscriptionRouter)




app.get('/', (req, res) => {
    res.send("Digital Legal library API is running")
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
