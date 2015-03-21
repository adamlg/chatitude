(function () {
  window.ChatMessages = {}

  ChatMessages.view = function () {
    var vm = ChatMessages.viewModel
    var ctrl = ChatMessages.controller

    return Chat.map(function(message) {
      return $('<div>').append(
        $('<strong>').text(message.user + ' : '),
        $('<span>').text(message.message)
      )
    })
  }

  ChatMessages.mount = function (element) {
    ChatMessages.render(element)
    App.pubsub.on('change:Chat', function() {
      ChatMessages.render(element)
    })
    return element
  }
  ChatMessages.render = function (element) {
    $(element).empty().append(ChatMessages.view())
  }

})()
