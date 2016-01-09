Template.categories.events({
	"click .itemCategory": function(e){
		console.log('Template.categories.events : click .itemCategory');
		var iconClicked = $('#'+e.target.id);
		iconClicked.attr("checked", !iconClicked.attr("checked"));
	}
});