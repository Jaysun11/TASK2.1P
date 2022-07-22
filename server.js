const express = require("express");
const path = require('path');

const bodyParser = require('body-parser')


require('dotenv').config();

const sendGrid = require('@sendgrid/mail');

sendGrid.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (msg) => {

    try{
      await sendGrid.send(msg);
      console.log("Email sent");
    } catch(error){

      console.log(error);

      if (error.response){
        console.log(error.response.body);
      }

    }


};


const router = express.Router();

const app = express()

app.use(bodyParser.urlencoded({extended: true}));


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });

app.post('/welcome', function (req, res) {
  var inputBox = req.body.emailInputBox;
  sendEmail({
      to: inputBox,
      from: "jason.tubman2@gmail.com",
      subject: "Welcome to Dev @ Deakin!",
      text: "Welcome to Dev @ Deakin!"
    });
    res.send('Thank you for signing up! A welcome email has been sent');
});


app.use('/', router);
app.use(express.static(__dirname + '/public'));


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
