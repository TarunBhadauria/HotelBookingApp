const mailer = require("../config/mailer")


const sendMail = async(to, subject, html)=>{
    try{
        console.log("Username : ",process.env.NODEMAILER_USERNAME);
        console.log("Password : ",process.env.NODEMAILER_PASSWORD);
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