<?php
// $conn = new mysqli("localhost", "bram", "12345678", "sonz");
// $conn = new mysqli("localhost", "hilal", "12345", "sonz");
// $conn = new mysqli("localhost", "bram", "12345678", "sonz");
$conn = new mysqli("localhost", "myuser", "mypass", "sonz");

$ids = array();
$titles = array();
$descriptions = array();
$contents = array();
$timestamps = array();
$statuses = array();
$clubs = array();
$regions = array();

// save message to DB
if (isset($_POST['saveMessage'])) {
    $message = json_decode($_POST['saveMessage']);
    
    $title = $message->title;
    $description = $message->description;
    $content = $message->content;
    $clubs = $message->msgClubs;
    $status = $message->status;
    $datetime = date('Y-m-d H:i:s');
    $query = $conn->prepare("INSERT INTO messages (title, content, description, created_at, status) 
                            VALUES (?, ?, ?, ?, ?);");
    $query->bind_param("sssss",$title, $content, $description, $datetime, $status);
    $query->execute();
    $message_id = $conn->insert_id;

    foreach ($clubs as $club){
        $queryClub = $conn->prepare(
            "INSERT INTO club_messages (club_id, message_id) 
                VALUES (?, ?);");
        $queryClub->bind_param("ii", $club, $message_id);
        $queryClub->execute();
    }

    echo json_encode($message_id);
}

if (isset($_POST['uploadImage'])) {
    $datetime = date('Y-m-d H:i:s');
    // Get image name
    $image = $_FILES['image']['name'];
  	// Get text
    // $image_text = mysqli_real_escape_string($conn, $_POST['image_text']);
    $image_text = $_POST['image_text'];

    $msgID = $_POST['msgID'];

  	// image file directory
    $target = "upload/".basename($image);

    $query = $conn->prepare(
            "INSERT INTO images (text, file_name, uploaded_on, message_id) 
                VALUES (?, '$image', ?, ?);");
    $query->bind_param("ssi", $image_text, $datetime, $msgID);
    $query->execute();

    // $sql = "INSERT INTO images (text, file_name, uploaded_on) VALUES ('$image_text', '$image', '$datetime')";
    //   // execute query
    // $result = $conn->query($sql);
    // // mysqli_query($conn, $sql);

    header('location: CreateMessage.php');
    exit();
}

if (isset($_POST['loadImage'])) {
    $id = $_POST['loadImage'];
    $response = array();

    $query = $conn->prepare("SELECT * FROM images WHERE message_id=?") or die($conn->error);
    $query->bind_param("i", $id);
    $query->execute();
    $result = $query->get_result();

    if (mysqli_num_rows($result) >= 1) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($response, $row['text']);
            array_push($response, $row['file_name']);
        }
    }

    echo json_encode($response);
}

if (isset($_POST['imgBase64'])) {
    define('UPLOAD_DIR', 'upload/');
    $img = $_POST['imgBase64'];  
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_DIR . uniqid() . '.png';
    $success = file_put_contents($file, $data);
    $insert = $db->query("INSERT into images ($file, uploaded_on) VALUES ('".$fileName."', NOW())");
    
}


// update a message to DB
if (isset($_POST['updateMessage'])) {
    $message = json_decode($_POST['updateMessage']);
    $id = $message->id;
    $title = $message->title;
    $description = $message->description;
    $content = $message->content;
    $clubs = $message->msgClubs;
    $status = $message->status;
    $datetime = date('Y-m-d H:i:s');
    $query = $conn->prepare(
        "UPDATE messages 
            SET title=?, content=?, description=?, created_at=?, status=?
                WHERE id=?;");
    $query->bind_param("sssssi",$title, $content, $description, $datetime, $status, $id);
    $query->execute();

    foreach ($clubs as $club){
        $queryClub = $conn->prepare(
            "INSERT INTO club_messages (club_id, message_id) 
                VALUES (?, ?);");
        $queryClub->bind_param("ii", $club, $id);
        $queryClub->execute();
    }
}

// get messages related to a club from DB
if (isset($_POST['getMessagesFromClub'])) {
    $id = $_POST['getMessagesFromClub'];

    $query = $conn->prepare("SELECT *, messages.id as msg_id FROM messages INNER JOIN club_messages ON messages.id = club_messages.message_id WHERE club_id=? AND status='published';") or die($conn->error);
    $query->bind_param("i", $id);
    $query->execute();
    $result = $query->get_result();

    if (mysqli_num_rows($result) >= 1) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($ids, $row['msg_id']);
            array_push($titles, $row['title']);
            array_push($descriptions, $row['description']);
            array_push($timestamps, $row['created_at']);
            array_push($statuses, $row['status']);
        }
    }

    $response['id'] = array_reverse($ids,FALSE);
    $response['title'] = array_reverse($titles,FALSE);
    $response['description'] = array_reverse($descriptions,FALSE);
    $response['timestamp'] = array_reverse($timestamps,FALSE);
    $response['status'] = array_reverse($statuses,FALSE);

    echo json_encode($response);
}

// delete message from DB
if (isset($_POST['deleteMessage'])) {
    $id = $_POST['deleteMessage'];
    $query = $conn->prepare("DELETE FROM messages WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
}

// archieve message from DB
if (isset($_POST['archiveMessage'])) {
    $id = $_POST['archiveMessage'];
    $query = $conn->prepare(
        "UPDATE messages 
            SET status='archive'
                WHERE id=?;");
    $query->bind_param("i", $id);
    $query->execute();
}

// view message in new window
if (isset($_GET['viewMessage'])) {
    $id = $_GET['viewMessage'];
    $result = $conn->query("SELECT * FROM messages WHERE id=$id;") or die($conn->error);
    
    if (mysqli_num_rows($result) >= 1) {
        $row = $result->fetch_array();
        $title = $row['title'];
        $description = $row['description'];
        $content = $row['content'];
        $timestamp = $row['created_at'];
        $status = $row['status'];
    }
    
}

// get message clubs
if (isset($_POST['getMessageClub'])) {
    $clubNames = array();

    $msgID = $_POST['getMessageClub'];

    $query = $conn->prepare(
        "SELECT name FROM clubs 
        INNER JOIN club_messages ON clubs.id = club_messages.club_id
        WHERE message_id=?;") or die($conn->error);
    $query->bind_param("i", $msgID);
    $query->execute();
    $result = $query->get_result();

    if (mysqli_num_rows($result) >= 1) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($clubNames, $row['name']);
        }
    }

    echo json_encode($clubNames);
}

// get all messages from DB
if (isset($_POST['displayMessages'])) {
    $query = $conn->prepare("SELECT id FROM messages;") or die($conn->error);
    $query->execute();
    $result = $query->get_result();
    // get message ids in an array
    $idArray = array();

    foreach ($result as $row) {
        $idArray[] = $row['id'];
    }
    // reverse order of array so newest shows first
    $ids = array_reverse($idArray, FALSE);

    // display message for each id
    foreach($ids as $i){

        $query = $conn->prepare("SELECT * FROM messages where id = ?;");
        $query->bind_param("i",$i);
        $query->execute();
        $result = $query->get_result();

        if (mysqli_num_rows($result) >= 1) {
            while ($row = mysqli_fetch_array($result)) {
                array_push($titles, $row['title']);
                array_push($descriptions, $row['description']);
                array_push($timestamps, $row['created_at']);
                array_push($statuses, $row['status']);
            }
        }
    }

    $response['id'] = $ids;
    $response['title'] = $titles;
    $response['description'] = $descriptions;
    $response['timestamp'] = $timestamps;
    $response['status'] = $statuses;

    echo json_encode($response);
}

if (isset($_POST['displayStatusMessages'])) {
    $stat = $_POST['displayStatusMessages'];
    $query = $conn->prepare("SELECT id FROM messages where status=?;") or die($conn->error);
    $query->bind_param("s", $stat);
    $query->execute();
    $result = $query->get_result();
    // get message ids in an array
    $idArray = array();

    foreach ($result as $row) {
        $idArray[] = $row['id'];
    }
    // reverse order of array so newest shows first
    $ids = array_reverse($idArray, FALSE);

    // display message for each id
    foreach($ids as $i){

        $query = $conn->prepare("SELECT * FROM messages where id = ?;");
        $query->bind_param("i",$i);
        $query->execute();
        $result = $query->get_result();

        if (mysqli_num_rows($result) >= 1) {
            while ($row = mysqli_fetch_array($result)) {
                array_push($titles, $row['title']);
                array_push($descriptions, $row['description']);
                array_push($timestamps, $row['created_at']);
                array_push($statuses, $row['status']);
            }
        }
    }

    $response['id'] = $ids;
    $response['title'] = $titles;
    $response['description'] = $descriptions;
    $response['timestamp'] = $timestamps;
    $response['status'] = $statuses;

    echo json_encode($response);
}

// get all clubs name from DB
if (isset($_POST['getAllClubs'])) {
    $ids = array();
    $names = array();
    $result = $conn->query("SELECT * FROM clubs;");
    foreach ($result as $row) {
        array_push($ids, $row['id']);
        array_push($names, $row['name']);
    }

    $clubs['id'] = $ids;
    $clubs['name'] = $names;

    echo json_encode($clubs);
}

if (isset($_POST['getClubFromRegion'])) {
    $ids = array();
    $names = array();
    // $id = 0;
    // if(isset($_POST['getClubFromRegion'])){
    $id = $_POST['getClubFromRegion'];

    // $sql = "SELECT * FROM clubs;";
    // if($id > 0){
        $sql = "SELECT * FROM clubs  WHERE region=?;";
    // }
    $query = $conn->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();
    $result = $query->get_result();

    foreach ($result as $row) {
        array_push($ids, $row['id']);
        array_push($names, $row['name']);
    }

    $clubs['id'] = $ids;
    $clubs['name'] = $names;

    echo json_encode($clubs);
}

// get all regions name from DB
if (isset($_POST['getAllRegions'])) {
    $ids = array();
    $names = array();

    $result = $conn->query("SELECT * FROM regions;");
    
    foreach ($result as $row) {
        array_push($ids, $row['id']);
        array_push($names, $row['name']);
    }

    $regions['id'] = $ids;
    $regions['name'] = $names;

    echo json_encode($regions);
}