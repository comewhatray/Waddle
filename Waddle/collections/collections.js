import SimpleSchema from 'simpl-schema';
Modules = new Mongo.Collection('modules');
Courses = new Mongo.Collection('courses');
Questions = new Mongo.Collection('questions');

Modules.schema = new SimpleSchema({
  moduleID: {type: Number},
  name: {type: String},
  desc: {type: String}
});

Questions.schema = new SimpleSchema({
  questionID: {type: Number},
  text: {type: String},
  askedBy: {type: Number},
  module: {type: Number},
  answeredBy: {type: Number},
  answerText: {type: String},
  upvotes: {type: Number},
  timestamp: {type: Date}
});
