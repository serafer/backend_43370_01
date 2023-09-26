import { mailOptionsEthereal, mailOptionsGmail, transporterEthereal, transporterGmail } from "../services/emailServices.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse ()

export const sendMailEthereal = async (req, res) => {
    try {
        const response = await transporterEthereal.sendMail(mailOptionsEthereal);
        return httpResponse.Ok(res, response)
    } catch (error) {
        console.log(error);
    }
}

export const sendMailGmail = async (req, res) => {
    try {
        const { dest, name } = req.body;
        const response = await transporterGmail.sendMail(mailOptionsGmail(dest, name));
        return httpResponse.Ok(res, response)
    } catch (error) {
        console.log(error);
    }
}