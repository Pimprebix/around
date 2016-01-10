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
		});
		Session.set("tagFilter", tags);
    },

    "change .filterForm input": function () {
		Session.set("startDateFilter", $('#tpFilter_startDate').val());
		Session.set("endDateFilter", 	 $('#tpFilter_endDate'	).val());
    }
});


Template.tpList.helpers({
	//filter should be AND or OR ?
	//{$or:[{tags: "drink"}, {tags: "sport"}]} 
	item: function(){ 

		// set default dates if they dont exist
		if (Session.get("startDateFilter")===undefined){
			var	d1 = new Date(); //today
			var d2 = new Date(d1.getTime()+182*24*60*60*1000);	// 6month ahead
			Session.setDefault("startDateFilter", d1);
			Session.setDefault("endDateFilter", d2);
		}

		// retrieve stored data
      	var tags = Session.get("tagFilter");
      	var startDate = new Date(Session.get("startDateFilter"));
      	var endDate   = new Date(Session.get("endDateFilter"));

      	// build query
		var criterias = [];
      	if (tags != undefined){// only if tag filtering has been applied
      		criterias.push({"tags": { $in: tags }});
      	}
      	criterias.push({"startDate": {$gte: startDate, $lte: endDate}});

		var results = Events.find({ $and:criterias}); 
		results.forEach(function(i){
			markerList.push(L.marker(i.address.position));
			//add marker to list
			// markers will be display on map when necessary
			// markers are related on events
			//.addTo(map);
		});

		return results;
	},

	displayFilters: function(){ 
		return Session.get("displayFilters");
	}

});

Template.tpList.onRendered(function(){

		console.log('\nTemplate.tpList.onRendered');
		/*******************
		Enhance HTML content
		********************/
		var pos = Session.get("defaultPosition");
		var zoom = Session.get("defaultZoom");
		map = L.map('map', 	{doubleClickZoom: false	});
  		L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

		map.setView(pos, zoom);

		for (m in markerList){
			markerList[m].addTo(map);
		}
		
		// map.on('click', function(event) {
		//     //Markers.insert({latlng: event.latlng});
		//     console.log("click on map: "+event.latlng);
		//   	});
		
});

