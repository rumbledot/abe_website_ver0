var ids = [];
var names = [];
var clubs = [];
var clubIDs = [];
var imageLoaded = false;
var imageFile;
var msgID;

// first called when page loaded and ready
$(document).ready(function(){
    populateRegion();
    fillClubsDropDown();
});

// image upload functions
var openFile = function(event) {
        var input = event.target;
        console.log(input);

        var reader = new FileReader();
        reader.onload = function(){
            var dataURL = reader.result;
            var output = document.getElementById('output');
            output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
        
        var imgLink = document.getElementById('imageFileName');
        imgLink.innerHTML = input.files[0];
        imageFile = input.files[0];
        imageLoaded = true;
    };

// button functions
function saveAsDraftMessage() {
    if (checkBeforeSubmit()==true) {
        saveMessage("draft");
    } else {
        $('#warningModal').modal('show');
    }
}

function publishMessage() {
    console.log(checkBeforeSubmit());
    if (checkBeforeSubmit()==true) {
        saveMessage("published");
    } else {
        $('#warningModal').modal('show');
    }
}

function cancelMessage(){
    window.location.href = './StaffDashboard.php';
}

function selectRegion(id) {
    
    $.ajax({
        url: 'CreateMessage.php',
        type: "POST",
        data: {
            selectedRegion: id
        },
        success: function(data){
            document.getElementById('selectClubs').innerHTML = "Region Clubs";           
        }
    }); 
}

function addAllClubs() {
    for(let j = 0; j < ids.length; j++) {
        selectClub(names[j], ids[j]);
    }
    console.log(clubs);
}

function selectClub(clubName, clubID){
    // console.log(clubs.indexOf(clubID));
    if(clubs.includes(parseInt(clubID), 0)===false){
        let clubsDiv = document.getElementById('selectedClubs');

        let club = document.createElement('button');//Possibly make button later to remove
        club.setAttribute('class', 'col btn btn-lg btn-info');
        club.innerHTML = clubName + "  <span class='glyphicon glyphicon-remove-circle'></span>";
        clubsDiv.appendChild(club);
        // console.log('clubs add ' + clubID);
        // console.log(clubs);

        club.addEventListener('click', function(){
            clubsDiv.removeChild(club);
            var index = clubs.indexOf(parseInt(clubID));
            if (index !== -1) clubs.splice(index, 1);
            // console.log('clubs remove ' + clubID + 'at ' + index);
            // console.log(clubs);
        });
        
        clubs.push(parseInt(clubID));
    }
}

function fillClubsDropDown() {
    let clubDropDown = document.getElementById('selectClub');
    clubDropDown.innerHTML = "";
    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            getAllClubs : 1,
        },
        success: function(data) {
            let clubs = JSON.parse(data);
            console.log(data);
            ids = clubs.id;
            names = clubs.name;

            for(let j = 0; j < ids.length; j++) {
                    // console.log(ids[j]);
                    let dropDownItem = document.createElement('a');
                    dropDownItem.setAttribute('class', 'dropdown-item');
                    dropDownItem.setAttribute('onclick', 'selectClub("'+names[j]+'", ' + ids[j] + ')');
                    dropDownItem.innerText = names[j];
                    clubDropDown.appendChild(dropDownItem);
                }
        }
    });
}

function checkBeforeSubmit() {
    let allChecked = false;
    
    let title = document.getElementById('subject').value;
    console.log("OUTPUT: checkBeforeSubmit -> title", title);
    let description = nicEditors.findEditor('description').getContent();
    console.log("OUTPUT: checkBeforeSubmit -> description", description);
    let content = nicEditors.findEditor('contentMsg').getContent();
    console.log("OUTPUT: checkBeforeSubmit -> content", content);
    console.log((title) ? true : false);
    console.log((description) ? true : false);
    console.log((description!="<br>") ? true : false);
    console.log((content) ? true : false);
    console.log((content!="<br>") ? true : false);

    if (title && description && content && description!="<br>" && description!="<br>") {
        allChecked = true;
        console.log('true');
    } else {
        allChecked = false;
        console.log('false');
    }
    console.log("check before submit " + allChecked);

    if (imageLoaded === true) {
        let imgDesc = document.getElementById('imageText').value;
        allChecked = (imgDesc===null || imgDesc==="") ? false : true;
        console.log("check before submit after image " + allChecked);
    }

    return allChecked;
}

// save message to DB and set it's status based on param field
function saveMessage(msgStatus) {
    let title = document.getElementById('subject').value;
    // let description = document.getElementById('description').value;
    // let content = document.getElementById('contentMsg').value;
    let content = nicEditors.findEditor('contentMsg').getContent();
    let description = nicEditors.findEditor('description').getContent();
    let newMessage = new Message(0, title, description, content, msgStatus);

    newMessage.addClubs(clubs);
    newMessage.getAll();

    let tosent = JSON.stringify(newMessage);
    $.ajax({
        url:'processMessage.php',
        method:'POST',
        data: {
            saveMessage : tosent
        },
        success: function(res) {
            console.log(res);
            let imgID = document.getElementById('msgID');imgID.innerHTML = res;
            msgID = res;
            console.log("OUTPUT: saveMessage -> msgID", msgID);
            $('#viewModal').modal('show');
            let msgID1 = document.getElementById('msgIDcontainer');
            msgID1.value = parseInt(msgID);
        }
    });

    // let imageToLoad = [];
    // let imageFile = document.querySelector('[type=file]').files;
    // console.log(imageFile);
    // let imgID = document.getElementById('msgID');
    // imageToLoad[0] = imageFile[0].name;
    // console.log(imageToLoad[0]);
    // imageToLoad[1] = document.getElementById('imageText').value;
    // console.log(imageToLoad[1]);
    // imageToLoad[2] = imgID.innerHTML;
    // console.log(imageToLoad[2]);

    // tosent = JSON.stringify(imageToLoad);
    // $.ajax({
    //     url:'processMessage.php',
    //     method:'POST',
    //     data: {
    //         uploadImage : tosent
    //     },
    //     success: function(res) {
    //         console.log(res);
    //     }
    // });

    // $('#viewModal').on('shown.bs.modal', function () {
    //     let imgID = document.getElementById('msgID');
    //     let msgID1 = document.getElementById('msgIDcontainer');
    //     msgID1.value = parseInt(msgID);
    //     console.log('message ID ' + msgID);
    // });

    document.getElementById('subject').value = '';
    document.getElementById('description').value = '';
    document.getElementById('contentMsg').value = '';
    clubs = [];

    // window.location.href = './StaffDashboard.php';
}
