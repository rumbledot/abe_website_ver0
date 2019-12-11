<?php
session_start();
ob_start();

$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'myuser';
$DATABASE_PASS = 'mypass';
// $DATABASE_USER = 'bram';
// $DATABASE_PASS = '12345678';
$DATABASE_NAME = 'sonz';

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Staff DashBoard</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <?php

if ( mysqli_connect_errno() ) {
	// If there is an error with the connection, stop the script and display the error.
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}

// Now we check if the data from the login form was submitted, isset() will check if the data exists.
if ( !isset($_POST['uname'], $_POST['psw']) && !$_SESSION['loggedin']) {
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
		// echo 'Welcome ' . $_SESSION['name'] . '!';
    
        } else {
		$accessDenied = 'Incorrect password!';
	}
    
} else {
	$accessDenied = 'Incorrect username!';
}$stmt->close();
if($_SESSION['loggedin']){
?>

    <div class="jumbotron vertical-center">

        <!-- fixed position font resize buttons -->
        <button class="btn btn-primary btn-circle btn-xl" id="fontUp" onclick="createMessage()"><i
                class="glyphicon glyphicon-pencil">
            </i>
        </button>
        <button class="btn btn-primary btn-circle btn-xl" id="fontDown" onclick="backToIndex()"><i
                class="glyphicon glyphicon-list"></i></button>

        <!-- view Modal -->
        <div class="modal" id="viewModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">Delete Confirmation!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <h2 class="modal-header">Delete this message?</h2>
                    </div>

                    <div class="modal-footer" id="vmButtons">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <!-- Title -->
            <div class=" navbar navbar-light bg-light row justify-content-md-center">
                <div class="col-sm">
                </div>
                <div class="col-6 align-text-top">
                    <img class="center-block img-responsive" src="SpecialOlympics-logo.png" />
                </div>
                <div class="col-sm text-right">
                    <!-- <button class="col btn btn-lg btn-primary" onclick="backToIndex()">Notice Board</button> -->
                </div>
            </div>
        </div>
        <div class="container justify-content-center" style="left:18vw; width:64vw;">
            <div class="row">
                <div class="col-sm">
                    <button class="col btn btn-lg btn-primary" onclick="createMessage()">Create New Message <i
                            class="glyphicon glyphicon-pencil"></i>
                    </button>
                </div>
                <div class="col-sm">
                    <button class="col btn btn-lg btn-primary" onclick="backToIndex()">Notice Board <i
                            class="glyphicon glyphicon-list"></i></button>
                </div>
            </div>
        </div>
        <div class="container justify-content-center" style="left:5vw; width:90vw;" id="messagesDivStaff"></div>
    </div>
    <?php

} else {
	echo $accessDenied;
}

?>

    <script src="https://code.jquery.com/jquery-3.4.1.js "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="staffDashboard.js"></script>
</body>

</html>