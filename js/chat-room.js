(function(){
	App.pubsub.$signup = $('.signup');
	App.pubsub.$signin = $('.signin');
	App.pubsub.$sendButton = $('.send-button')

	App.pubsub.$signup.on('click', function(e) {
		e.preventDefault();
		var $username = $('input[name=username]').val();
		var $password = $('input[name=password]').val();
		User.signup($username, $password);
	});

	App.pubsub.$signin.on('click', function(e) {
		e.preventDefault();
		var $username = $('input[name=username]').val();
		var $password = $('input[name=password]').val();
		User.signin($username, $password);
	});

	App.pubsub.$sendButton.on('click', function(e) {
		e.preventDefault()
		var apiToken = sessionStorage.getItem('apiToken');
		var $message = $('textarea[name=message]').val();
		Chat.send(apiToken, $message);
	});

	App.pubsub.on('clearChat', function(){
		$('textarea[name=message]').val('');
	});

	App.pubsub.on('renderChat', function(message){
		var $div = $('<div>').addClass('chat-message');
		var $strong = $('<strong>').text(message.user + ' : ');
		var $span = $('<span>').text(message.message);

		$div.append($strong, $span);

		$('.chat-room').append($div);

		$("strong:contains('" + sessionStorage.getItem('username') + "')").css('color', 'blue');

		// Find and replace images.
		if($("span:contains('http')")){
			var arr = $("span:contains('http')").text().split(' ')
			for (var element in arr){
				if (element.indexOf('http') !== -1){ return element}
			}
			var replace = $('<img>').attr('src', arr[element])
			$("span:contains('http')").text('').append(replace)
		}
	});

	App.pubsub.on('createSession', function(apiToken, username){
		sessionStorage.setItem('username', username);
		sessionStorage.setItem('apiToken', apiToken);
	});

	if (sessionStorage.getItem('username') && sessionStorage.getItem('apiToken')){
		$('.sign-up').text("Welcome " + sessionStorage.getItem('username') + "!").css('float', 'right');
	}
	Chat.get()
})()