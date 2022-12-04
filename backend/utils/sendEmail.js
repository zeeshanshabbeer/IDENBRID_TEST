// const nodemailer = require('nodemailer');
// module.exports = class Email {
//   constructor(student){
//     // console.log(student)
//     this.to=student.user_email 
//   }
//     newTransport() {
//     if(process.env.NODE_ENV==="development"){
//         return nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             auth: {
//               user: process.env.EMAIL_USER,
//               pass: process.env.EMAIL_PASS
//             }
//           });
//     }
// }
//     // 2) Define email options
//    async send(){

const { countDocuments } = require("../models/userModel")

//     const mailOptions = {
//         from:"zeeshanshabbeer@gmail.com" ,
//         to: this.to,
//         subject:"sdfhjkl h b",
//         html:"nb fvjcbmh",
//       };
//   console.log(this.to)
//       // 3) Create a transport and send email
//       this.newTransport().sendMail(mailOptions);
//    }
//   async sendPasswordReset() {
//     await this.send(
//       'passwordReset',
//       'Your password reset token (valid for only 10 minutes)'
//     );
//   }
// }














// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey("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")
// // const apiKey = `${process.env.SENDGRID_API_KEY}`
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const sendEmail =async (to, from, subject, text) => {

//     const msg = {
//         to,
//         from,
//         subject,
//         html:text,
//     }
//     // return await sgMail.send(msg)
//     sgMail.send(msg, function(err, info) {
//         if (err) {
//             console.log("email not send");
//             return err;
//         } else {
//             console.log("email send");
//             return console.log("email send")
//         }
//     })
// }
// module.exports = sendEmail;



// auth file code

      //   // createSendToken(newUser, 201, req, res);
      //   const to=user_email;
      //   const from="z6680362@gmail.com"
      //   // const cc="z6680362@gmail.com"
      //   const subject="Reset Password Link"
      //   const html=`
      //   <h2>Attendence Management System</h2>
      //   <h3>${student.user_name}</h3>
      //   <h3>Reset Password</h3>
      //   <button>
      //   <a href="http://localhost:7000/ResetPassword/${token}">
      //   RESET YOUR PASSWORD
      // </button>
      //   `
      //   try {
      //   await sendEmail(to,  from, subject, html);
      //   res.status(200).json({
      //     status:"success",
      //     message:"Email Send Successfully"
      //   })
      //   } catch (error) {
      //     return next(
      //       new AppError(error,
      //       400)
      //     )
      //   }