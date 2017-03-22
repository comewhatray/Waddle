import SimpleSchema from 'simpl-schema';
Modules = new Mongo.Collection('modules');

Modules.schema = new SimpleSchema({
  moduleID: {type: Number},
  name: {type: String},
  desc: {type: String}
});