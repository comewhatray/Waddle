import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './searchModules.html';

Template.searchResults.onCreated(function searchResultsOnCreated() {
});

Meteor.subscribe('modules', {onReady: function(){
	}}
);

Template.searchResults.helpers({
  modules() {
    return Modules.find({courses:Session.get('currCourse')});
  },
});

Template.searchModules.events({
	'input #lectureSearch'(event, instance) {
		query = instance.find("#lectureSearch").value;
		list = instance.find(".search-results");
		classes = list.getElementsByTagName("li");
		for(i=0; i<classes.length; i++){
			classes[i].style.display = (classes[i].firstChild.innerHTML.includes(query))?"block":"none";
		}
	},
});

Template.searchResults.events({
	'click .course-link'(event, instance) {
		Session.set('currModule', (parseInt(event.target.getAttribute('mID'))));
	}
});