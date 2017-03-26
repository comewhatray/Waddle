// this is where you put things to access from the server and in the collections folder and collections further

Meteor.publish('modules', function(){
	return Modules.find({$query:{}, $orderby:{ name : 1 }} );
});

//db.version() is 2.6, so we still use $orderby.

Modules.deny({
  insert: function () {return true;},
  update: function () {return true;},
  remove: function () {return true;}
});

Meteor.publish('courses', function(){
	return Courses.find({$query:{}, $orderby:{ name : 1 }});
});

Courses.deny({
  insert: function () {return true;},
  update: function () {return true;},
  remove: function () {return true;}
});

Meteor.publish('questions', function(mod){	//module, or unanswered if mod = 0
	if(mod!=0)return Questions.find({$query:{module:mod}, $orderby:{ expireAt : -1 }});
	return Questions.find({$query:{answeredBy:0}, $orderby:{ expireAt : -1 }});
});

Questions.deny({
  insert: function () {return true;},
  update: function () {return true;},
  remove: function () {return true;}
});

Meteor.publish('lecturerNames', function(){
	return Meteor.users.find({ "profile.userId":{$lt:0}}, {profile : 1, _id : 0});
});

Meteor.users.deny({
  insert: function () {return true;},
  update: function () {return true;},
  remove: function () {return true;}
});