# Command line netrc parser using [node-netrc-parser](https://github.com/dickeyxxx/node-netrc-parser/) by [dickyxxx](https://github.com/dickeyxxxa).

### Background:

Have you ever encountered a command line application that enables you to retrieve a password from another command's output? I've encountered 2 of this: [vdirsyncer](https://vdirsyncer.pimutils.org/) (documented [here](https://vdirsyncer.pimutils.org/en/stable/keyring.html) and discussed [here](https://github.com/pimutils/vdirsyncer/issues/278)) and [toxic](https://github.com/JFreegman/toxic).
When I was faced with these options, I was eager to integrate it with my `~/.netrc` file. I googled `cli netrc parser` and the closest solution was [node-netrc-parser](https://github.com/dickeyxxx/node-netrc-parser/) but it lacks the necessary command line interface I was looking for.

Anyway, I made this little utility to help you if that's what you were looking for.

### Usage:

```sh
$ netrc
Usage: netrc [options] [commands]
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
```

### License
ISC
