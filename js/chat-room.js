session = {}
$(document).on("click", ".signup", function(e) {
	e.preventDefault()
	$.ajax({
		url: 'http://chat.api.mks.io/signup',
		type: 'POST',
		dataType: 'text',
		data: {
			username: $('input[name=username]').val(),
			password: $('input[name=password').val()
		}	
		}).done(function(data, textStatus, jqXHR) {
			console.log(data)
			console.log(textStatus)
			console.log(jqXHR)
			console.log('testing done')
		}).fail(function(data, textStatus, jqXHR) {
			console.log(data)
			console.log(textStatus)
			console.log(jqXHR)
			console.log('testing fail')
		})
})
$(document).on("click", ".signin", function(e) {
	e.preventDefault()
	$.ajax({
		url: 'http://chat.api.mks.io/signin',
		type: 'POST',
		dataType: 'text',
		data: {
			username: $('input[name=username]').val(),
			password: $('input[name=password]').val()
		}	
	}).done(function(data, textStatus, jqXHR, responseText) {
		console.log(data)
		console.log(textStatus)
		console.log(jqXHR)
		console.log(responseText)
		session.apiToken = data.slice(13, -2)
		session.username = $('input[name=username]').val()
		$('.sign-up').text("Welcome " + session.username + "!").css('float', 'right')
	}).fail(function() {
			
	})
})
$(document).on("click", ".send-button", function(e) {
	e.preventDefault()
	console.log(session.apiToken)
	$.ajax({
		url: 'http://chat.api.mks.io/chats',
		type: 'POST',
		dataType: 'text',
		data: {
			apiToken: session.apiToken,
			message: $('textarea[name=message]').val()
		}
	}).done(function(data, textStatus, jqXHR, responseText) {
		console.log(data)
		console.log(textStatus)
		console.log(jqXHR)
		console.log(responseText)
		$('textarea[name=message]').val('')
	}).fail(function(data, textStatus, jqXHR, responseText) {
		console.log(data)
		console.log(textStatus)
		console.log(jqXHR)
		console.log(responseText)
	})
})
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
				$('.chat-room').append(myNewMessage);
				lastId = chats[key].id
			}
		}
		if($("span:contains('http')")){
					arr = $("span:contains('http')").text().split(' ')
					for (var element in arr){
						if (element.indexOf('http') !== -1){ return element}
					}
					var replace = $('<img>').attr('src', arr[element])
					$("span:contains('http')").text('').append(replace)
		}	
	}).always(function(){
		setTimeout(getChats, 1000);
		$("strong:contains('" + session.username + "')").css('color', 'blue')
	})
})();