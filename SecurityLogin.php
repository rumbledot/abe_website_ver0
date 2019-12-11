<?php

session_start();

$DATABASE_HOST = 'localhost';
// $DATABASE_USER = 'hilal';
// $DATABASE_PASS = '12345';
$DATABASE_USER = 'bram';
$DATABASE_PASS = '12345678';
$DATABASE_NAME = 'sonz';

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {
	// If there is an error with the connection, stop the script and display the error.
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}

// Now we check if the data from the login form was submitted, isset() will check if the data exists.
if ( !isset($_POST['uname'], $_POST['psw']) ) {
	// Could not get the data that should have been sent.
	die ('Please fill both the username and password field!');
}


    // Preparing the SQL statement will prevent SQL injection.
if ($stmt = $con->prepare('SELECT id, password FROM staff WHERE username = ?')) {
	$stmt->bind_param('s', $_POST['uname']);
	$stmt->execute();
	$stmt->store_result();
}

if ($stmt->num_rows > 0) {
	$stmt->bind_result($id, $password);
	$stmt->fetch();
	// Account exists, now we verify the password.
	// Note: remember to use password_hash in your registration file to store the hashed passwords.
    if ($_POST['psw'] === $password) {
		// Verification success! User has loggedin!
		// Create sessions so we know the user is logged in, they basically act like cookies but remember the data on the server.
		session_regenerate_id();
		$_SESSION['loggedin'] = TRUE;
		$_SESSION['name'] = $_POST['uname'];
		$_SESSION['id'] = $id;
		echo 'Welcome ' . $_SESSION['name'] . '!';
	} else {
		echo 'Incorrect password!';
	}
} else {
	echo 'Incorrect username!';
}
$stmt->close();
?>