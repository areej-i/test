const express = require('express');
const session = require('express-session');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('public',path.join(__dirname,'public'));
app.use(express.urlencoded({extended:true}));

//connect middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const nodemailer = require("nodemailer");

//Create session
app.use(session({ 
    cookie:{ maxAge: 1000000000000},
    secret: 'hello cat',
    resave: true,
    saveUninitialized: true
}));

//open port
server.listen(3000, ()=>{console.log('http://localhost:3000/');});


app.use(express.static(__dirname +'/public'))

//Rendering pages
app.get('/',(_req,res)=>{
    res.render('home.html');
})
app.get('/home',(_req,res)=>{
    res.render('home.html');
})

app.post('/send', (req, res) => {
    const output = `
      <p>${req.body.message}</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Service: ${req.body.service}</li>
        <li>Email: areej_irfan@hotmail.com</li>
      </ul>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'areej_irfan@hotmail.com', // generated ethereal user
          pass: 'sunflower123'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"IRCC" <areej_irfan@hotmail.com>', // sender address
        to: 'awesomeareej@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message, // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
    });
    });

