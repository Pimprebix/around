Template.tpFilters.onRendered(
	function(){
		// insert datepickers		
		var startPicker = new Pikaday({ field: document.getElementById('tpFilter_startDate')});
		var endPicker 	= new Pikaday({ field: document.getElementById('tpFilter_endDate'	 )});

		// set dates if undefined
		if (Session.get("startDateFilter")===undefined){
			var	d1 = new Date(); //today
			var d2 = new Date(d1.getTime()+182*24*60*60*1000);	// 6month ahead
			Session.setDefault("startDateFilter", d1);
			Session.setDefault("endDateFilter", d2);
		}

		//retrieve stored data
      	var tags = Session.get("tagFilter");
      	var startDate = new Date(Session.get("startDateFilter"));
      	var endDate   = new Date(Session.get("endDateFilter"));

      	//set data in the form
      	// for dates
		startPicker.setDate(startDate);
		endPicker.setDate(endDate); 
		// for tags
		if (tags!=undefined){//we set categories according to value retrieved
			for (i in tags){
				$("#"+tags[i]).attr('checked', true);
			}
		}
		else{// we set all categories to checked
			$(".itemCategory").each(function(){
			  	$(this).attr('checked', true);
			});		
		}
	}
);