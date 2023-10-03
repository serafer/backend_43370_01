import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
  };

  const token = jwt.sign(payload, config.SECRET_KEY_JWT, {
    expiresIn: '20m',  
  });

  return token;
};





