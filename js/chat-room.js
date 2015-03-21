(function(){
	window.sandbox = {
		$signup: $('.signup'),
		$signin: $('.signin'),
		$sendButton: $('.send-button')
	};

	Events(sandbox);

	sandbox.$signup.on('click', function(e) {
		e.preventDefault();
		var $username = $('input[name=username]').val();
		var $password = $('input[name=password]').val();
		User.signup($username, $password);
	});

	sandbox.$signin.on('click', function(e) {
		e.preventDefault();
		var $username = $('input[name=username]').val();
		var $password = $('input[name=password]').val();
		User.signin($username, $password);
	});

	sandbox.$sendButton.on('click', function(e) {
		e.preventDefault()
		var apiToken = sessionStorage.getItem('apiToken');
		var $message = $('textarea[name=message]').val();
		Chat.send(apiToken, $message);
	});

	sandbox.on('clearChat', function(){
		$('textarea[name=message]').val('');
	});

	window.Presenter = {
		// This should be a listener
		createSession: function(apiToken, username){
			sessionStorage.setItem('username', username);
			sessionStorage.setItem('apiToken', apiToken);
		},
		// This should be a listener
		renderChat: function(message){
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
		}
	}
	if (sessionStorage.getItem('username') && sessionStorage.getItem('apiToken')){
		$('.sign-up').text("Welcome " + sessionStorage.getItem('username') + "!").css('float', 'right');
	}
})()