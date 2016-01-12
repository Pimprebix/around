Template.tpEditItem.events({
    'submit form': function(e){
    	console.log();
		e.preventDefault('submit form');
		
		var updateMode = Session.get("updateMode");

		var author = $("#tpEditItem_author").val();
		var title = $("#tpEditItem_title").val();
		var content = $("#tpEditItem_content").val();

      	//date (in GMT in database)
      	var startDate = new Date($('#tpEditItem_startDate').val());
      	startDate.setHours(
      		$("#tpEditItem_startDateHour :selected").val(),
      		$("#tpEditItem_startDateMinute :selected").val()
      		);

      	//categories
      	var tags = [];
		$(".itemCategory[checked=checked]").each(function(){
		  tags.push($(this).attr('id'));
		});

		var address = Session.get("address");

      	//filling object to insert
		var item = {
				author: author,
				title: title,
				content: content,
				startDate: startDate,
				tags : tags,
				address: address
		};
        
        // if itemId is defined insertData will update existing item
		var itemId = updateMode ? Session.get("modifiedItem")._id : null;	 
        // otherwise it'll create a new one.
		Meteor.call("insertItem", updateMode, itemId, item, function(err, id){
			if(err){
				alert(err.reason);
			}
			else{ 
				delete Session.keys['updateMode'];
				delete Session.keys['modifiedItem'];
				Router.go("main");
			}
		});
	},
	'click button[id=displayAddLocation]': function(e){
		e.preventDefault();
		var p = Session.get("displayAddLocation");
		Session.set("displayAddLocation", !p);
	}
});

Template.tpEditItem.helpers({
	modifyUseCase: function(){
		return Session.get("updateMode");
	},	
	displayAddLocation: function(){
		return Session.get("displayAddLocation");
	}
});


Template.tpEditItem.onRendered(
	function(){
		console.log('\nTemplate.tpEditItem.onRendered');
		/*******************
		Enhance HTML content
		********************/
		
		// Set datepicker
		var picker = new Pikaday({ field: document.getElementById('tpEditItem_startDate')});

		//fill minutes select
		step_minute=10;
		for (i = 0; i < 60; i=i+step_minute){
			$("<option />", {value: i, text: i}).appendTo($("#tpEditItem_startDateMinute"));
		}
    	
    	// fill hours select
		for (i = 0; i < 24; i++){
			$("<option />", {value: i, text: i}).appendTo($("#tpEditItem_startDateHour"));
		}

		//we clean all values => when modify then create panle is kept => need refresh => set a router level
		// if needed we restore previous values
		if (Session.get("updateMode")){
			console.log('Template.tpEditItem.onRendered: UPDATE Mode');
			var modifiedItem = Session.get("modifiedItem");
			$("#tpEditItem_author").val(modifiedItem.author);
			$("#tpEditItem_title").val(modifiedItem.title);
			$("#tpEditItem_content").val(modifiedItem.content);

			for (i in modifiedItem.tags){
				$('#'+modifiedItem.tags[i]).attr("checked", true);
			}

			picker.setDate(modifiedItem.startDate);
			$("#tpEditItem_startDateHour").val(modifiedItem.startDate.getHours());
			$("#tpEditItem_startDateMinute").val(modifiedItem.startDate.getMinutes());
		}
		else{
			console.log('Template.tpEditItem.onRendered: CREATE Mode');
		  	$("form input, form textarea").val("");
	        $("form select").val("0");
	        $("form img").attr("checked", false);
			picker.setDate(new Date());
		}
	}
);

