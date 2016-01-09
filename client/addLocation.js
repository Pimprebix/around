var map;
var marker = null;
var markerLocation = null;

function registerPlace(){
	var pName = $("#placeName").val();
	var pAddress = $("#placeAddress").val();
	var pCity = $("#placeCity").val();
	
	Session.set("address", {
		name: pName,
		street: pAddress,
		city: pCity,
		position: markerLocation	
		});
}

Template.tpAddLocation.onRendered(function(){

		console.log('\nTemplate.tpList.onRendered');
		/*******************
		Enhance HTML content
		********************/
		//set map search
		map = L.map('map', 	{doubleClickZoom: false	});
  		L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

		/*******************
		Retrieve previous values
		********************/
		var zoom = 16;
		if (Session.get("updateMode")){

			var modifiedItem = Session.get("modifiedItem");

			$("#placeAddress").val(modifiedItem.address.street);
			$("#placeCity").val(modifiedItem.address.city);
			$("#placeName").val(modifiedItem.address.name);

			if (marker!=null){ map.removeLayer(marker);}//remove marker if it exists
			marker = L.marker(modifiedItem.address.position).addTo(map);//add new marker

			map.setView(modifiedItem.address.position, zoom);
		}
		else{
			map.setView(Session.get("defaultPosition"), zoom);
		}

		map.on('click', function(event) {
			if (marker!=null){ map.removeLayer(marker);}
			markerLocation = event.latlng;
			marker = L.marker(event.latlng).addTo(map);
			registerPlace()
		  	});
});



Template.tpAddLocation.events({
	'click button[id=addLocation]': function(e){
		e.preventDefault();
		registerPlace();
	},
	'click button[id=viewOnMap]': function(e){
		e.preventDefault();
		var pAddress = $("#placeAddress").val();
		var pCity = $("#placeCity").val();

//  Open Cage Datat : imprecise? at least do not autocorrect
		// var myKey = "f5bbdff10213bffc777aebe8b483a4bb";
		// var myPlace = encodeURIComponent((pAddress+" ,"+pCity).trim());
		// var url = 'http://api.opencagedata.com/geocode/v1/json?q='+myPlace+'&countrycode=fr'+'&key='+myKey;
		
// ggle geocoding:
		var myKey = "AIzaSyAacOiUbepBoLrGFmHXLgT3WiK1o8hf-D4";
		var myPlace = encodeURIComponent((pAddress.replace(" ","+")+",+"+pCity).trim());
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+myPlace+'&key='+myKey;
		
		console.log(url);
		jQuery.getJSON(url, 
			function(data) {
		    	if (data.results.length>0) 
		    	{
					var location = data.results[0].geometry.location;
					if (marker!=null){ map.removeLayer(marker);}//remove marker if it exists
					marker = L.marker(location).addTo(map);//add new marker
					map.setView(location, 16); // set view
					markerLocation = location;
					registerPlace()
		    	} else {
			    	console.log("Geocoding request failed.");
		    	}
		});
	}
});