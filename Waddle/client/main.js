import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.navbar.onCreated(function navbarOnCreated() {
  Session.set('isLecturer', false);
});

Template.navbar.helpers({
	loggedIn() {
		return !!Meteor.user();
	},
	isLecturer() {
		return Session.get('isLecturer');
	},
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


