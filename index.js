#!/usr/bin/env node
const util = require('util')
const Netrc = require('netrc-parser')

var argv = require('minimist')(process.argv.slice(2));
console.log(JSON.stringify(argv, null, 4));

var a_file = argv.file || argv.f;
var a_machine = argv.machine || argv.m;

//console.log(file)

function checkCliArgs() {
}

function checkFileArgs() {
}

function printHelp() {
}

function checkMachines() {
}

if (argv._[0] == "get") {
	const netrc = new Netrc(a_file);
	if (argv._[1] == "password" || argv._[1] == "passwd" || argv._[1] == "pwd") {
		console.log(netrc.machines[a_machine].password);
	} else if (argv._[1] == "login") {
		console.log(netrc.machines[a_machine].login);
	} else {
		var credentials = {
			login: netrc.machines[a_machine].login,
			password: netrc.machines[a_machine].password
		}
		console.log(JSON.stringify(credentials, null, 4));
	}
} else if (argv._[0] == "set") {
	const netrc = new Netrc(a_file);
	if (argv._[1] == "password" || argv._[1] == "passwd" || argv._[1] == "pwd") {
		var prompt = require('prompt');
		prompt.message = "";
		prompt.start();
		var schema = {
			properties: {
				password: {
					hidden: true,
					message: ""
				}
			}
		};
		prompt.get(schema, function(err, result) {
			netrc.machines[a_machine].password = result.password;
			console.log("password for " + a_machine + " machine was set");
		})
	} else if (argv._[1] == "login") {
		var prompt = require('prompt');
		prompt.message = "";
		prompt.start();
		var schema = {
			properties: {
				login: {
					message: ""
				}
			}
		};
		prompt.get(schema, function(err, result) {
			netrc.machines[a_machine].login = result.login;
			console.log("login for " + a_machine + " machine was set as " + result.login);
		})
	} else if (/login=[a-zA-Z0-9]+$/.test(argv._[1])) {
		var login2set = argv._[1].replace(/login=/,"");
		netrc.machines[a_machine].login = login2set;
		console.log("login for " + "\'" + a_machine + "\'" + " machine was set as " + "\'" + login2set + "\'");
		process.exit(0);
	} else {
		console.log(USAGE);
		process.exit(2);
	}
} else {
	printHelp();
}
