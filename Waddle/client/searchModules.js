import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './searchModules.html';

Template.searchModules.onCreated(function searchModulesOnCreated() {

});

Meteor.subscribe('modules', {onReady: function(){
	console.log("module count: "+ Modules.find().count());
	}}
);

Template.searchResults.onCreated(function searchResultsOnCreated() {
});


Template.searchResults.helpers({
  modules() {
    return Modules.find();
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