exports.verificationMail = (user, otp)=>{
    return (
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
            <style>
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
            </style>
        </head>
        <body>
            <div style="display: flex; max-width: 600px; padding: 24px 50px 0px 50px; flex-direction: column; align-items: flex-start; gap: 24px; background: #C1BFCB;">
                <section style="color: #000; font-family: Itim; font-size: 24px; font-style: normal; font-weight: 400; line-height: normal;">
                    <img src=""/>
                    <h4>Suitscape</h4>
                </section>
                <section  style="display: flex; padding: 48px; flex-direction: column; align-items: center; gap: 24px; align-self: stretch; border-radius: 24px; border: 8px solid #8D88A4; background: #D7D3F2; box-shadow: 0px 0px 20px 0px #1E1E1E;">
                    <div style="color: #322D47; font-family: Itim; font-size: 16px; font-style: normal; font-weight: 400; line-height: normal;">
                        <p>Dear ${user},</p>
                        <p>Welcome to Suitscape! 🚀 To get started with our awesome services, please verify your email by clicking the button below:</p>
                    </div>
                    <a href=${otp} style="all:unset; cursor: pointer; display: flex; padding: 8px 16px; flex-direction: column; justify-content: center; align-items: center; gap: 10px;border-radius: 24px;background: #8D88A4;box-shadow: 0px 4px 0px 0px rgba(141, 136, 164, 0.30);">
                        <p style="color: #D7D3F2;text-align: center;font-family: Itim;font-size: 24px;font-style: normal;font-weight: 400;line-height: normal;margin:0">${otp}</p>
                    </a>
                    <p style="align-self: stretch;color: #322D47;text-align: center;font-family: Itim;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;">Kindly enter the OTP(One-Time-Password) or click the button to verify your account and gain access to our services.<br> This OTP will be valid for the next 15 minutes. Welcome aboard!</p>
                </section>
                <section style="display: flex;padding: 10px;align-items: flex-start;gap: 10px;align-self: stretch;border-radius: 24px 24px 0px 0px;background: #322D47;">
                    <p style="color: #D7D3F2;text-align: center;font-family: Itim;font-size: 12px;font-style: normal;font-weight: 400;line-height: normal;">If you have any questions or need assistance, please feel free to reach out to us at <span style="color: #D7D3F2;font-family: Itim;font-size: 12px;font-style: normal;font-weight: 400;line-height: normal;text-decoration-line: underline;">info@Suitscape.com</span>. We are here to help!</p>
                </section>
            </div>
        </body>
        </html>
        `
    )
}