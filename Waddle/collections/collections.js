import SimpleSchema from 'simpl-schema';
Modules = new Mongo.Collection('modules');
Questions = new Mongo.Collection('questions');

Modules.schema = new SimpleSchema({
  moduleID: {type: Number},
  name: {type: String},
  desc: {type: String}
});

Questions.schema = new SimpleSchema({
  questionID: {type: Number},
  text: {type: String},
  desc: {type: String},
  askedBY: {type: Number},
  module: {type: Number},
  answeredBy: {type: Number},
  answerText: {type: String},
  upvotes: {type: Number}
});