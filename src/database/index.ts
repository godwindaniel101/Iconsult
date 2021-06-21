import mongoose from 'mongoose'
import log from '../utils/log'

function connect() {
  const db_port = process.env.DB_PORT as string

  const db_host = process.env.DB_HOST as string

  const db = process.env.DB as string

  const db_url = `mongodb://${db_host}:${db_port}/${db}`

  return mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      log.info(`Database connected`)
    })
    .catch((e) => {
      log.error(`Database Error:` + e)
    })
}
export default connect
