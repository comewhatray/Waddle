import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './lecturerCarousel.html';

Template.lecturerCarousel.onCreated(function lecturerCarouselOnCreated() {

});

Meteor.subscribe('questions', {onReady: function(){
}});

Template.lecturerCarousel.helpers({
  questions() {
    return Questions.find();
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