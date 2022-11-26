const express = require('express'),
  app = express(),
  { engine } = require('express-handlebars'), // before 6.0.0
  port = process.env.PORT || 1024,
  bodyParser = require('body-parser');

app.use(bodyParser({ extended: false }));
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');
app.get('/', (req, res) => res.render('form'));
app.get('/form', (req, res) => res.render('form'));
app.get('/thankyou', (req, res) => res.render('thankyou'));

const report = [];
app.post('/form_post', (req, res) => {
  // console.log(req.body);
  const updatedReq = {
    User: req.body?.User,
    Date: req.body?.Date,
    Project: req.body?.Project,
    Category: req.body?.Category,
    Comments: req.body?.Comments,
    'Start Time': `${req.body?.startTime} ${req.body?.starttime}`,
    'End Time': `${req.body?.endTime} ${req.body?.endtime}`,
  };
  report.push(updatedReq);
  console.log('data::', report);
  res.redirect(303, '/form');
});

app.listen(3000, () => {
  console.log('Listen on the port 3000...');
});
