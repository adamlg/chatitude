(function() {
	var messages = [], lastId = 0;

	window.Chat = {
		get: function() {
			$.ajax({
				type: 'GET',
				url: 'http://chat.api.mks.io/chats'
			}).done(function (chats) {
				chats.forEach(function(chat){
					if (chat.id > lastId){
						messages.push(chat)
					}
				})
				lastId = chats[chats.length-1].id 
				App.pubsub.emit('change:Chat');
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
			}).success(function(){
				Chat.get();
			})
		},

		map: function(cb){
			return messages.map(cb);
		}
	}
})()