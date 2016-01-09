Router.configure({
    layoutTemplate: 'tpMenu'
});


Router.route('/', {
    name: "main",
    template: "tpList",
    onBeforeAction: function () {
      Session.set("displayFilters", false); 
      this.next();
    }
});


Router.route('/login', {
    name: "login",
    template: "tpLogin",
    onBeforeAction: function () {
      Session.set("displayFilters", false); 
      this.next();
    }
});


// Router.route('/map', {
//     name: "addLocation",
//     template: "tpAddLocation",
//     onBeforeAction: function () {
//       Session.set("displayFilters", false); 
//       this.next();
//     }
// });

Router.route('/profile', {
    name: "profile",
    template: "tpProfile",
    onBeforeAction: function () {
      Session.set("displayFilters", false); 
      this.next();
    }
});


Router.route('/create', {
    name: "create",
    template: "tpEditItem",
    onBeforeAction: function () {
      Session.set("updateMode", false); 
      Session.set("displayFilters", false); 
      Session.set("displayAddLocation", false);
      this.next();
      // if (Meteor.userId()) {
      //   this.next();
      // }
      // else{
      //   Router.go("login");
      // }
    }
});


//retrieve all data at this time
Router.route('/modify/:id', {
    name: "modify",
    template: "tpEditItem",
    onBeforeAction: function () {
      Session.set("updateMode", true); 
      Session.set("displayFilters", false); 

      this.next();

      // if (Meteor.userId()) {
      //   this.next();
      // }
      // else{
      //   Router.go("login");
      // }
    }
});

