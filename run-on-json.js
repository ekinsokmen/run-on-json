#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
// shebang credit to http://unix.stackexchange.com/a/65295

const vm = require('vm');
const cmd = require('commander');
var fs = require('fs');

cmd
  .version('1.0.0')
  .option('-i, --input <jsonFile>', 'JSON file')
  .option('-f, --scriptFile <scriptFile>', 'JavaScript file')
  .option('-s, --scriptCmd <scriptCmd>', 'JavaScript command')
  .action(cmd.action)
  .parse(process.argv);

const jsonFileName = cmd.input || cmdHelp("JSON file name is required.");
const scriptInfo = 
  cmd.scriptFile?{ "isFile" : true, "script" : cmd.scriptFile} : ""
  || cmd.scriptCmd?{ "isFile" : false, "script" : cmd.scriptCmd} : "" 
  || cmdHelp("JavaScript file name or command is required.");

var input = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
var scriptStr = scriptInfo.script;
if (scriptInfo.isFile)
{
  scriptStr = fs.readFileSync(scriptInfo.script, 'utf8');
}

const script = new vm.Script(scriptStr);
runScript(input);

function runScript(input) 
{
  var sandbox = {
    'input' : input,
    'console' : console
  }
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
}

function cmdHelp(msg) 
{
  console.log(msg);
  cmd.help();
}