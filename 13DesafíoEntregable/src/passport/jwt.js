import passport from 'passport'
import {ExtractJwt,Strategy as jwtStrategy}from 'passport-jwt'
import config from '../config.js'
import { getUserByID } from '../persistance/daos/mongodb/userDaoMongo.js'

const strategyOption={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_KEY_JWT
}

const verifyToken=async(jwt_payload,done)=>{
    
        //console.log("payload jwt",jwt_payload);
        
    const user=await getUserByID(jwt_payload.userId)

    //console.log('user verifyToker Autenticator: ',user);

    if(!user)return done(null,false)
    done(null,user)
}

passport.use('jwt',new jwtStrategy(strategyOption,verifyToken))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{
    const user=await getUserByID(id)
    done(null,user)
})