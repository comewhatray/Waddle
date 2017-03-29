import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './questionBoard.html';
var sesh, sub;

Meteor.subscribe('modules', {onReady: function(){
  }}
);

Tracker.autorun(function(){
	var sesh = Session.get('currModule');
  console.log(sesh);
	if(sub) sub.stop();
	sub = Meteor.subscribe('questions', sesh, {onReady: function(){
		console.log("q count: "+ Questions.find().count());
	}}
	);
});

Template.questionBoard.helpers({
  questions() {
    return Questions.find();
  },
  isAnswered(ansBy) {
    return ansBy != 0;
  },
  loggedIn() {
    return !!Meteor.user();
  },

  modName(){
    return Modules.find({moduleID: Session.get('currModule')}).fetch();
  }

});

Template.questionBoard.events({

});