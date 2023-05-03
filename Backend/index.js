const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send', upload.single('attachment'), function(req, res) {
  

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: "contatopets@petsmellon.com.br",
      pass: "Patense2438",
    }
  });

  const mailOptions = {
    from: 'contatopets@petsmellon.com.br',
    to: "matheustxr.dev@gmail.com",
    subject: "Quero Ser Um Revendedor Zoomies",
    html: `<p>Nome: ${req.body.nome}</p>
             <p>Telefone: ${req.body.telefone}</p>
             <p>E-mail: ${req.body.email}</p>
             <p>Mensagem: ${req.body.mensagem}</p>`,
    attachments: []
  };
  
  if (req.file) {
    mailOptions.attachments.push({
      filename: req.file.originalname,
      path: req.file.path
    });
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao enviar email');
    } else {
      console.log('Email enviado: ' + info.response);
    }
     res.redirect('https://6452b3f58d7817156f44a7c9--gleaming-palmier-3a61ff.netlify.app/index.html');
  });
});

app.listen(3000, function() {
  console.log('Servidor rodando na porta 3000');
});
