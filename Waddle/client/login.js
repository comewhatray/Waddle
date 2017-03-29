//
import { Template } from 'meteor/templating';

//gives javascript variable things -- 
import { ReactiveVar } from 'meteor/reactive-var';

var courseChoice;

// sets up variables for when needed
<<<<<<< HEAD
Template.login.onCreated(
	function loginOnCreated() {
	//this.logInScreen = new ReactiveVar(true);

	Session.set('logInScreen', true);
	Session.set('email1', "");
	Session.set('emailConfimation', "");
	Session.set('password', "");
	Session.set('passwordConfirmation' , "");
	Session.set('passwordsEqual', false);
	Session.set('emailsEqual', false);
	Session.set('emailValid', false);
	Session.set('isLect', true);
});

Template.login.helpers({
	logInScreen(){
		return Session.get('logInScreen');
	}
})

Template.newAcc.helpers({
	courses() {
		return Courses.find();
	}, 

	isLect(){
		return Session.get('isLect');
	}
=======
Template.login.onCreated(function loginOnCreated() {
	this.showNewAcc = new ReactiveVar(false);
	this.emailsEqual = new ReactiveVar(false);
	this.passwordsEqual = new ReactiveVar(false);
	courseChoice = 0;
>>>>>>> master
});

//links to html page
import './login.html';

Meteor.subscribe('courses', {onReady: function(){

}});

Template.oldAcc.events({

	'click #goCreateAcc' : function(e,t){
		e.preventDefault();
		Session.set('logInScreen', false);
	},

	'click .signInButton' : function (e,t)
	{
		e.preventDefault();
		
		Meteor.loginWithPassword(Session.get('email1'), Session.get('password'));
		Router.go('/');	
	},

})

Template.newAcc.events({
//e = event, t = instance
	'click #returnToLogin' : function(e,t){
		e.preventDefault();
		Session.set('logInScreen', true);
	},

	'click #lectSelect': function(e,t){
		console.log(t.find('#lectSelect').value);
	},

	'click #createAccount':function(e,t){

		e.preventDefault();
		console.log(Session.get('passwordsEqual'));
		console.log(Session.get('emailsEqual'));
		console.log(Session.get('emailValid'));

  		if( ( Session.get('passwordsEqual') && Session.get('emailsEqual') )){ //&& Session.get('emailValid')
  			//password  = t.find('#pwd').value;
  			console.log('hello');
			Accounts.createUser({
				email:    Session.get('email1'),
				password: Session.get('password'),
				profile: {
				// put things here

				cID: Session.get('courseChoice'),
				registration: false
				}
			})

			console.log('plz');
			Router.go('/');
		} 
		else{
			console.log('you done goofed');
		}  		
	},

	'input #emailConf': function(e,t){
		Session.set('emailConfimation', t.find('#emailConf').value);

		if((Session.get('emailConfimation') == Session.get('email1')) && Session.get('email1') != "")
		{
			$(e.target).toggleClass('valid');
			Session.set('emailsEqual', true);
		}else if(Session.get('emailsEqual')){
			$(e.target).toggleClass('valid');
			Session.set('emailsEqual', false);
		}

		Session.set('emailValid', /(.+)@(.+){2,}\.(.+){2,}/.test(Session.get('emailConf')));
		console.log(Session.get('emailValid'));
	},

	'input #pwdConf': function(e,t){
		Session.set('passwordConfirmation', t.find('#pwdConf').value);
		if((Session.get('passwordConfirmation') == Session.get('password')) && Session.get('password') != "")
		{
			$(e.target).toggleClass('valid');
			Session.set('passwordsEqual', true);

		}else if(Session.get('passwordsEqual')){
			$(e.target).toggleClass('valid');
			Session.set('passwordsEqual', false);
		}
		
	},

	'click .courseCode' : function (e,t)
	{
		Session.set('courseChoice', e.target.cID);
	},

	'click #isStudent': function(e,t){
		e.preventDefault();
		Session.set('isLect', true);
		console.log('blargh');
	},

	'click #isLect': function(e,t){
		e.preventDefault();
		Session.set('isLect', false);
		console.log('blargh elle');

	},

	
})

Template.details.events({

	'input #email' : function(e,t)
	{
		Session.set('email1', t.find('#email').value);
	},

	'input #pwd' : function(e,t)
	{
		Session.set('password', t.find('#pwd').value);
	},

})






/*


//this togles login vs register
Template.login.helpers({
	showNewAcc() {
		if(Template.instance().showNewAcc.get()){
			return true;
		}
	return false;
	}
});

// does things related to courses and stuff... magic
Template.newAcc.helpers({
	courses() {
		return Courses.find();
	}
});

Template.login.events({
	'click #submit' : function clickedSubmit(e,t)
	{
		e.preventDefault();
		if(t.showNewAcc.get()){
			t.showNewAcc.set(false);	
		}else{
			var userEmail = t.find('#email').value,
			password  = t.find('#pwd').value;
			Meteor.loginWithPassword(userEmail, password);
			//call backthing
			Session.set('currModule', 0);
			Router.go('/');
		}
	},
	'click .courseCode' : function (e,t)
	{
		courseChoice = e.target.cID;
	},


	'click #create' : function clickedCreate(e,t)
	{
<<<<<<< HEAD
		var isEmailValid = function(address) {
  			//return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(address);

  			return true;
		};

		if(isEmailValid(t.find('#email').value)){

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
						cID: courseChoice,
						registration: false,
					}
				}, function (error) {
					if (error) {
						console.log("Cannot create user");
					}
				});
				Router.go('/');
			}else{
				t.showNewAcc.set(true);
			}
=======
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
					cID: courseChoice,
				}
			}, function (error) {
				if (error) {
					alert("Cannot create user: "+ error.reason);
				}else{
					Router.go('/');
					Meteor.call( 'sendVerificationLink');
				}
			});
		}else{
			t.emailsEqual.set(false);
			t.passwordsEqual.set(false);
			t.showNewAcc.set(true);
>>>>>>> master
		}
		else{
		}

	},
	'input #emailConf' : function(e,t)
	{
		if((t.find("#emailConf").value == t.find("#email").value) != Session.get('emailsEqual') && t.find("#emailConf").length>0){
			Session.set('emailsEqual', !(Session.get('emailsEqual')));
			$(t.target).toggleClass('valid');
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
*/












