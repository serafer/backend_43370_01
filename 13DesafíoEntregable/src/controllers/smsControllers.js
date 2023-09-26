import config from "../config.js";
import { twilioClient } from "../services/smsServices.js";
import { HttpResponse } from "../utils/http.response.js";

export const sendSMS = async (req, res, next) => {
    try {
        const message = {
            body: req.body.message,
            from: config.TWILIO_PHONE,
            to: req.body.dest
        };
        const response = await twilioClient.messages.create(message);
        return HttpResponse.Ok(res, response)
    } catch (error) {
        next(error.message);
    }
}