var source = $("#chat-message-template").html();
var template = Handlebars.compile(source);

var count = 0;

(function getChats() {
	$.ajax({
		type: 'GET',
		url: 'http://chat.api.mks.io/chats'
	}).done(function (chats) {
		for (var key in chats) {
		var myNewMessage = template({
			user: chats[key].user,
			message: chats[key].message
		});
		count = chats[key].id
  		$('body').append(myNewMessage);
		}	
	}).always(function(){
		$('body').html()
		setTimeout(getChats, 5000);
	})
})();