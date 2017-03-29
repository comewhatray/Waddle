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
			newPost = {
				questionID : qID,
				text : tbody,
				askedBy : poster.profile.userId,
				module : mID,
				answeredBy : 0,
				answerText : "",
				upvotes : 0,
				timestamp : new Date(),
				expireAt: new Date(Date.now()+604800000),			//default TTL: 604,800,000 ms, or 1 week.
				upvoteList: []
			}
			if(!Questions.schema.newContext().validate(newPost)) {console.log("Invalid post"); return;} //validate

			Questions.insert(newPost);
		}
	},
	submitResponse(tbody, qID) {
		responder = Meteor.user()
		if (isLecturer(responder) && tbody.length >= 10){
			toAnswer = Questions.findOne({questionID : qID});
			if(!!toAnswer && toAnswer.answeredBy == 0){
				newDate = new Date(toAnswer.expireAt.getTime()+259200000);	//A lecturer answer extends TTL by 3 days.
			}else{ return; }
			Questions.update(
			{ questionID : qID },
			{ $set:{
				answeredBy:responder.profile.userId,
				answerText:tbody,
				expireAt:newDate,
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
	upvote(pID, isPositive) {
		post = Questions.findOne({questionID : pID});
		if(!post) return;
		usr = Meteor.user();
		if(!isStudent(usr)) return;				//Only students can vote
		uID = usr.profile.userId;
		if(post.askedBy == uID) return;				//Can't upvote your own post
		upV = post.upvoteList.indexOf(uID) != -1;
		downV = post.upvoteList.indexOf(0-uID) != -1;
		var mult;
		if(isPositive) {
			if(upV) return;
			mult = downV?2:1;
		}else {
			if(downV) return;
			mult = upV?-2:-1;
		}
		dttl = 7200000*mult;
		newTTL = new Date(post.expireAt.getTime()+dttl);
		doot = isPositive?uID:0-uID;
		var newVotes = post.upvotes+mult;
		if((isPositive && downV) || (!isPositive && upV)){	//Changed vote
			Questions.update(
			{questionID:pID,upvoteList:-doot},
			{$set:{
				"upvoteList.$":doot,
				"expireAt":newTTL,
				"upvotes": newVotes,
				}}
			);	
		}else{							//New vote
			Questions.update(
				{questionID:pID},
				{
	                        "$push":{"upvoteList":doot},
				"$set":{
					"expireAt":newTTL,
					"upvotes": newVotes,
				}
			});
		}
		return newVotes;
	},
	addCourse(cName) {
		usr = Meteor.user();
		if (!!usr && usr.profile.userId < 0){
			var cID = incrementCounter('counters', 'courseID');
			newCourse = {
				courseID : cID,
				name: cName
			};
			if(!Courses.schema.newContext().validate(newCourse) || !!Courses.findOne({name: cName})) {console.log("Invalid course"); return;}
			Courses.insert(newCourse);		
		}
	},
	setModule(mName, mDesc, courseList) {
		if(!Array.isArray(courseList)) throw new Meteor.Error("", "Course list must be an array");
		usr = Meteor.user();
		if (!!usr && usr.profile.userId < 0){
			if(!!Modules.findOne({name: mName})){				//Update a module
				Modules.update(
					{name:mName},
					{$set:{
						"desc":mDesc,
						"courseList":courseList
					}}
				);
			}else{								//add new module
				var mID = incrementCounter('counters', 'moduleID');
				newMod = {
					moduleID : mID,
					name: mName,
					desc: mDesc,
					courses: courseList
				};
				if(!Modules.schema.newContext().validate(newMod)) {console.log("Invalid module"); return;}
				Modules.insert(newMod);		
			}
		}
	},
	newStudent(newEmail, pwd, choice) {
		if(!!Meteor.user()) throw new Meteor.Error("", "You are already logged in!");
		if(!Courses.findOne({courseID:choice})) throw new Meteor.Error("", "Course not found in database.");
		newID = incrementCounter('counters', 'studentID');
		newAcc = {
			email: newEmail,
			password: pwd,
			profile:{
				course: choice,
				userId: newID
			}
		}
		return newAcc;
	},
	newLecturer(newEmail, pwd, fName, lName) {
		if(!!Meteor.user()) throw new Meteor.Error("", "You are already logged in!");
		if(!Courses.findOne({courseID:choice})) throw new Meteor.Error("", "Course not found in database.");
		newID = decrementCounter('counters', 'lecturerID');
		newAcc = {
			email: newEmail,
			password: pwd,
			profile:{
				modules: [],
				userId: newID,
				name :
            			{
		                first : fName,
		                last : lName
				},
			}
		}
		return newAcc;
	},
	updateJurisdiction(newList){
		if(!Array.isArray(newList)) throw new Meteor.Error("", "New list must be an array");
		usr = Meteor.user();
		if(!usr || usr.profile.userId >= 0) return;
		Meteor.users.update(
			{ _id : usr._id },
			{ $set:{
				"profile.modules":newList
			}});
		}
});