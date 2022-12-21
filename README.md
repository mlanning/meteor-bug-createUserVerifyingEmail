# BUG Example

This project shows a bug that is coming up using the [createUserVerifyingEmail](https://docs.meteor.com/api/passwords.html#Accounts-createUserVerifyingEmail) in the `accounts-passwords` meteor package.


## To reproduce this bug
### Install project
- Clone [this repo](https://github.com/mlanning/meteor-bug-createUserVerifyingEmail)
- Run `meteor npm install`
- Run `npm run start`
- Open `http://localhost:3000` in your browser

### Create a second user
- There should already be one user in the database.
```
username: Neo,
email: neo@example.com
password: password 
```
- Try creating the same user again using those credentials, or try creating two new users with the same credentials.

## Expected behavior
Should show an alert message saying that "Username already exists.", and the error object should also show in the client console.

## Current behavior
Nothing shows on the client side. 

An error message shows in the server console:
```
W20221221-10:19:11.192(-7)? (STDERR) (node:29848) UnhandledPromiseRejectionWarning: Error: Username already exists. [403]
W20221221-10:19:11.192(-7)? (STDERR)     at AccountsServer._handleError (packages/accounts-base/accounts_server.js:1487:19)
W20221221-10:19:11.192(-7)? (STDERR)     at AccountsServer._checkForCaseInsensitiveDuplicates (packages/accounts-base/accounts_server.js:1456:14)
W20221221-10:19:11.192(-7)? (STDERR)     at AccountsServer._createUserCheckingDuplicates (packages/accounts-base/accounts_server.js:1469:10)
W20221221-10:19:11.193(-7)? (STDERR)     at packages/accounts-password/password_server.js:927:19
...
```
