import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.login.onCreated(function loginOnCreated() {
	this.showNewAcc = new ReactiveVar(false);
	this.emailsEqual = new ReactiveVar(false);
	this.passwordsEqual = new ReactiveVar(false);
});

import './login.html';


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
					console.log("Cannot create user");
				}
			})
			Router.go('/');
		}else{
			t.showNewAcc.set(true);
		}
	},
'input #emailConf' : function(e,t)
	{
		if((t.find("#emailConf").value==t.find("#email")) != emailsEqual && t.find("#emailConf").length>0){
			Session.set('emailsEqual', !(Session.get('emailsEqual')));
			$(e.target).toggleClass('valid');
		}
	},

'input #pwdConf' : function(e,t)
	{
		if((e.target.value == $('#pwd')[0].value) != Session.get('passwordsEqual') && e.target.value.length>0){
			Session.set('passwordsEqual', !(Session.get('passwordsEqual')));
			$(e.target).toggleClass('valid');
		}
	}
});
