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
						// needs to emit to present to update view
						Presenter.renderChat(chats[key]);
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
				// Emit to presenter 
				debugger
				sandbox.emit('clearChat');
				Presenter.clearMessage();
			})
		}
	}
})()