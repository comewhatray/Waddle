import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  //smtp = {
  //  username: 'axemreg%40gmail.com',   // eg: server@gentlenode.com
  //  password: 'axemaxem',   // eg: 3eeP1gtizk5eziohfervU
  //  server:   'smtp.gmail.com',  // eg: mail.gandi.net
  //  port: 465
  //}

  //process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  process.env.MAIL_URL = "smtp://axemreg%40gmail.com:axemaxem@smtp.gmail.com:465/"; 
});

Accounts.onCreateUser(function (options, user) {
    if (!user.services.facebook) {
        return user;
    }
    user.emails = [{address: user.services.facebook.email}];
    user.profile = {
        userId : incrementCounter('counters', 'studentID'),
        course : 0
    }
    return user;
});