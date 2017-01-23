import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.navbar.onCreated(function navbarOnCreated() {
  this.userType = new ReactiveVar("navAnon");
});

Template.navbar.helpers({
  nav: function() {
    return Template.instance().userType.get();
  },
});

Template.navbar.events({
  'click .studentTest'(event, instance) {
    instance.userType.set("navStudent");
  },
  'click .lecturerTest'(event, instance) {
    instance.userType.set("navLecturer");
  },
  'click .anonTest'(event, instance) {
    instance.userType.set("navAnon");
  },
});
