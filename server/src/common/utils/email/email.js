// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
//   port: 587,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });



// const sendMail = async (to, subject, html) => {
//     await transporter.sendMail({
//         from : `${process.env.EMAIL_USER}`,
//         to,
//         subject,
//         html,
//     })
// }


// const sendVerificationMail = async (email, token) => {
//     await transporter.sendMail({
//         from : `${process.env.EMAIL_USER}`,
//         email,
//         html: `<html></html>`
//     })
// }


// // try {
// //   const info = await transporter.sendMail({
// //     from: '"Example Team" <team@example.com>', // sender address
// //     to: "alice@example.com, bob@example.com", // list of recipients
// //     subject: "Hello", // subject line
// //     text: "Hello world?", // plain text body
// //     html: "<b>Hello world?</b>", // HTML body
// //   });

// //   console.log("Message sent: %s", info.messageId);
// //   // Preview URL is only available when using an Ethereal test account
// //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // } catch (err) {
// //   console.error("Error while sending mail:", err);
// // }

// export {sendMail, sendVerificationMail}