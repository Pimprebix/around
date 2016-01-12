var map = null;
var markerList =[];

Template.tpList.events({

    "click .deleteEvent": function (){
      	Meteor.call("deleteItem", this._id);
    },

    "click .modifyEvent": function (){
        Session.set("modifiedItem", this);
    	Router.go("modify", {id : this._id}); //avoid to make it clear?
    },

    "click .filterForm img": function () {
    	var tags =[];
		$(".itemCategory[checked=checked]").each(function(){
		  tags.push($(this).attr('id'));
		  // console.log("adding "+$(this).attr('id'));
		});
		Session.set("tagFilter", tags);
		// console.log(tags);
    },

    "change .filterForm input": function () {
		Session.set("startDateFilter", $('#tpFilter_startDate').val());
		Session.set("endDateFilter", 	 $('#tpFilter_endDate'	).val());
    }
});


Template.tpList.helpers({
	item: function(){ 

		// retrieve stored data for filters
      	var tags = Session.get("tagFilter");
      	var startDate = new Date(Session.get("startDateFilter"));
      	var endDate   = new Date(Session.get("endDateFilter"));

      	// build query
		var criterias = [];
      	if (tags != undefined){// only if tag filtering has been applied
      		criterias.push({"tags": { $in: tags }});
      	}
      	criterias.push({"startDate": {$gte: startDate, $lte: endDate}});

      	// Get query results
		var results = Events.find({ $and:criterias}); 

		//uggly
		results.forEach(function(i){
			markerList.push(i.address.position);
			console.log("adding "+i.address.position);
		});

		// render template map
		return results;
	},

	displayFilters: function(){ 
		return Session.get("displayFilters");
	}

});

function updateMap(markers){
	console.log("updating map...");
	for (var m in markers){
		console.log(markers[m]);
		L.marker(markers[m]).addTo(map);
	}
}

Template.tpList.onRendered(function(){

		console.log('\nTemplate.tpList.onRendered');

		var pos = Session.get("defaultPosition");
		var zoom = Session.get("defaultZoom");
		map = L.map('map', 	{doubleClickZoom: false	});
  		L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

		map.setView(pos, zoom);
		
		// updateMap(markerList);		
});

