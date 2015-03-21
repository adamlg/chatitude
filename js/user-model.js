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
				App.pubsub.emit('createSession', data.apiToken, username)
			})

		}
	}
})()