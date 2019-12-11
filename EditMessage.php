<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Edit Message</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <?php require_once 'processMessage.php';
    ?>
    <div class="jumbotron vertical-center">
        <!-- fixed position font resize buttons -->
        <button class="btn btn-success btn-circle btn-xl" id="fontUp" onclick="updateMessage()"><i
                class="glyphicon glyphicon-download-alt"></i></button>
        <button class="btn btn-primary btn-circle btn-xl" id="fontDown" onclick="backToDashboard()"><i
                class="glyphicon glyphicon-remove"></i></button>
        <!-- NAV BAR -->
        <div class="container">
            <div class=" navbar navbar-light bg-light row justify-content-md-center">
                <div class="col-sm">
                </div>
                <div class="col-6 align-text-top">
                    <img class="center-block img-responsive" alt="special olympic logo"
                        src="SpecialOlympics-logo.png" />
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
        <!-- Title -->
        <div class="row justify-content-md-center">
            <div class="col-sm">
            </div>
            <div class="col-6 align-text-top">
                <h1>Edit message</h1>
            </div>
            <div class="col-sm">
            </div>
        </div>
        <br />
        <!-- BUTTONS BAR -->
        <div class="container justify-content-center" style="left:18vw; width:64vw;">
            <div class="row">
                <div class="col-sm">
                    <button class="col btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownStatusButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><?php echo $status?>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="selectStatus">
                    </div>
                </div>
                <div class="col-sm">
                    <button class="col btn btn-success btn-lg" onclick="updateMessage()">Update</button>
                </div>
                <div class="col-sm">
                    <button class="col btn btn-primary btn-lg" onclick="backToDashboard()">Back</button>
                </div>
            </div>
        </div>
        <br />
        <div class="row justify-content-center">
            <div class="card" style="width: 20vw;">
                <img class="card-img-top" id="output" src="placeholder.png" class="card-img-top" alt="no image yet..">
            </div>
        </div>
        <br />
        <div class="row justify-content-center">
            <div class="card justify-content-center" style="width:50%">
                <div class="car-header justify-content-center">
                    <p class="card-header">Title</p>
                </div>
                <div class="card-body">
                    <input type="text" class="form-control" id="vmHeader" value="<?php echo $title ?>"
                        style="width:90%; font-size:2rem;" maxlength="100">
                    </input>
                    <p class="card-text">Description</p>
                    <textarea class="form-control" id="vmDescription" maxlength="500"
                        style="width:90%; font-size:2rem;"><?php echo $description ?></textarea>
                    </input>
                    <p class="card-text" id="vmClubs"></p>
                    <p class="card-text"><small class="text-muted">Last updated on: <?php echo $timestamp ?></small>
                    </p>
                    <p class="card-text">Content</p>
                    <textarea id="vmContent" class="form-control" style="width:90%; height:40rem; font-size:2rem;"
                        maxlength="10000"><?php echo $content ?></textarea>
                </div>
            </div>
        </div>
    </div>


    </div>
    </div>
    <p style="visibility: hidden" id="msgNum"><?php echo $id ?></p>
    <p style="visibility: hidden" id="msgStatus"><?php echo $status?></p>
    <script src="https://code.jquery.com/jquery-3.4.1.js "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="http://js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script>
    <script type="text/javascript">
    bkLib.onDomLoaded(nicEditors.allTextAreas);
    </script>
    <script src="Message-class.js"></script>
    <script src="message.js"></script>
</body>

</html>