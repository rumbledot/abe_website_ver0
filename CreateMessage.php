<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>New Message</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" />
    <link rel="stylesheet" href="style.css" />

</head>

<body>
    <?php require_once 'processMessage.php';?>
    <div class="jumbotron vertical-center">
        <!-- fixed position font resize buttons -->
        <button class="btn btn-success btn-circle btn-xl" id="fontUp" onclick="publishMessage()"><i
                class="glyphicon glyphicon-ok"></i></button>
        <button class="btn btn-primary btn-circle btn-xl" id="fontDown" onclick="saveAsDraftMessage()"
            data-toggle="modal" data-target="#viewModal"><i class="glyphicon glyphicon-download-alt"></i></button>
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
                    <p id="msgID"></p>
                </div>
            </div>
        </div>
        <!-- Title -->
        <div class="row justify-content-md-center">
            <div class="col-sm">
            </div>
            <div class="col-6 align-text-top">
                <h1>Create message</h1>
            </div>
            <div class="col-sm">
            </div>
        </div>
        <br />
        <!-- BUTTONS BAR -->
        <div class="container justify-content-center" style="left:18vw; width:64vw;">
            <div class="row">
                <div class="col-sm">
                    <button class="col btn btn-lg btn-success" name="publish" onclick="publishMessage()"
                        id="cancelNotice">Publish! <i class="glyphicon glyphicon-ok"></i></button>
                </div>
                <div class="col-sm">
                    <button class="col btn btn-lg btn-primary" name="draft" onclick="saveAsDraftMessage()"
                        id="cancelNotice">
                        Save as draft <i class="glyphicon glyphicon-download-alt"></i></button>
                </div>
                <div class="col-sm">
                    <button class="col btn btn-lg btn-primary" name="cancel" onclick="cancelMessage()"
                        id="cancelNotice">Cancel <i class="glyphicon glyphicon-list"></i></button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <button class="col btn btn-lg btn-primary" onclick="addAllClubs()" id="addAllClubsButton">Add all
                        clubs</button>
                </div>
                <!-- CLUBS DROP DOWN BUTTONS -->
                <div class="col-sm">
                    <div class="dropdown">
                        <button class="col btn btn-lg btn-primary dropdown-toggle" type="button" id="dropdownRegions"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Region
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownRegions" id="selectRegion">
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="dropdown">
                        <button class="col btn btn-lg btn-primary dropdown-toggle" type="button" id="dropdownClubs"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Club
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownClubs" id="selectClub">
                        </div>
                    </div>
                </div>
            </div>
            <!-- DISPLAY THE SELECTED CLUB BUTTONS -->
            <div class="row" style="left:18vw; width:64vw;" id="selectedClubs"></div>
        </div>
        <br />

        <div class="container" style="left:18vw; width:64vw;">
            <div class="form_group">
                <label for="subject">Subject</label>
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject"
                    maxlength="100">
            </div>

            <div class="form_group">
                <label for="description">Description</label>
                <textarea class="form-control" name="description" id="description" placeholder="Description"
                    maxlength="500"></textarea>
            </div>

            <div class="form_group">
                <label for="content">Content</label>
                <textarea name="content" class="form-control" id="contentMsg" style="height: 300px;" maxlength="10000"
                    placeholder="Message's content"></textarea>
            </div>
        </div>
    </div>
    </div>

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
    <script src="createMessage.js"></script>
    <script src="populateFilters.js"></script>

    <!-- view Modal -->
    <div class="modal" id="viewModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Image</h5>
                    <button type="button" class="close" data-dismiss="modal" onclick="cancelMessage()"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <h2 class="modal-header">Do you want to add an image to this message?</h2>
                    <form method="POST" action="processUpload.php" enctype="multipart/form-data">
                        <input type="hidden" name="size" value="1000000">
                        <div>
                            <input type='file' accept='image/*' onchange='openFile(event)' name="image">
                        </div>
                        <div>
                            <input type="text" id="text" cols="40" rows="4" name="image_text"
                                placeholder="Please provide description of the image for screen reader." maxlength="100"
                                style="width:100%">
                        </div>
                        <img id="output" src="placeholder.png" class="card-img-top" alt="no image yet..">
                        <div>
                            <input type="text" id="msgIDcontainer" cols="40" rows="4" name="msgID" hidden>
                        </div>
                        <div>
                            <button class="btn btn-primary btn-lg" type="submit" name="uploadImage"
                                onclick="returnTodashboard()">Upload</button>
                        </div>
                    </form>
                </div>

                <div class="modal-footer" id="vmButtons">
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                        data-target="#warningImageUploadModal">Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="warningModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Warning</h5>
                </div>
                <div class="modal-body">
                    <h2 class="modal-text">Please fill out all the fields.</h2>
                </div>
                <div class="modal-footer" id="vmButtons">
                    <button type="button" class="btn btn-success btn-lg" data-dismiss="modal">Got it!
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="warningImageUploadModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Warning</h5>
                </div>
                <div class="modal-body">
                    <h2 class="modal-text">Do you want to cancel image upload?</h2>
                    <h2 class="modal-text">This will take you back to dashboard.</h2>
                </div>
                <div class="modal-footer" id="vmButtons">
                    <button type="button" class="btn btn-success btn-lg" data-dismiss="modal">No
                    </button>
                    <button type="button" class="btn btn-primary btn-lg" onclick="cancelMessage()">Yes
                    </button>
                </div>
            </div>
        </div>
    </div>

</body>

</html>