Meteor.publish('modules', function(){
	return Modules.find();
});

Meteor.publish('courses', function(){
	return Courses.find();
});

Meteor.publish('questions', function(mod){
	return Questions.find({module:mod});
});