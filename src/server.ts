import app from "./app"
import log from "./utils/log"
import  connect from "./database";

connect();
// The above function calls an instance of the db connection

const port = +process.env.PORT! as number

const host = process.env.HOST as string

app.listen(port, host, ()=>{

    log.info(`Serving on port : ${port}`)
})