import { Template } from 'meteor/templating';

var newCourse, selC;

Template.settings.onRendered (function () {
	newCourse = Session.get('currCourse');
	selC = this.find("#selC");
});

Template.settings.helpers({
	currCourseName() {
		userCourse = Courses.findOne({courseID:Session.get('currCourse')})
		return !!userCourse?userCourse.name:"";
	},
	ccID() {
		return Session.get('currCourse');
	},
	otherCourses() {
		cc = Session.get('currCourse');
		return Courses.find({courseID:{$ne:cc}});
	}
});


Template.settings.events({
	'click #selC' : function (e,t){
		newCourse = selC[selC.selectedIndex].getAttribute("cid");
	},
	'click #cancel' : function(e,t){
		Router.go('/');
	},
	'click #save' : function(e,t){
		oldpwd = t.find('#old-password-input').value;
		newpwd = t.find('#new-password-input').value;
		if(oldpwd.length>0 && newpwd.length>0){
			Accounts.changePassword(oldpwd, newpwd, function(error){
				if(error){
					alert("Password change failed due to: "+error.reason);
					return;
				}
			});
		}
		if(newCourse != Session.get('currCourse'))Meteor.call('updateCourse',newCourse);
		Router.go('/');
	}
});