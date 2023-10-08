import { __dirname, 
    mongoStoreOptions
} from './utils.js';
import express, { json, urlencoded } from 'express';
import passport from 'passport';
import session from 'express-session';
import './passport/jwt.js'
import './passport/local-strategy.js'
import './passport/github-strategy.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import config from './utils/config.js';
const PORT = config.PORT
import './persistance/daos/factory.js'


/* routes */
import viewsRouter from './routes/viewsRoutes.js';
import apiRouter from './routes/index.js';
import { logger } from './utils/logger.js';


const app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


/* handlebards */
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');

/* cookies - session */
app.use(cookieParser());
app.use(session(mongoStoreOptions));

/* inicializo passport - antes de rutas y despues de session */
app.use(passport.initialize());
app.use(passport.session());

/* rutas */
app.use('/', viewsRouter);
app.use('/api', apiRouter);

/* middlewares (manejo de error) */
app.use(errorHandler);

app.listen(PORT, ()=>{ 
    logger.info(`Server listening on port ${PORT}`)});

