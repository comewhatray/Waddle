import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './search.html';

var userProfile = null;

Template.selector.onCreated(function(){
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

Template.selector.helpers({
	modules() {
		return Modules.find({}, {desc:-1});
	},
	isChosen(mID){
		if(!Meteor.user()) return;
		if(userProfile === null) userProfile = Meteor.user().profile.modules;
	
		if(!userProfile || !userProfile.includes(mID)){
			return "";
		}else{
			return "chosen";
		}
	}
});

Template.moduleEditor.helpers({
	courses() {
		return Courses.find({}, {name:1});
	},
});



Template.selector.events({
	'click .module-selector'(e,t) {
		$(e.target).toggleClass('chosen');
	},
	'click #setModules'(e,t) {
		var newJ = [];
		list = t.find("#moduleList");
		classes = list.getElementsByTagName("li");
		for(i=0; i<classes.length; i++){
			if(classes[i].classList.contains("chosen")) newJ.push(parseInt(classes[i].getAttribute("mID")));
		}
		Meteor.call('updateJurisdiction', newJ);
	},
});

Template.moduleEditor.events({
	'click .course-selector'(e,t) {
		$(e.target).toggleClass('chosen');
	},
	'click #submitModule'(e,t) {
		var modCourses = [];
		list = t.find("#courseList");
		classes = list.getElementsByTagName("li");
		for(i=0; i<classes.length; i++){
			if(classes[i].classList.contains("chosen")) modCourses.push(parseInt(classes[i].getAttribute("cID")));
		}
		console.log(modCourses);
		//Meteor.call('setModule', /*MODULE CODE*/, /*MODULE DESCRIPTION*/, modCourses);
	},
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