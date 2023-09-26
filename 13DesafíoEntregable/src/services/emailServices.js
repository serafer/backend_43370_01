import { createTransport } from 'nodemailer';
import config from '../config.js';
import { templateHtml } from './template.js';

export const transporterEthereal = createTransport({
    host: config.HOST,
    port: config.PORT_ETHEREAL,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD,
    }
});

export const mailOptionsEthereal = {
    from: config.EMAIL,
    to: config.EMAIL,
    subject: 'Bienvenido/a',
    //text: 'Este es el texto del email',
    // html: `<h1>Bienvenido a Coderhouse</h1>`,
    html: templateHtml,
    // attachments: [
    //     {
    //         //path: process.cwd() + '/src/services/adjunto.txt',
    //         //filename: `resumen-de-cuenta-${process.env.EMAIL_ETHEREAL}`
    //     }
    // ]
};



export const transporterGmail = createTransport({
    service: 'gmail',
        port: 465,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASSWORD_GMAIL
    }
});


export const mailOptionsGmail = (dest,name) =>({

    
    from: config.EMAIL_GMAIL,
    to: dest,
    subject: 'Bienvenido/a',
    html: `<h1>Hola ${name}, ¡Te damos la bienvenida!</h1>`
});




export const mailOptionsGmailLoginOk = (dest,name) =>({

    
    from: config.EMAIL_GMAIL,
    to: dest,
    subject: 'Inicio de sesión exitoso',
    html: `<h1>Tu inicio de sesión fue exitoso</h1>`
});