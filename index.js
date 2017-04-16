#!/usr/bin/env node
const util = require('util')
var argv = require('minimist')(process.argv.slice(2));

var a_file = argv.file || argv.f || "";
var a_machine = argv.machine || argv.m || "";

	const USAGE = `Usage: netrc [options] [commands]
Options:
  --machine=  -m           specifies the machine to which the command should refer to.
  --file=     -f           specifies the file to which the cimmand should refer to.
Commands:
  get                      Makes the command read print in json the credentials for the specified machine.
  get login                Makes the command print the login for the specified machine.
  get password|passwd|pwd  Makes the command print the password for the specified machine.
  set login                launches a prompt with which you can set your new login string for the specified machine
  set login=string         sets a new login string for the specified machine
  set password|passwd|pwd  launches a prompt with which you can set your new password for the specified machine`;

var check = {
	// Check default ~/.netrc file or argument file for existence.
	file: function() {
		var fs = require('fs');
		if (a_file != "" && fs.existsSync(a_file) == false) {
			console.error("specified file was not found");
			process.exit(1);
		} else if (fs.existsSync("~/.netrc")) {
			console.error("Default ~/.netrc file was not found");
			process.exit(1);
		} else {
			Netrc = require('netrc-parser')
			netrc = new Netrc(a_file);
		}
	},
	machine: function() {
		if (a_machine == "") {
			console.error("You haven\'t specified a machine to read credentials from, please use \`-m HOST\` or \`--machine=HOST\`");
			process.exit(3);
		}
		for (x in netrc.machines) {
			if (a_machine == netrc.machines[x].value) {
				return;
			}
		}
		process.exit(3);
	}
}

check.file();
check.machine();

if (argv._[0] == "get") {
	if (argv._[1] == "password" || argv._[1] == "passwd" || argv._[1] == "pwd") {
		console.log(netrc.machines[a_machine].password);
		process.exit(0);
	} else if (argv._[1] == "login") {
		console.log(netrc.machines[a_machine].login);
		process.exit(0);
	} else {
		var credentials = {
			login: netrc.machines[a_machine].login,
			password: netrc.machines[a_machine].password
		}
		console.log(JSON.stringify(credentials, null, 4));
		process.exit(0);
	}
} else if (argv._[0] == "set") {
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
			process.exit(0);
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
			process.exit(0);
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
	console.log(USAGE);
	process.exit(2);
}
