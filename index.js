#!/usr/bin/env node
const util = require('util')
const Netrc = require('netrc-parser')

var argv = require('minimist')(process.argv.slice(2));
//console.log(JSON.stringify(argv, null, 4));

var a_file = argv.file || argv.f;
var a_machine = argv.machine || argv.m;

//console.log(file)

function printhelp() {
}

if (argv._[0] == "get") {
	const netrc = new Netrc(a_file);
	if (argv._[1] == "password" || argv._[1] == "passwd" || argv._[1] == "pwd"){
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
} else {
	printhelp();
}
