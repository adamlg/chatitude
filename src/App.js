(function(){
	window.App = {};

	App.pubsub = new Events()

  App.mount = function (elem) {
    $(elem).empty().append(
      AccountForm.mount( $('<div class="signin">') ),
      ChatMessages.mount( $('<div class="messages">') ),
      ChatForm.view( $('<div class="chat-form">') )
    )
    Chat.get()
  }
})()