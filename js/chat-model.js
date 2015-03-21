(function() {
	window.MessageList = [];

	window.Chat = {
		lastId: 0,

		get: function() {
			$.ajax({
				type: 'GET',
				url: 'http://chat.api.mks.io/chats'
			}).done(function (chats) {
				for (var value of chats){
					if (value.id > Chat.lastId){
						MessageList.push(value);
					}
				}
				if (chats[chats.length-1].id > Chat.lastId) {
					App.pubsub.emit('renderChat')
					console.log('Chat.lastId', Chat.lastId, 'chats[chats.length-1].id', chats[chats.length-1].id)
				}
				Chat.lastId = chats[chats.length-1].id;
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
			})
		}
	}
})()