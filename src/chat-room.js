(function(){
	window.Message = {};

	Message.Presenter = function(element){
		var $view = $(element)

		$view.on('click', '.signup', function(e) {
			e.preventDefault();
			var $username = $('input[name=username]').val();
			var $password = $('input[name=password]').val();
			User.signup($username, $password);
		});

		$view.on('click', '.signin', function(e) {
			e.preventDefault();
			var $username = $('input[name=username]').val();
			var $password = $('input[name=password]').val();
			User.signin($username, $password);
		});

		$view.on('click', '.send-button', function(e) {
			e.preventDefault()
			var apiToken = sessionStorage.getItem('apiToken');
			var $message = $('textarea[name=message]').val();
			Chat.send(apiToken, $message);
			$('textarea[name=message]').val('')
		});

		this.render = function(){
			$('.chat-room').text('')
			$view.append(Chat.map(messageView));
		}

		// App.pubsub.on('clearChat', function(){
		// 	$('textarea[name=message]').val('');
		// });

		App.pubsub.on('change:Chat', this.render)

		App.pubsub.on('createSession', function(username){
			$('.sign-up').text("Welcome " + username + "!").css('float', 'right');
		});
	}

	function messageView(message){
		var $div = $('<div>').addClass('chat-message');
		var $strong = $('<strong>').text(message.user + ' : ');
		var $span = $('<span>').text(message.message);

		$div.append($strong, $span);

		$('.chat-room').append($div);

		$("strong:contains('" + sessionStorage.getItem('username') + "')").css('color', 'blue');
	};

	Message.mount = function(element){
		var presenter = new Message.Presenter(element);
		presenter.render();
	}	
	Chat.get()
})()