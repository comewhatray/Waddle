// this is where you put things to access from the server and in the collections folder and collections further

Meteor.publish('modules', function(){
	return Modules.find();
});

Meteor.publish('courses', function(){
	return Courses.find();
});

Meteor.publish('questions', function(mod){
	return Questions.find({module:mod});
});

Meteor.publish('courses', function(){
	return Courses.find();
});