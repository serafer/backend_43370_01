import twilio from 'twilio';
import config from '../config.js'

export const twilioClient = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);