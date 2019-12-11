<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Message</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <?php require_once 'processMessage.php';?>
    <div class="jumbotron vertical-center">
        <div class="container justify-content-center">

            <!-- Title -->
            <div class=" navbar navbar-light bg-light row justify-content-md-center text-center">
                <div class="col-sm">

                </div>
                <div class="col-md-6 align-text-top" id="logoDiv">
                    <img class="center-block img-responsive" alt="special olympic logo"
                        src="SpecialOlympics-logo.png" />
                </div>
                <div class="col-sm text-right">
                    <button id="loginButton" class="col btn btn-link" onclick="displayLogin()">Staff
                        Login</button>
                </div>
            </div>

            <div class="btn-group" role="group" aria-label="Font size buttons">
                <button class="btn btn-primary btn-circle btn-xl" id="fontUp" onclick="fontUp()"
                    aria-label="Larger Font"><i class="glyphicon glyphicon-zoom-in"></i></button>
                <button class="btn btn-primary btn-circle btn-xl" id="fontDown" onclick="fontDown()"
                    aria-label="Smaller Font"><i class="glyphicon glyphicon-zoom-out"></i></button>
                <button class="btn btn-primary btn-circle btn-xl" id="backButton" onclick="backToIndex()"
                    aria-label="back to noticeboard"><i class="glyphicon glyphicon-remove"></i></button>
            </div>

            <div class="container justify-content-center text-center" id="viewMessagesDiv">
                <div class="card justify-content-center text-center" id="viewMessageCard">
                    <div class="card-header justify-content-center text-center" id="viewMessageHeader">
                        <div class="card-image justify-content-center text-center" id="vmImage">
                            <img id="output" src="placeholder.png" class="card-img-top" alt="no image yet.."></div>
                        <div class="card-text justify-content-center text-center"><small
                                class="text-muted"><?php echo $timestamp ?></small></div>
                        <div class="card-title justify-content-center text-center" id="vmHeader"><?php echo $title ?>
                        </div>
                    </div>
                    <div class="card-body justify-content-center text-center">
                        <div class="btn-group justify-content-center text-center" role="group"
                            aria-label="listen buttons">
                            <button class="btn btn-primary btn-xl" id="listen" onclick="allTTS()"
                                aria-label="listen">Listen <i class="glyphicon glyphicon-volume-up"></i></button>
                            <!-- <button class="btn btn-primary" id="tellMe" onclick="textToSpeech()">Start read</button> -->
                            <!-- <button class="btn btn-primary" id="stopMe" onclick="stopTTS()">Stop read</button> -->
                        </div>
                        <div class="card-text justify-content-center text-center" id="vmDescription">
                            <?php echo $description ?></div>

                        <div class="card-text justify-content-center text-center" id="vmContent"><?php echo $content ?>
                        </div>
                        <div class="card-text justify-content-center text-center" id="vmClubs"></div>
                    </div>
                </div>
            </div>
            <p style="visibility: hidden" id="msgNum"><?php echo $id ?></p>
        </div>

    </div>

    <script src="https://code.jquery.com/jquery-3.4.1.js "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="Message-class.js"></script>
    <script src="message.js"></script>
</body>

</html>