import { Template } from 'meteor/templating';

Template.navLoggedIn.helpers({
	getEmail(){
		if(!!Meteor.user){
			return Meteor.user().emails[0].address;
		}else{
			return "";
		}
	}
});