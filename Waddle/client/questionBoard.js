import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './questionBoard.html';

Template.questionBoard.onCreated(function questionBoardOnCreated() {

});

Meteor.subscribe('questions', {onReady: function(){
	console.log("q count: "+ Questions.find().count());
	}}
);

Template.questionBoard.helpers({
  questions() {
    return Questions.find();
  },
  isAnswered(ansBy) {
    return ansBy != 0;
  },
});

Template.questionBoard.events({

});