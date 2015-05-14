<!-- index.html -->
<!DOCTYPE html>
<head>
    <title>Chatitude</title>
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/handlebars-v2.0.0.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
</head>
<body>
	<div class="sign-up">
		<form style="float: right">
			<label>Usernamea: </label>
			<input type="text" name="username">
			<label>Password: </label>
			<input type="password" name="password">
			<input type="submit" value="Signin" class="signin">
			<input type="submit" value="Signup" class="signup">
		</form>
	</div>
	<div class="chat-room" style='min-height: 650px; max-height: 650px; width: 90%; overflow: auto; overflow-x: hidden; padding-top: 50px;'>
	</div>
	<div class="send-message">
		<form>
			<label>Message:</label>
			<textarea name='message' style="width: 29.5%"></textarea>
			<input type="submit" value="send" class="send-button">
		</form>
	</div>
</body>
<script id="chat-message-template" type="text/x-handlebars-template">
	<div class="chat-message">
		<p><strong>{{ user }}</strong>: <span> {{ message }}</span></p>
	</div>
</script>
<script src="js/chat-room.js"></script>
