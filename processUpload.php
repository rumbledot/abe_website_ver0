<?php

// $conn = new mysqli("localhost", "bram", "12345678", "sonz");
$conn = new mysqli("localhost", "myuser", "mypass", "sonz");

if (isset($_POST['uploadImage'])) {
    $datetime = date('Y-m-d H:i:s');
    // Get image name
    
    $image = $_FILES['image']['name'];
    
    // This is the temporary location of the file, from which it needs
    // to be moved into the permanent location $target.
    $tmp_name = $_FILES['image']['tmp_name'];

  	// Get text
    // $image_text = mysqli_real_escape_string($conn, $_POST['image_text']);
    $image_text = $_POST['image_text'];

    $msgID = $_POST['msgID'];

  	// image file directory
    $target = "upload/".basename($image);
    $response = move_uploaded_file($tmp_name, $target);

    $query = $conn->prepare(
            "INSERT INTO images (text, file_name, uploaded_on, message_id) 
                VALUES (?, '$image', ?, ?);");
    $query->bind_param("ssi", $image_text, $datetime, $msgID);
    $query->execute();


    // $sql = "INSERT INTO images (text, file_name, uploaded_on) VALUES ('$image_text', '$image', '$datetime')";
    //   // execute query
    // $result = $conn->query($sql);
    // mysqli_query($conn, $sql);

    header('location: StaffDashboard.php');
    exit();
}