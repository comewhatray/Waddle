import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './lecturerCarousel.html';

var currQ, ansButton, ansText;
var enabled = new ReactiveVar(false);;

Template.lecturerCarousel.onRendered(function() {
	if(qSub) qSub.stop();
	qSub = Meteor.subscribe('questions', 0, {onReady: function(){}});
	currQ = null; enabled.set(false);
	ansButton = this.find('#ans'); ansText = this.find('#ansField');
});

Template.lecturerCarousel.helpers({
  questions(modID) {
    return Questions.find({module:modID});
  },
  needsAnswering(ansBy) {
    return ansBy == 0;
  },
  modules() {
    return Modules.find();
  },
  first(index) {
    return index==0;
  },
});

Template.answerBox.helpers({
  enabled() {
    return enabled.get()?"":"disabled";
  },
});

Template.lecturerCarousel.events({
	'click .panel'(event, instance) {
		if(currQ!=undefined){
			currQ.style=""; 
			if(currQ === event.target){
				currQ = null;
				ansButton.innerHTML = "Please select a question.";
				enabled.set(false);
				return;
			}
		}
		else{ 
			ansButton.innerHTML = "Submit Answer (10 character minimum)"; 
			enabled.set(ansText.value.length >= 10);
		}
		currQ = event.target;
		currQ.style="background-color:#afa";
	},
	'input #ansField'(event, instance) {
		enabled.set(!!currQ && ansText.value.length >= 10);
	},
	'click #ans'(event, instance) {
		lID = Meteor.user().profile.userId;
		if(lID && lID < 0) Meteor.call('submitResponse', ansText.value, parseInt(currQ.getAttribute("qid")), lID);
		currQ = null; enabled.set(false); ansText.value = "";
	}
});

