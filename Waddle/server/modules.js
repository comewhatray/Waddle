Meteor.publish('modules', function(){
	return Modules.find();
});

console.log("module count: "+Modules.find().count());