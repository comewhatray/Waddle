Meteor.publish('modules', function(){
	return Modules.find();
});

Meteor.publish('questions', function(){
	return Questions.find();
});

console.log("module count: "+Modules.find().count());