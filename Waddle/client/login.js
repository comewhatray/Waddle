import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.login.onCreated(function loginOnCreated() {
	this.showNewAcc = new ReactiveVar(false);
	this.emailsEqual = new ReactiveVar(false);
	this.passwordsEqual = new ReactiveVar(false);
});

import './login.html';

Meteor.subscribe('courses', {onReady: function(){
	}}
);


Template.login.helpers({
	showNewAcc() {
		if(Template.instance().showNewAcc.get()){
			return true;
		}
	return false;
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
			Router.go('/');
		}
	},
'click #create' : function (e,t)
	{
		e.preventDefault();
		if(t.showNewAcc.get()){
			var userEmail = t.find('#email').value,
			password  = t.find('#pwd').value;
			Accounts.createUser({
				email:    userEmail,
				password: password,
				profile: {
				}
			}, function (error) {
				if (error) {
					console.log("Cannot create user: "+ error.reason);
				}else{
					Router.go('/');
					Meteor.call( 'sendVerificationLink');
				}
			})
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
