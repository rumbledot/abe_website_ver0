var synth = window.speechSynthesis;
var utter = new SpeechSynthesisUtterance();
var fontsize = 20;
minFontSize = '15px';
var speechspeed = 1;
var selectedClub = 0;

// called when page is fully loaded and ready
$(document).ready(function() {

    restartPage();
});

function restartPage() {
    console.log(selectedClub);
    if (selectedClub==0) {
        getMessages();
    } else {
        getMessagesByClubID(selectedClub);
    }

    populateRegion();
    
    let clearfilterButton = document.getElementById('clearFilter');
    clearfilterButton.innerHTML = "Show Filter Options";
    
    fillClubsDropDown();
}

// functions for filtering buttons
function showFilter(){
    let filterBtn = document.getElementById('clearFilter');

    if(filterBtn.innerHTML=="Show Filter Options"){
        document.getElementById('filterBtnGroup').hidden = false;
        filterBtn.innerHTML="Clear Filter";
    }
    else if(filterBtn.innerHTML=="Clear Filter"){
        document.getElementById('filterBtnGroup').hidden = true;
        filterBtn.innerHTML="Show Filter Options";
        document.getElementById('dropdownClubButton').innerHTML="Select Club";
        document.getElementById('dropdownRegionButton').innerHTML="Select Region";
        selectedClub = 0;
        restartPage();
    }
}

function populateRegion() {
    let regionDropDown = document.getElementById('selectRegion');
    regionDropDown.innerHTML = '';
    
    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            getAllRegions : 1
        },
        success: function(data) {
            let regions = JSON.parse(data);
            let ids = regions.id;
            let names = regions.name;

                for(let j = 0; j < ids.length; j++) {
                    let dropDownItem = document.createElement('button');
                    dropDownItem.setAttribute('class', 'dropdown-item');
                    dropDownItem.setAttribute('onclick', 'updateClubsDropDown(' + ids[j] + ', "' + names[j] + '")');
                    dropDownItem.innerText = names[j];
                    regionDropDown.appendChild(dropDownItem);
                }
            }
    });
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

            let ids = clubs.id;
            let names = clubs.name;

            for(let j = 0; j < ids.length; j++) {

                    let dropDownItem = document.createElement('button');
                    dropDownItem.setAttribute('class', 'dropdown-item');
                    dropDownItem.setAttribute('onclick', 'getMessagesByClubID(' + ids[j] + ', "' + names[j] + '")');
                    dropDownItem.innerText = names[j];
                    clubDropDown.appendChild(dropDownItem);
                }
        }
    });
}

function updateClubsDropDown(id, name) {
    let clubDropDown = document.getElementById('selectClub');
    clubDropDown.innerHTML = "";

    selectedClub = id;
    
    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            getClubFromRegion : id
        },
        success: function(data) {
            let clubs = JSON.parse(data);
            let ids = clubs.id;
            let names = clubs.name;

            for(let j = 0; j < ids.length; j++) {
                    let dropDownItem = document.createElement('button');
                    dropDownItem.setAttribute('class', 'dropdown-item');
                    dropDownItem.setAttribute('onclick', 'getMessagesByClubID(' + ids[j] + ', "' + names[j] + '")');
                    dropDownItem.innerText = names[j];
                    clubDropDown.appendChild(dropDownItem);
                }
        }
    });

    document.getElementById('dropdownRegionButton').innerHTML= name;
}

// get messages from DB and display them
function getMessages() {
    let clubDropDown = document.getElementById('selectClub');
    clubDropDown.innerHTML = "";

    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            displayStatusMessages : "published"
        },
        success: function(data1) {
            data = JSON.parse(data1);
            displayMessages(data)
        }
    });
}

function getMessagesByClubID(id, name) {
    let clubDropDown = document.getElementById('selectClub');
    clubDropDown.innerHTML = "";

    console.log('get msg by club ID called !!');

    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            getMessagesFromClub : id
        },
        success: function(data1) {
            data=JSON.parse(data1);
            console.log("Get msg by club ID data " + data);
            displayMessages(data);
        }
    });

    document.getElementById('dropdownClubButton').innerHTML= name;

}

function displayMessages(data) {

    let ids = [];
    let titles = [];
    let descriptions = [];
    let timestamps = [];
    var clubs = [];
    let statuses = []

    var div = document.createElement('div');
            let itemsInARow = 0;
            let itemsInARowMax = 2;
            
            ids = data.id;
            titles = data.title;
            descriptions = data.description;
            timestamps = data.timestamp;
            statuses = data.status;
                    
            var msgdiv = document.getElementById('messagesDiv');
            msgdiv.innerHTML='';

                    // if ($(window).width() >= 770) {
                    //     div.setAttribute('class', 'row row-cols-2 justify-content-center');
                    //     // div.setAttribute('style', 'width:80vw; left:10vw');
                    //     itemsInARowMax = 2;
                    //     maxCardWidth = 'max-width:40vw';
                    // } else if ($(window).width() < 769){
                        div.setAttribute('class', 'row justify-content-center');
                        // div.setAttribute('style', 'width:80vw; left:10vw');
                        itemsInARowMax = 1;
                        maxCardWidth = 'max-width:80vw';
                    // }
                    msgdiv.appendChild(div);


            for (let i = 0; i < titles.length; i++) {

                clubs = [];

                if (itemsInARow >= itemsInARowMax) {
                    div = document.createElement('div');
                    
                    // if ($(window).width() >= 770) {
                    //     div.setAttribute('class', 'row row-cols-2 justify-content-center');
                    //     // div.setAttribute('style', 'width:80vw; left:10vw');
                    //     itemsInARowMax = 2;
                    //     maxCardWidth = 'max-width:40vw';
                    // } else if ($(window).width() < 769){
                        div.setAttribute('class', 'row justify-content-center');
                        // div.setAttribute('style', 'width:80vw; left:10vw');
                        itemsInARowMax = 1;
                        maxCardWidth = 'max-width:80vw';
                    // }
                    msgdiv.appendChild(div);
                    itemsInARow = 0;
                }

                let msgRow = document.createElement('div');
                msgRow.setAttribute('class', 'col padding-10')
                div.appendChild(msgRow);

                let cardMainDiv = document.createElement('div');
                cardMainDiv.setAttribute('class', 'card mb-3');
                cardMainDiv.setAttribute('style', maxCardWidth);
                cardMainDiv.setAttribute('id', 'messageCard');
                msgRow.appendChild(cardMainDiv);

                let cardMainRowDiv = document.createElement('div'); 
                cardMainRowDiv.setAttribute('class', 'row no-gutter');
                cardMainDiv.appendChild(cardMainRowDiv);

                let cardImageDiv = document.createElement('div'); 
                cardImageDiv.setAttribute('class', 'col-md-5 align-text-top');
                cardMainRowDiv.appendChild(cardImageDiv);

                let cardTheImageDiv = document.createElement('img');
                cardTheImageDiv.setAttribute('class', 'card-img');
                cardTheImageDiv.setAttribute('src', 'empty-image.png');
                // cardTheImageDiv.setAttribute('style', 'width:13vw; margin:1vw');
                cardImageDiv.setAttribute('id','imageDiv');
                cardImageDiv.appendChild(cardTheImageDiv);

                $.ajax({
                    url:'./processMessage.php',
                    method:'post',
                    data: {
                        loadImage : ids[i]
                    },
                        success: function(data1) {
                        data=JSON.parse(data1);
                        console.log("whats in " + data);
                        console.log("loaded image" + data[0]);
                        console.log("loaded image text" + data[1]);
                        if (data != 0) {
                        cardTheImageDiv.setAttribute('src', 'upload/' + data[1]);
                        cardTheImageDiv.setAttribute('alt', data[0]);
                        }
                    }
                });

                let cardBodyDiv = document.createElement('div'); 
                cardBodyDiv.setAttribute('class', 'col-md-7');
                cardMainRowDiv.appendChild(cardBodyDiv);

                let messageDiv = document.createElement('div'); 
                messageDiv.setAttribute('class', 'card-body');
                cardBodyDiv.appendChild(messageDiv);

                let titleDiv = document.createElement('h2');
                titleDiv.setAttribute('class','card-header');
                titleDiv.setAttribute('id','messageCardHeader');
                messageDiv.appendChild(titleDiv);

                let bodyDiv = document.createElement('div');
                bodyDiv.setAttribute('class','card-body');
                bodyDiv.setAttribute('id','messageCardBody');
                messageDiv.appendChild(bodyDiv);

                
                let timeStampDiv = document.createElement('div');
                timeStampDiv.setAttribute('class','card-text');
                bodyDiv.appendChild(timeStampDiv);

                let timeStampDivSmall = document.createElement('small');
                timeStampDivSmall.setAttribute('class','text-muted');
                timeStampDivSmall.setAttribute('id','timestamp');
                bodyDiv.appendChild(timeStampDivSmall);

                let descriptionDiv = document.createElement('p');
                descriptionDiv.setAttribute('class','card-text');
                bodyDiv.appendChild(descriptionDiv);

                let clubsDiv = document.createElement('div');
                clubsDiv.setAttribute('class','card-text');
                
                bodyDiv.appendChild(clubsDiv);

                let clubsH3Div = document.createElement('h2');
                
                clubsDiv.appendChild(clubsH3Div);


                let buttonFoot = document.createElement('div');
                buttonFoot.setAttribute('class','card-footer');
                buttonFoot.setAttribute('id','messageCardFooter');
                bodyDiv.appendChild(buttonFoot);

                let viewButton = document.createElement('button');
                viewButton.setAttribute('class', 'btn btn-primary btn-circle btn-xl submitorder');
                viewButton.setAttribute('aria-label', 'View full notice');
                viewButton.style.zIndex = '5';
                viewButton.style.margin = '0';
                viewButton.style.display = 'inline-block';
                buttonFoot.appendChild(viewButton);

                let viewButtonIcon = document.createElement('i');
                // viewButtonIcon.setAttribute('class', 'glyphicon glyphicon-chevron-down');
                viewButtonIcon.setAttribute('class', 'glyphicon glyphicon-fullscreen');
                viewButton.appendChild(viewButtonIcon);

                let tellButton = document.createElement('button');
                tellButton.setAttribute('id', ids[i]);
                tellButton.setAttribute('class', 'btn btn-primary btn-circle btn-xl submitorder');
                tellButton.setAttribute('aria-label', 'Start read aloud');
                tellButton.style.zIndex = '5';
                tellButton.style.margin = '0';
                tellButton.style.display = 'inline-block';
                buttonFoot.appendChild(tellButton);

                let tellButtonIcon = document.createElement('i');
                tellButtonIcon.setAttribute('class', 'glyphicon glyphicon-volume-up');
                tellButton.appendChild(tellButtonIcon);

                let stoptellButton = document.createElement('button');
                stoptellButton.setAttribute('class', 'btn btn-primary btn-circle btn-xl submitorder');
                stoptellButton.setAttribute('aria-label', 'Stop read aloud');
                stoptellButton.style.zIndex = '5';
                stoptellButton.style.margin = '0';
                stoptellButton.style.display = 'inline-block';
                buttonFoot.appendChild(stoptellButton);

                let stopButtonIcon = document.createElement('i');
                stopButtonIcon.setAttribute('class', 'glyphicon glyphicon-volume-off');
                stoptellButton.appendChild(stopButtonIcon);

                titleDiv.innerHTML = titles[i];
                descriptionDiv.innerHTML = descriptions[i];
                $.ajax({
                    url:'./processMessage.php',
                    method:'post',
                    data: {
                        getMessageClub : ids[i]
                    },
                    success: function(res) {
                        clubs = JSON.parse(res);

                        if(clubs.length > 0) {
                            for (let j = 0; j < clubs.length; j++) {
                                let spanClub = document.createElement('span');
                                spanClub.setAttribute('class', 'badge badge-primary');
                                spanClub.innerHTML = clubs[j];
                                clubsH3Div.appendChild(spanClub);
                            }
                        }
                        else{
                            clubsH3Div.setAttribute('aria-label','tagged clubs');
                        }
                    }
                });
                if (statuses[i]===null || statuses[i]==="") statuses[i] = "draft";
                // timeStampDivSmall.innerHTML = statuses[i] + " at " + timestamps[i];
                timeStampDivSmall.innerHTML = timestamps[i];

                tellButton.addEventListener('click', function() {
                    event.stopPropagation();
                    var text0 = "Message title. " + titles[i];
                    if (descriptions[i] === null || descriptions[i] === '') { 
                        var text1 = ". No message description."; } 
                        else {
                        var text1 = ". Message description. " + descriptions[i]; }
                    var text = text0 + text1;
                    textToSpeech(text);
                });

                stoptellButton.addEventListener('click', function() {
                    event.stopPropagation();
                    stopTTS();
                });

                cardMainDiv.addEventListener('click', function() {
                    window.location.href = './Message.php?viewMessage=' + ids[i];
                });

                viewButton.addEventListener('click', function() {
                    window.location.href = './Message.php?viewMessage=' + ids[i];
                });

                itemsInARow++;
            }

        
}

// TTS functions
function textToSpeech(text) {

    if (!(text == '')) {
        var available_voices = window.speechSynthesis.getVoices();

        var english_voice = '';

        for (var i = 0; i < available_voices.length; i++) {
            if (available_voices[i].lang === 'en-US') {
                english_voice = available_voices[i];
                break;
            }
        }
        if (english_voice === '')
            english_voice = available_voices[0];

        utter.rate = speechspeed;
        utter.pitch = 0.5;
        utter.text = text;
        utter.voice = english_voice;

        window.speechSynthesis.speak(utter);
    }
}

function stopTTS() {
    synth.cancel();
}
// font decrease increase functions
// function fontUp() {
//     fontsize=fontsize+5
//     if (fontsize > 60) fontsize = 60;
//     let allCardHeader = document.getElementsByClassName('card-header');
//     for (let i = 0; i < allCardHeader.length; i++) {
//         // allCardHeader[i].style.fontSize = fontsize+'px';
//         itemFontChange(allCardHeader[i]);
//     }
//     let allCardText = document.getElementsByClassName('card-text');
//     for (let i = 0; i < allCardText.length; i++) {
//         // allCardText[i].style.fontSize = fontsize+'px';
//         itemFontChange(allCardText[i]);
//     }
//     let spans = document.getElementsByClassName('badge');
//     for (let i = 0; i < spans.length; i++)
//         spans[i].style.fontSize = fontsize+'px';
// }   

// function itemFontChange(item) {
//     item.style.fontSize = fontsize+'px';
//     for (let i = 0; i < item.children.length; i++) {
//         itemFontChange(item.children[i]);
//     }
// }   

function fontUp() {
    fontsize=fontsize+5
    if (fontsize > 60) fontsize = 60;
    // document.getElementById('vmHeader').style.fontSize = fontsize+'px';
    // itemFontChange(document.getElementById('vmHeader'));
    itemFontChange(document.getElementById('messagesDiv'),1);
    let spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++)
        spans[i].style.fontSize = fontsize+'px';
    // document.getElementById('vmDescription').style.fontSize = fontsize+'px';
    // document.getElementById('vmContent').style.fontSize = fontsize+'px';
    // itemFontChange(document.getElementById('vmDescription'));
    // itemFontChange(document.getElementById('vmContent'));
}

function fontDown() {
    fontsize=fontsize-5;
    if (fontsize < minFontSize) fontsize = minFontSize;
    // document.getElementById('vmHeader').style.fontSize = fontsize+'px';
    // itemFontChange(document.getElementById('vmHeader'));
    itemFontChange(document.getElementById('messagesDiv'),-1);
    let spans = document.getElementsByClassName('badge');
    for (let i = 0; i < spans.length; i++)
        spans[i].style.fontSize = fontsize+'px';
    // document.getElementById('vmDescription').style.fontSize = fontsize+'px';
    // document.getElementById('vmContent').style.fontSize = fontsize+'px';
    // itemFontChange(document.getElementById('vmDescription'));
    // itemFontChange(document.getElementById('vmContent'));
}

function itemFontChange(item, change) {
    let currentSize = window.getComputedStyle(item, null).getPropertyValue('font-size');
    console.log(item.id);
    if(item.id =='timestamp'){
        console.log("found timestamp")
    } else {
    if(currentSize<minFontSize) currentSize = minFontSize
    item.style.fontSize = (parseFloat(currentSize)+(5*change))+'px';
    console.log(currentSize);
    for (let i = 0; i < item.children.length; i++) {
        itemFontChange(item.children[i], change);
    }
}
} 

// function fontDown() {
//     fontsize=fontsize-5;
//     if (fontsize < 10) fontsize = 10;
//     let allCardHeader = document.getElementsByClassName('card-header');
//     for (let i = 0; i < allCardHeader.length; i++) {
//         // allCardHeader[i].style.fontSize = fontsize+'px';
//         itemFontChange(allCardHeader[i]);
//     }
//     let allCardText = document.getElementsByClassName('card-text');
//     for (let i = 0; i < allCardText.length; i++) {
//         // allCardText[i].style.fontSize = fontsize+'px';
//         itemFontChange(allCardText[i]);
//     }
//     let spans = document.getElementsByClassName('badge');
//     for (let i = 0; i < spans.length; i++)
//         spans[i].style.fontSize = fontsize+'px';
// }

// login functions
function displayLogin(){
    document.getElementById('loginModal').style.display='block';
    console.log("displayLogin")
}

function closeLogin(){
    document.getElementById('loginModal').style.display='none';
    console.log("closeLogin")
}