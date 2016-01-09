Template.tpLogin.events({
    "submit form": function(event, template) {
		event.preventDefault();

		var user = $("input[name='username']").val();
		var password = $("input[name='password']").val();


		var account = Accounts.createUser({
                            username: username,
                            email : email,
                            password : password,
                            profile  : {
                                //publicly visible fields like firstname goes here
                            }
                        });

		// // Cas 1 : Login en utilisant le nom d'utilisateur
		// Meteor.loginWithPassword({
		// 	username: user
		// }, password, function(err) {
		// 	if (err) {
		// 		alert(err.reason)
		// 	}

		// });

		// // Cas 2 : Login en utilisant l'email
		// Meteor.loginWithPassword({email: user}, password, function(err) {
		// 	if (err) {
		// 		alert(err.reason)
		// 	}
		// });

		// Cas 3 : Login en utilisant le nom d'utilisateur ou l'email
		Meteor.loginWithPassword(user, password,
			function(err) {
				if (err) {
					alert(err.reason)
				}
			}
		);
	}
});