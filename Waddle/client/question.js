import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var prevVote = null;

import './question.html';

	Meteor.subscribe('lecturerNames', {onReady: function(){
	}}
	);

Template.question.onCreated(function () {

});


Template.question.helpers({
  isAnswered(ansBy) {
    return ansBy != 0;
  },
  isStudent() {
	return Session.get('isStudent');
  }
});

Template.answer.helpers({
  getName(id) {
	flname = Meteor.users.findOne({"profile.userId":id}).profile.name[0];
	return (flname.first + " " + flname.last);
  },
});

Template.questionBox.events({
  'click #axe'(event, instance) {
    event.preventDefault();
    Meteor.call('submitPost', instance.find('#postField').value, Session.get('currModule'));
  },
});

Template.question.events({
  'click .votePlus'(e,t) {
    if(!!prevVote) prevVote.style="";
    e.target.style="color: #aaf";
    prevVote = e.target;
    Meteor.call('upvote', parseInt(prevVote.parentNode.getAttribute('qid')), true);
  },
  'click .voteMinus'(e,t) {
    if(!!prevVote) prevVote.style="";
    e.target.style="color: #fca";
    prevVote = e.target;
    Meteor.call('upvote', parseInt(prevVote.parentNode.getAttribute('qid')), false);
  },
});