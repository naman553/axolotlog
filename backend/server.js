import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import blogRoutes from './routes/blog.routes.js'
dotenv.config()


const app = express()
const port = process.env.PORT || 3000
app.use(cookieParser())
app.use('/api/blog', blogRoutes)
connectDB()
app.use(express.json())
app.use('/api/auth', authRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})