Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/', function () {
  user = Meteor.user();
  if(!user) Session.set('currCourse', 0);
  Session.set('password', '');
  if(!user || user.profile.userId>0){
    this.render('search');
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