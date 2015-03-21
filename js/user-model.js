(function() {

	// var username = null
	// var apiToken = null

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
				sessionStorage.setItem('apiToken', data.apiToken)
				sessionStorage.setItem('username', username)
				App.pubsub.emit('createSession', username)
			})

		}
	}
	if (sessionStorage.getItem('username') && sessionStorage.getItem('apiToken')){
		App.pubsub.emit('createSession', sessionStorage.getItem('username'))
	}
})()