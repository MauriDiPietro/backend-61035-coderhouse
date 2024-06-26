import mongoose from 'mongoose'
import 'dotenv/config'

try {
  await mongoose.connect(
    process.env.MONGO_URL
  )
  console.log('Conectado a la base de datos')
} catch (error) {
  console.log(error)
}
