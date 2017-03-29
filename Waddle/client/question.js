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
  },
  timeSince(stamp) {
	var age = ~~((Date.now() - stamp.getTime())/1000);	//starts as ms
	if(age >= 86400) { return ~~(age/86400) + "d"
	}else if (age >= 3600){ return ~~(age/3600) + "h"
	}else if (age >= 60){ return ~~(age/60) + "m"
	}else{ return age+"s";
	}
  }
});

Template.answer.helpers({
  getName(id) {
	flname = Meteor.users.findOne({"profile.userId":id}).profile.name;
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