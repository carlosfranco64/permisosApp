const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user: "carlosfranco6456@gmail.com",
        pass:"ylxxmaejejpcudas"


    }

})


module.exports={transporter}