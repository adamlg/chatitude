(function() {
	window.User = {
		signup: function(username, password) {
			$.ajax({
				url: 'http://chat.api.mks.io/signup',
				type: 'POST',
				data: {
					username: username,
					password: password
				}	
			}).done(function(){
				// debugger
				// Emit that signup was successful
			})
		},
		signin: function(username, password) {
			$.ajax({
				url: 'http://chat.api.mks.io/signin',
				type: 'POST',
				data: {
					username: username,
					password: password
				}	
			}).done(function(data) {
				// Needs to emit apiToken to presenter to update view
				// debugger
				Presenter.createSession(data.apiToken, username)
			})

		}
	}
})()