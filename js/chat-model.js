(function() {
	window.Chat = {
		lastId: 0,

		get: function() {
			$.ajax({
				type: 'GET',
				url: 'http://chat.api.mks.io/chats'
			}).done(function (chats) {
				for (var key in chats){
					if (chats[key].id > Chat.lastId){
						App.pubsub.emit('renderChat', chats[key])
						Chat.lastId = chats[key].id;
					}
				}
			}).always(function(){
				setTimeout(Chat.get, 1000);
			})
		},

		send: function(apiToken, message) {
			$.ajax({
				url: 'http://chat.api.mks.io/chats',
				type: 'POST',
				dataType: 'text',
				data: {
					apiToken: apiToken,
					message: message
				}
			}).done(function(){
				App.pubsub.emit('clearChat');
				Presenter.clearMessage();
			})
		}
	}
})()