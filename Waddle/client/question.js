import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './question.html';

Template.question.onCreated(function questionOnCreated() {

});


Template.question.helpers({
  isAnswered(ansBy) {
    return ansBy != 0;
  },
});