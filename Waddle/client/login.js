//
import { Template } from 'meteor/templating';

//gives javascript variable things -- 
import { ReactiveVar } from 'meteor/reactive-var';

// sets up variables for when needed
Template.login.onCreated(function loginOnCreated() {
	this.showNewAcc = new ReactiveVar(false);
	this.emailsEqual = new ReactiveVar(false);
	this.passwordsEqual = new ReactiveVar(false);
	var courseChoice = 0;
});

//links to html page
import './login.html';

Meteor.subscribe('courses', {onReady: function(){

}});

Template.login.helpers({
	showNewAcc() {
		if(Template.instance().showNewAcc.get()){
			return true;
		}
	return false;
	}
});

Template.newAcc.helpers({
	courses() {
		return Courses.find();
	}
});

Template.login.events({
'click #submit' : function (e,t)
	{
		e.preventDefault();
		if(t.showNewAcc.get()){
			t.showNewAcc.set(false);	
		}else{
			var userEmail = t.find('#email').value,
			password  = t.find('#pwd').value;
			Meteor.loginWithPassword(userEmail, password);
			//call backthing
			Router.go('/');
		}
	},
'click .courseCode' : function (e,t)
	{
		courseChoice = e.target.cID;
	},


'click #create' : function (e,t)
	{
		//prevent default -- e has its own code it will execute by default which we want to stop
		e.preventDefault();
		if(t.showNewAcc.get()){
			var userEmail = t.find('#email').value,
			password  = t.find('#pwd').value;
			Accounts.createUser({
				email:    userEmail,
				password: password,
				profile: {
					// put things here
					//cID: courseChoice,
				}
			}, function (error) {
				if (error) {
					console.log("Cannot create user: "+ error.reason);
				}else{
					//Router.go('/');
					Meteor.call( 'sendVerificationLink');
				}
			});
		}else{
			t.showNewAcc.set(true);
		}
	},
'input #emailConf' : function(e,t)
	{
		if(((e.target.value == t.find("#email").value) != t.emailsEqual.curValue) && e.target.value.length>0){
			t.emailsEqual.curValue = !t.emailsEqual.curValue;
			$(e.target).toggleClass('valid');
		}
	},

'input #pwdConf' : function(e,t)
	{
		if(((e.target.value == t.find("#pwd").value) != t.passwordsEqual.curValue) && e.target.value.length>0){
			t.passwordsEqual.curValue = !t.passwordsEqual.curValue;
			$(e.target).toggleClass('valid');
		}
	}
});
