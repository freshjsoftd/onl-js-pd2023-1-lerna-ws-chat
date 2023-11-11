const express = require('express');
const cors = require('cors');
// =================================
const { messageCtrl } = require('./controllers');

const app = express();

// app.use(express.json());
app.use(cors());

app.get('/api/messages', messageCtrl.getMessages);

app.use((err, req, res, next) => {
  if(res.headerSent){
    return;
  }
  res.status(err?.status ?? 500).send({
    errors: [{title: err?.message ?? 'Internal server error'}]
  })
})


module.exports = app;
