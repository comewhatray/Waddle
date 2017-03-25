import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function () {
	Session.set('currModule', 0);
	Session.set('currQuestion', 0);
	Session.set('SentAnother', false);
});

Template.navbar.onCreated(function navbarOnCreated() {
  
});

Template.navbar.helpers({
	loggedIn() {
		return !!Meteor.user();
	},
	unverified() {
		return !!Meteor.user() && !Meteor.user().emails[0].verified && !Session.get('SentAnother');
	}
});

Template.navbar.events({
  'click .logout'(event, instance) {
    Meteor.logout();
  },
});

Template.unverifiedBar.events({
	'click #verify'(event, instance) {
		Session.set('SentAnother', true);
		Meteor.call( 'sendVerificationLink');
	}
});
