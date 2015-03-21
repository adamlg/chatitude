(function() {
	window.User = {
		signup: function(username, password) {
			return $.ajax({
				url: 'http://chat.api.mks.io/signup',
				type: 'POST',
				data: {
					username: username,
					password: password
				}
			})
		},
		signin: function(username, password) {
			return $.ajax({
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
})()