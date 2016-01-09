Places = new Mongo.Collection("places");

Meteor.methods({
    "insertPlace": function(updateMode, id, doc){
    	if (updateMode){
    		return Places.update({_id:id},doc);
    	}
		else {
			return Places.insert(doc);
		}
	},

    "deletePlace": function(evtId){
		Events.remove(evtId); 
	}
});
