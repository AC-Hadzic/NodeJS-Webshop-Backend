// src/index.js
import express, { Express } from 'express'
import 'reflect-metadata'
import cors from 'cors'
import compression from 'compression'
import dataSource from './app-data-source'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import errorHandler from './middlewares/errorHandler'
import ProductImporter from './config/productImporter'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import * as dotenv from 'dotenv'

dotenv.config();

const app: Express = express()
const port = process.env.PORT || 3000

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
    await ProductImporter.loadAllProducts()
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

console.log(`PGHOST: ${process.env.PGHOST}`);
console.log(`PGUSER: ${process.env.PGUSER}`);
console.log(`PGDATABASE: ${process.env.PGDATABASE}`);

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.static('public'))

app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

module.exports = app;