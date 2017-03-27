import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function () {
	Session.set('currModule', 0);
	Session.set('currQuestion', 0);
	Session.set('SentAnother', false);
	Session.set('currCourse', 0);
});

Tracker.autorun(function(){
	Session.set('isStudent', !!Meteor.user() && Meteor.user().profile.userId>0);
});

Tracker.autorun(function(){
	Session.set('currCourse', !!Meteor.user()?Meteor.user().profile.course:0);
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
    Session.set('isStudent', false);
  },
});

Template.unverifiedBar.events({
	'click #verify'(event, instance) {
		Session.set('SentAnother', true);
		Meteor.call( 'sendVerificationLink');
	},
	'click #dismiss'(event, instance) {
		Session.set('SentAnother', true);
	}
});
