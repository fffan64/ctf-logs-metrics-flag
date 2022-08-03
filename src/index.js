const express = require('express');
const robots = require('express-robots-txt');
const promMid = require('express-prometheus-middleware');
const bodyParser = require('body-parser')
const multer = require('multer');
const fetch = require('node-fetch');
const upload = multer();
const fs = require('fs-extra');
const path = require('path');


const PORT = 8080;
const Disallow = ['/data/var/logs/', '/data/app/whatever/', '/data/cmlja3JvbGwK/', '/data/metrics/', '/metrics/'];

const LOGS = [];

LOGS.push(`INIT`);

const makeid = (length) => {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

for (let i = 0; i < 50; i++) {
  const folder = `/data/sensitive/${makeid(12)}/`;
  Disallow.push(folder);
  LOGS.push(`Will create folder ${folder}`);
}

// shuffle the dirs
shuffle(Disallow);

// cleanup
fs.removeSync(`${__dirname}/data`);
// create the dirs folder
Disallow.forEach((path) => {
  fs.ensureDirSync(`${__dirname}/${path}`);
});

// // copy the flag in a random dir
const FLAG = process.env.FLAG;
const correctFlagPath = `${Disallow.find((x) => x.includes('sensitive'))}my_fl4g.lol`;
const fullPathFlag = `${__dirname}${correctFlagPath}`;
console.log(correctFlagPath);
console.log(fullPathFlag);
fs.copyFileSync(`${__dirname}/my_fl4g.lol`, fullPathFlag);
LOGS.push(`Copy file "my_fl4g.lol" in sensitive folder ************`);

const app = express();
app.disable('x-powered-by');
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(robots({ UserAgent: '*', Disallow: '/', Disallow: Disallow.filter((x) => x === correctFlagPath.replace('my_fl4g.lol', '') || !x.includes('sensitive')) }));
// app.use(express.static('public'));
// use default path '/metrics',
app.use(promMid());
app.get('/', async (req, res) => {
  // to simulate an already visited link in /metrics
  await fetch(`http://localhost:${PORT}/mySecretPageLoginKikooLol`);
  await fetch(`http://localhost:${PORT}/mySecretPageLoginKikooLol`);
  await fetch(`http://localhost:${PORT}/logsViewer`);
  LOGS.push(`+1 request on / endpoint`);
  return res.status(200).send(`Nothing special uh ?<br>Where should I look for if i'm a bot ?<br><iframe src="https://giphy.com/embed/jolef7xAMSn3cWWdcg" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/coachella-couchella-coachelladoc-jolef7xAMSn3cWWdcg">via GIPHY</a></p><br>Robot rocks !`);
});
app.post('/proxy', async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  LOGS.push(`+1 request on /proxy endpoint with body ${req.body}`);
  if (req.body.value === correctFlagPath) {
    return res.status(200).send(`Flag is: ${FLAG}`);
  } else {
    console.error(`${req.body.value} is not the path of the flag`);
    return res.status(500).send('not good, try again');
  }
});
app.get('/mySecretPageLoginKikooLol', (req, res) => {
  LOGS.push(`+1 request on /************************ endpoint`);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/logsViewer', (req, res) => {
  LOGS.push(`+1 request on /logsViewer endpoint`);
  res.status(200).send(LOGS.join('<br/>'))
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  LOGS.push(`Started and ready to serve requests !`);
});