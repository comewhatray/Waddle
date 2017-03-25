import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './questionBoard.html';
var sesh;

Tracker.autorun(function(){
	var sesh = Session.get('currModule');
	if(sesh==0) return;
	if(qSub) qSub.stop();
	qSub = Meteor.subscribe('questions', sesh, {onReady: function(){}});
});

Template.questionBoard.helpers({
  questions() {
    return Questions.find();
  },
  isAnswered(ansBy) {
    return ansBy != 0;
  },
  loggedInStudent() {
    return !!Meteor.userId() && Meteor.user().profile.userId>0;
  },
});