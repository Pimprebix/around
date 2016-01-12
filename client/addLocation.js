var map;
var marker = null;
var markerLocation = null;

function registerPlace(location){
	var pName = $("#placeName").val();
	var pAddress = $("#placeAddress").val();
	var pCity = $("#placeCity").val();
	
	Session.set("address", {
		name: pName,
		street: pAddress,
		city: pCity,
		position: location	
		});
}

/*
Purpuse of this function is to return all icons 
based on their type (it s dictionary)
*/
function getIcon(iconName){
	var greenIcon = {
	    iconUrl: '/mapIcons/leaf-green.png',
	    iconSize:     [38, 95], // size of the icon
	    shadowSize:   [50, 64], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [4, 62],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	};

	return greenIcon;
}

/*
This function adds Icons to the map, 
center the map and apply the zoom
*/
function addIconType(iconType, position, zoom){            
	//remove marker if it exists
    if (marker!=null){ map.removeLayer(marker);}
    // add marker
    marker = L.marker(position, 
    	{icon: L.icon(getIcon(iconType))}).addTo(map);//add new marker
    // set map view on the icon
    map.setView(position, zoom);
}

Template.tpAddLocation.onRendered(function(){

		console.log('\nTemplate.tpList.onRendered');
		//add map
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
			addIconType("green", modifiedItem.address.position, zoom);
		}
		else{
			map.setView(Session.get("defaultPosition"), zoom);
   		}

		map.on('click', function(event) {
			addIconType("green", event.latlng, zoom);
			registerPlace(event.latlng);
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
					addIconType("green", location, 17);
					registerPlace(location);
		    	} else {
			    	console.log("Geocoding request failed.");
		    	}
		});
	}
});