(function() {
	var messages = [], url = 'http://chat.api.mks.io/chats', lastId = 0;

	window.Chat = {
		get: function() {
			$.ajax({
				type: 'GET',
				url: url
			}).done(function (chats) {
				messages = chats;
				App.pubsub.emit('change:Chat');
			}).always(function(){
				setTimeout(Chat.get, 1000);
			})
		},

		send: function(apiToken, message) {
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'text',
				data: {
					apiToken: apiToken,
					message: message
				}
			}).success(function(){
				Chat.get();
			})
		},

		map: function(cb){
			return messages.map(cb);
		}
	}
})()