const mailer = require("../config/mailer")


const sendMail = async(to, subject, html)=>{
    try{
        const mailOptions = {
            from: 'Suitscape',
            to, 
            subject, 
            html,
        }

        const send = mailer.sendMail(mailOptions);
        return send;
    }catch(err){
        console.log('Error while sending mail: ', err.message)
    }
}

exports.mailSender = sendMail;