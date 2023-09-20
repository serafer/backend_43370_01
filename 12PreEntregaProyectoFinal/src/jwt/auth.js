import jwt from 'jsonwebtoken';
import config from '../config.js';

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    // first_name: user.first_name,
    // last_name: user.last_name,
    // email: user.email,
    // age: user.age
  };

  const token = jwt.sign(payload, config.SECRET_KEY_JWT, {
    expiresIn: '20m',  
  });

  //console.log('auth token: ' + token);
  return token;
};





