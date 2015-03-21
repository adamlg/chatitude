	getChats: function() {
		$.ajax({
			type: 'GET',
			url: 'http://chat.api.mks.io/chats'
		}).done(function (chats) {
			for (var key in chats){
				if (chats[key].id > lastId) renderChat(chats[key])
			}
		}).always(function(){
			setTimeout(getChats, 3000);
			$("strong:contains('" + sessionStorage.getItem('username') + "')").css('color', 'blue')
		})
	});