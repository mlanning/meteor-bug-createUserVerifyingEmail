import { Meteor } from "meteor/meteor";

Meteor.startup( () => {
  const users = Meteor.users.find({}).fetch();
  if (users.length === 0) {
    Accounts.createUser({
      username: "Neo",
      email: "neo@example.com",
      password: "password",
    });
  }
});

Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
  });

Accounts.config({ sendVerificationEmail: true });

Meteor.methods({
  createUserAccount(user) {
    /**
     * This seems to be the issue. 
     * Using the other method `createUser` works as expected.
     */
    Accounts.createUserVerifyingEmail({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },
  sendVerificationLinkEmail(email) {
    const user = Accounts.findUserByEmail(email);
    Accounts.sendVerificationEmail(user._id);
  },
});