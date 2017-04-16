# Command line netrc parser using [node-netrc-parser](https://github.com/dickeyxxx/node-netrc-parser/) by [dickyxxx](https://github.com/dickeyxxxa).

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
