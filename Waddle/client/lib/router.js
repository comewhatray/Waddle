Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/', function () {
  user = Meteor.user();
  if(!user){
    this.render('searchModules');	//this will need to be updated
  }else if(user.profile.userId>0){
    this.render('searchModules');
  }else{
    this.render('lecturerCarousel');
  }
}, {
  name: 'root'
});

Router.route('/login', function () {
  this.render('login');
}, {
  name: 'login'
});

Router.route('/questionBoard', function () {
  this.render('questionBoard');
}, {
  name: 'questionBoard'
});

Router.route('/settings', function () {
  this.render('settings');
}, {
	name: 'settings'
});