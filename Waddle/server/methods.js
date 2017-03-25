function isLecturer(user){
	if(!user) return false;
	realUser = Meteor.users.findOne({_id: user._id});
	return(!!realUser && realUser.profile.userId < 0);
}

function isStudent(user){
	if(!user) return false;
	realUser = Meteor.users.findOne({_id: user._id});
	return(!!realUser && realUser.profile.userId > 0);
}

//&& Meteor.user().emails[0].verified 

Meteor.methods({
	sendVerificationLink() {
		let userId = Meteor.userId();
		if ( !!userId ) {
			return Accounts.sendVerificationEmail( userId );
		}
	},
	submitPost(tbody, mID) {
		poster = Meteor.user()
		if (isStudent(poster) && mID != 0){
			var qID = incrementCounter('counters', 'postID');
			console.log(qID);
			newPost = {
				questionID : qID,
				text : tbody,
				askedBy : poster.profile.userId,
				module : mID,
				answeredBy : 0,
				answerText : "",
				upvotes : 0,
				timestamp : new Date()
			}
			if(!Questions.schema.newContext().validate(newPost)) {console.log("Invalid post"); return;} //validate

			Questions.insert(newPost);
		}
	},
	submitResponse(tbody, qID) {
		responder = Meteor.user()
		if (isLecturer(responder) && tbody.length >= 10){
			Questions.update(
			{ questionID : qID },
			{ $set:{
				answeredBy:responder.profile.userId,
				answerText:tbody,
			}}
			)
			
		}
	},
	updateCourse(cID) {
		usr = Meteor.user();
		if (!!usr){
			Meteor.users.update(
			{ _id : usr._id },
			{ $set:{
				"profile.course":parseInt(cID),
			}}
			)
			
		}
	},
});