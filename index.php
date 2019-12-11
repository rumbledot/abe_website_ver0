<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notice Board</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="stylelogIn.css" />
</head>

<body onresize="restartPage()">
    <div class="jumbotron vertical-center">

        <!-- fixed position font resize buttons -->
        <button class="btn btn-primary btn-circle btn-xl" id="fontUp" onclick="fontUp()" aria-label="Larger Font"><i
                class="glyphicon glyphicon-zoom-in"></i></button>
        <button class="btn btn-primary btn-circle btn-xl" id="fontDown" onclick="fontDown()"
            aria-label="Smaller Font"><i class="glyphicon glyphicon-zoom-out"></i></button>

        <!-- Login modal -->
        <div id="loginModal" class="modal" tabindex="-1" role="dialog">

            <form class="modal-content animate" action="StaffDashboard.php" method="post">
                <div class="imgcontainer">
                    <span onclick="closeLogin()" class="close" title="Close Modal">&times;</span>
                    <img src="avater- login.png" alt="Avatar" class="avatar">
                </div>

                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required>

                    <button class="modalBtn" id="modalLoginBtn" type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                    </label>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <button type="button" onclick="closeLogin()" class="modalBtn" id="modalCancelbtn">Cancel</button>
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
        </div>

        <div class="container">
            <!-- Title -->
            <div class=" navbar navbar-light bg-light row justify-content-md-center">
                <div class="col-sm">

                </div>
                <div class="col-md-6 align-text-top">
                    <img class="center-block img-responsive" alt="special olympic logo"
                        src="SpecialOlympics-logo.png" />
                </div>
                <div class="col-sm text-right">
                    <button id="loginButton" class="col btn btn-link" onclick="displayLogin()">Staff
                        Login</button>
                </div>
            </div>
            <div id="controlDiv" class="row justify-content-center">

                <div class="col text-center">
                    <button class="btn col btn-primary btn-lg btn-block" id="clearFilter"
                        onclick="showFilter()"></button>
                    <div class="btn-group row text-center" role="group" aria-label="Filter Options" id="filterBtnGroup"
                        hidden>
                        <div class="dropdown">
                            <button class="btn btn-secondary btn-lg dropdown-toggle" type="button"
                                id="dropdownRegionButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Select Region
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="selectRegion">
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-secondary btn-lg dropdown-toggle" type="button"
                                id="dropdownClubButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Select Club
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="selectClub">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="container justify-content-center" style="width:100%;" id="messagesDiv"></div>
    </div>

    <script src="https://code.jquery.com/jquery-3.4.1.js "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="index.js"></script>
    <script>
    // Get the modal
    var modal = document.getElementById('loginModal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    </script>


</body>

</html>