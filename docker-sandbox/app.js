import express from 'express';
import ExpressBrute from 'express-brute';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import { resolve } from 'path';
import SandBox from './DockerSandbox.js';
import compilerArray from './compilers.js';

var app = express();
var server = http.createServer(app);
var port = 8080;

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store, {
  freeRetries: 50,
  lifetime: 3600,
});

app.use(express.static(resolve('')));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

function random(size) {
  //returns a crypto-safe random
  return randomBytes(size).toString('hex');
}

/**
 * @api {post} /compile Compile Code
 * 生成一个sandBox
 */
app.post('/compile', bruteforce.prevent, function (req, res) {
  var language = req.body.language; //id
  var code = req.body.code;
  var stdin = req.body.stdin;
  if (stdin == undefined) stdin = '';

  var folder = 'temp/' + random(10); //folder in which the temporary folder will be saved
  var path = resolve('') + '/'; //current working path
  var vm_name = 'qxxiao/compile-sandbox'; //name of virtual machine that we want to execute
  var timeout_value = 5; //Timeout Value, In Seconds

  //details of this are present in DockerSandbox.js
  var sandboxType = new SandBox(
    timeout_value,
    path,
    folder,
    vm_name,
    compilerArray[language][0],
    compilerArray[language][1],
    code,
    compilerArray[language][2],
    compilerArray[language][3],
    compilerArray[language][4],
    stdin
  );
  //data will contain the output of the compiled/interpreted code
  //the result maybe normal program output, list of error messages or a Timeout error
  sandboxType.run(function (data, exec_time, err) {
    res.send({ output: data, langid: language, errors: err, time: exec_time });
  });
});

/**
 *  index.html example
 */
app.get('/', function (req, res) {
  res.sendfile('./web/index.html');
});

console.log('Listening at ' + port);
server.listen(port);
