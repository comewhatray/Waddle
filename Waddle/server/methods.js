Meteor.methods({
	sendVerificationLink() {
		let userId = Meteor.userId();
		if ( !!userId ) {
			return Accounts.sendVerificationEmail( userId );
		}
	},
	//&& Meteor.user().emails[0].verified 
	submitPost(tbody, mID, userId) {
		if (!!userId && mID != 0){
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
			}

			Questions.insert(newPost);
		}
	},

});