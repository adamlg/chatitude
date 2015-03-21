(function () {
  window.ChatForm = {}

  ChatForm.viewModel = {
    message: '',
    set: function (name, value) {
      ChatForm.viewModel[name] = value
      App.pubsub.emit('change:ChatForm')
    }
  }

  ChatForm.view = function () {
    var vm = ChatForm.viewModel
    var ctrl = ChatForm.controller

    return $('<form>')
      .on('submit', ctrl.submit)
      .append(
        $('<label>').text("Message: "),

        $('<textarea name="message">').val(vm.message).on('change', function(){
          vm.set('message', this.value)
        }),

        $('<input type="submit" value="Send">')
      )
  }

  ChatForm.controller = {
    submit: function (e) {
      e.preventDefault()
      var vm = ChatForm.viewModel
      var apiToken = sessionStorage.getItem('apiToken')
      Chat.send(apiToken, vm.message).success(function(){
        vm.set('message', '')
      })
    }
  }



  ChatForm.mount = function (element) {
    ChatForm.render(element)
    App.pubsub.on('change:ChatForm', function() {
      ChatForm.render(element)
    })
    return element
  }
  ChatForm.render = function (element) {
    $(element).empty().append(ChatForm.view())
  }

})()
