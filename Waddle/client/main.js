import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function () {
	Session.set('currModule', 0);
	Session.set('currQuestion', 0);
	Session.set('isLecturer', false);
});

Template.navbar.onCreated(function navbarOnCreated() {
  
});

Template.navbar.helpers({
	loggedIn() {
		return !!Meteor.user();
	},
	isLecturer() {
		return Session.get('isLecturer');
	},
	unverified() {
		return !!Meteor.user() && !Meteor.user().emails[0].verified;
	}
});

Template.navbar.events({
  'click .studentTest'(event, instance) {
    Session.set('isLecturer', false);
  },
  'click .lecturerTest'(event, instance) {
    Session.set('isLecturer', true);
  },
  'click .logout'(event, instance) {
    Meteor.logout();
  },

});

Template.unverifiedBar.events({
	'click #verify'(event, instance) {
		Meteor.call( 'sendVerificationLink');
	}
});
