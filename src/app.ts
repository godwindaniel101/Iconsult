import helmet from "helmet";
import  express from "express"
import mongoSanitize from "express-mongo-sanitize"
import { appLimit } from "./middleware/limiter";
import globalError from './utils/error/globalError'
import routes from "./route";

const app = express();

app.use(express.json());
//Body parser, reading data from body to req.body

app.use(helmet())
//this gives extra level of protection by adding some security header

app.use(mongoSanitize());
// sanitizes user-supplied data to prevent MongoDB Operator Injection

app.use(appLimit)
//limit the number of call made the software

app.use('/api/v1', routes)
//entry point for api calls

app.use(globalError)
//catch all errors
export default app;