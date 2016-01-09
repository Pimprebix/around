if (Meteor.isClient) {
  Meteor.startup(function () {
 	console.log("Meteor startup - client side");

    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
	//maps init
	Session.setDefault("defaultPosition", [43.5816,7.12511]);//43.5816, 7.12511
	Session.setDefault("defaultZoom", 16);
	
 	// try to acquire real position
   	if (navigator.geolocation) {
      	navigator.geolocation.getCurrentPosition(
      	function(p){	Session.set("defaultPosition", [p.coords.latitude, p.coords.longitude]); }
      	);
  	}



  });
}


Template.tpMenu.events({
	"click #filterToggle": function(e){
		console.log('yay!');
		var prevValue = Session.get("displayFilters");
		Session.set("displayFilters", !prevValue);
	}
});
Template.tpMenu.helpers({
	displayFilters: function(){ 
		return Session.get("displayFilters");
	},
});