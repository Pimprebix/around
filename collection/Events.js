Events = new Mongo.Collection("events");

Meteor.methods({
    "insertItem": function(updateMode, id, doc){
    	if (updateMode){
    		return Events.update({_id:id},doc);
    	}
		else {
			return Events.insert(doc);
		}
	},

    "deleteItem": function(evtId){
		Events.remove(evtId); 
	}
});
