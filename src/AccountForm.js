(function () {
  window.AccountForm = {}

  AccountForm.viewModel = {
    username: '',
    password: '',
    set: function (name, value) {
      AccountForm.viewModel[name] = value
      App.pubsub.emit('change:AccountForm')
    }
  }

  AccountForm.view = function () {
    var vm = AccountForm.viewModel
    var ctrl = AccountForm.controller

    return $('<form>')
      .on('submit', vh.silence) // Silence form to force user to choose a button
      .append(
        $('<label>').text("Username: "),
        $('<input type="text" name="username">').val(vm.username).on('change', function() {
          vm.set('username', this.value)
        }),

        $('<label>').text("Password: "),
        $('<input type="text" name="password">').val(vm.password).on('change', function() {
          vm.set('password', this.value)
        }),

        $('<input type="submit" value="SignIn">').on('click', ctrl.signIn),
        $('<input type="submit" value="SignUp">').on('click', ctrl.signUp)
      )
  }

  AccountForm.controller = {
    signIn: function () {
      var vm = AccountForm.viewModel
      User.signin(vm.username, vm.password).success(function() {
        vm.set('username', '')
        vm.set('password', '')
      })
    },
    signUp: function () {
      var vm = AccountForm.viewModel
      User.signup(vm.username, vm.password).success(function() {
        vm.set('username', '')
        vm.set('password', '')
      })
    }
  }



  AccountForm.mount = function (element) {
    AccountForm.render(element)
    App.pubsub.on('change:AccountForm', function() {
      AccountForm.render(element)
    })
    return element
  }
  AccountForm.render = function (element) {
    $(element).empty().append(AccountForm.view())
  }

})()
