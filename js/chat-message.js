var source = $("#chat-message-template").html();
var template = Handlebars.compile(source);

var lastId = 0;

(function getChats() {
	$.ajax({
		type: 'GET',
		url: 'http://chat.api.mks.io/chats'
	}).done(function (chats) {
		for (var key in chats) {
			if (chats[key].id > lastId){
				var myNewMessage = template({
					user: chats[key].user,
					message: chats[key].message
				});
				$('body').append(myNewMessage);
				lastId = chats[key].id
			}
		}	
	}).always(function(){
		setTimeout(getChats, 1000);
	})
})();