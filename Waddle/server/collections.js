// this is where you put things to access from the server and in the collections folder and collections further

Meteor.publish('modules', function(){
	return Modules.find({$query:{}, $orderby:{ name : 1 }} );
});

Meteor.publish('courses', function(){
	return Courses.find({$query:{}, $orderby:{ name : 1 }});
});

Meteor.publish('questions', function(mod){	//module, or unanswered if mod = 0
	if(mod!=0)return Questions.find({module:mod});
	return Questions.find({answeredBy:0});
});

Meteor.publish('lecturerNames', function(){
	return Meteor.users.find({ "profile.userId":{$lt:0}}, {profile : 1, _id : 0});
});

Meteor.users.deny({
  insert: function () {return true;},
  update: function () {return true;},
  remove: function () {return true;}
});