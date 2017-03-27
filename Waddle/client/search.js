import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './search.html';

Template.searchResults.onCreated(function(){
});

Meteor.subscribe('modules', {onReady: function(){
	}}
);

Template.search.helpers({
  choice() {
	return Session.get('currCourse')!=0?'module.':'course.';
  },
  hasCourse() {
    return true;
  }
});

Template.searchResults.helpers({
  modules() {
    return Modules.find({courses:Session.get('currCourse')});
  },
  courses() {
    return Courses.find();
  },
  hasCourse() {
    return Session.get('currCourse') != 0;
  }
});

Template.search.events({
	'input #lectureSearch'(event, instance) {
		query = instance.find("#lectureSearch").value.toUpperCase();
		list = instance.find(".search-results");
		classes = list.getElementsByTagName("li");
		for(i=0; i<classes.length; i++){
			classes[i].style.display = (classes[i].firstChild.innerHTML.toUpperCase().includes(query))?"block":"none";
		}
	},
});

Template.searchResults.events({
	'click .module-link'(event, instance) {
		Session.set('currModule', (parseInt(event.target.getAttribute('mID'))));
	},
	'click .course-link'(event, instance) {
		Session.set('currCourse', (parseInt(event.target.getAttribute('cID'))));
	}
});