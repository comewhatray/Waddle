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
		test();
		let userId = Meteor.userId();
		if ( !!userId ) {
			return Accounts.sendVerificationEmail( userId );
		}
	},
	submitPost(tbody, mID) {
		if (isStudent(Meteor.user()) && mID != 0){
			var qID = incrementCounter('counters', 'postID');
			console.log(qID);
			newPost = {
				questionID : qID,
				text : tbody,
				askedBy : userId,
				module : mID,
				answeredBy : 0,
				answerText : "",
				upvotes : 0,
				timestamp : new Date()
			}

			Questions.insert(newPost);
		}
	},
	submitResponse(tbody, qID) {
		if (isLecturer(Meteor.user()) && tbody.length >= 10){
			Questions.update(
			{ questionID : qID },
			{ $set:{
				answeredBy:lectID,
				answerText:tbody,
			}}
			)
			
		}
	},
});