import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './questionBoard.html';
var sesh, sub;

Tracker.autorun(function(){
	var sesh = Session.get('currModule');
	if(sub) sub.stop();
	sub = Meteor.subscribe('questions', sesh, {onReady: function(){
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
});