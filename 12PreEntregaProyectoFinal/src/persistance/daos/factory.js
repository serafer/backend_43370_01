import config from '../../config.js'
import { connect } from 'mongoose'

//------ Mongo ------//
import * as productDaoMongo from './mongodb/productDaoMongo.js'
import * as userDaoMongo from './mongodb/userDaoMongo.js'
import * as chatDaoMongo from './mongodb/chatDaoMongo.js'
import * as cartDaoMongo from './mongodb/cartDaoMongo.js'
import { connectionString } from "./mongodb/conection.js";


//------ FS ------//
import * as productDaoFS from './filesystem/productDaoFS.js'
import * as userDaoFS from './filesystem/userDaoFS.js'
import * as chatDaoFS from './filesystem/chatDaoFS.js'
import * as cartDaoFS from './filesystem/cartDaoFS.js'





let userDao;
let prodDao;
let chatDao;
let cartDao;

//let persistence = config.PERSISTENCE;
let persistence = process.argv[2]
;

switch (persistence) {
    case 'file':
        userDao = userDaoFS
        prodDao = productDaoFS
        chatDao = chatDaoFS
        cartDao = cartDaoFS
        console.log('persistence: file:', persistence);
        break;
    case 'mongo':
        await connect(connectionString);
        userDao = userDaoMongo
        prodDao = productDaoMongo;
        chatDao = chatDaoMongo
        cartDao = cartDaoMongo

        console.log('persistence: mongo:', persistence);
        break;
    default:  
        await connect(connectionString);
        
        userDao = userDaoMongo
        prodDao = productDaoMongo;
        chatDao = chatDaoMongo
        cartDao = cartDaoMongo
        console.log('persistence: default', persistence);
        break; 
};

export default { userDao, prodDao, chatDao, cartDao };