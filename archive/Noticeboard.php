<?php
$conn = new mysqli("localhost", "myuser", "mypass", "sonz");

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Noticeboard</title>
            <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    <body>
        <div id="content">
        <!-- Main content -->

        <!-- Retrieve notices from database -->
        <div>
<?php
    $query = $conn->prepare("SELECT id FROM messages;");
    $query->execute();
    $result = $query->get_result();
    // get message ids in an array
    $idArray = array();

    foreach ($result as $row) {
        $idArray[] = $row['id'];
    }
    // reverse order of array so newest shows first
    $newArray = array_reverse($idArray, FALSE);

    // display message for each id
    foreach($newArray as $i){
?>
            <div class="notice">

<?php
        $query = $conn->prepare("SELECT * FROM messages where id = ?;");
        $query->bind_param("i",$i);
        $query->execute();
        $result = $query->get_result();

        foreach ($result as $row){
?>
            <h3><?php echo $row['title']?></h3>
            <p><?php echo $row['content']?></p>
            <p><?php echo $row['created_at'] ?></p>
<?php
        }
?>
            </div>
<?php
    }
    

?>
        </div>
        </div>
        <div id="header">
                <h1>Noticeboard</h1>

        </div>
        <div id="footer">
            <div>
                
            </div>
</div>
        <div id="sidebar">
            <div>
                
            </div>
</div>
        <div id="mobileNav">
            <div>
                
            </div>
</div>
    </body>
</html>