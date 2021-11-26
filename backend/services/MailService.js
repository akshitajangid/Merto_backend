const axios = require('axios').default;

module.exports = {
    sendMail:async(email,html,subject)=>{
        var pass= Math.floor(100000 + Math.random() * 900000).toString().substr(0, 6)
		const sgMail = require('@sendgrid/mail')
		sgMail.setApiKey(process.env.SENDGRID_KEY)
		const msg = {
			to: email, // Change to your recipient
			from: process.env.SENDGRID_EMAIL, // Change to your verified sender
			subject: subject,
			html: html,
		}
		sgMail
		.send(msg)
		.then(() => {
				console.log('Email sent')
		})
		.catch((error) => {
			console.error(error)
		})
    }
}