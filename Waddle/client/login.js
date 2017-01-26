import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './login.html';

Template.login.onCreated(function loginOnCreated() {
});

Template.login.helpers({
});

Template.login.events({
'click #submit' : function (e,t)
	{
		e.preventDefault();
		Router.go('/');
	}
});
