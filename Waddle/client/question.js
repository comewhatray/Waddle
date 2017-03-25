import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './question.html';

	Meteor.subscribe('lecturerNames', {onReady: function(){
	}}
	);

Template.question.onCreated(function questionOnCreated() {

});


Template.question.helpers({
  isAnswered(ansBy) {
    return ansBy != 0;
  },
});

Template.answer.helpers({
  getName(id) {
	flname = Meteor.users.findOne({"profile.userId":id}).profile.name[0];
	return (flname.first + " " + flname.last);
  }
});

Template.questionBox.events({
  'click #axe'(event, instance) {
    event.preventDefault();
    Meteor.call('submitPost', instance.find('#postField').value, Session.get('currModule'));
  },
});