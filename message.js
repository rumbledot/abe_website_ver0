var synth = window.speechSynthesis;
var utter = new SpeechSynthesisUtterance();
var speechspeed = 1;

// var el = document.getElementById('vmContent');
// var fontsize =window.getComputedStyle(el, null).getPropertyValue('font-size');
// fontsize = parseFloat(fontsize);
fontsize =20;
minFontSize = '15px';
maxFontSize = '60px';

var msgStatus = "";
var statuses = ["draft", "published", "archive" ];

var clubs = [];

// class Message {
//     constructor(id, title, description, content, status){
//         this.id = id;
//         this.title = title;
//         this.description = description;
//         this.content = content;
//         this.status = status;
//         this.msgClubs = [];
//     }

//     addClubs(clubs){
//         this.msgClubs = clubs;
//     }

//     getAll() {
//         console.log("message");
//         console.log(this.id);
//         console.log(this.title);
//         console.log(this.description);
//         console.log(this.content);
//         console.log(this.status);
//         console.log(this.msgClubs.length);
//     }
// }

$(document).ready(function() {

    if(document.getElementById('msgStatus') ==null){
        let id = document.getElementById('msgNum').innerHTML;
        let imagediv = document.getElementById('vmImage');
        imagediv.innerHTML='';
        let cardTheImageDiv = document.createElement('img');
                cardTheImageDiv.setAttribute('class', 'card-img');
                cardTheImageDiv.setAttribute('src', 'empty-image.png');
                // cardTheImageDiv.setAttribute('style', 'width:13vw; margin:1vw');
                imagediv.appendChild(cardTheImageDiv);

                $.ajax({
                    url:'./processMessage.php',
                    method:'post',
                    data: {
                        loadImage : id
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

    }else{
    let id = document.getElementById('msgNum').innerHTML;
    let status = document.getElementById('msgStatus').innerHTML;
    console.log("Status=".status)
    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            getMessageClub : id
        },
        success: function(res) {
            clubs = JSON.parse(res);

            if(clubs.length > 0) {
                for (let j = 0; j < clubs.length; j++) {
                    clubsDiv = document.getElementById('vmClubs');
                    let spanClub = document.createElement('span');
                    spanClub.setAttribute('class', 'badge badge-primary');
                    spanClub.innerHTML = clubs[j];
                    clubsDiv.appendChild(spanClub);
                }
            }
        }
    });
    
    if (status===null || status==="") {
        status = "draft";
    }

    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            loadImage : id
        },
            success: function(data1) {
            data=JSON.parse(data1);
            let output = document.getElementById('output');
                        if (data != 0) {
                        output.setAttribute('src', 'upload/' + data[1]);
                        output.setAttribute('alt', data[0]);
                        }
                    }
    });
    
    updateStatus(status);
}
});


function updateStatus(status) {
    msgStatus = status;
    console.log(status);
    let statusesDiv = document.getElementById('selectStatus');
    if(statusesDiv!=null){
    statusesDiv.innerHTML="";
    document.getElementById('dropdownStatusButton').innerHTML = status;
    
    for (let i = 0; i < statuses.length; i++) {
        let dropDownItem = document.createElement('a');
        if (statuses[i].localeCompare(msgStatus)) {
            dropDownItem.setAttribute('class', 'dropdown-item active');
        } else {
            dropDownItem.setAttribute('class', 'dropdown-item');
        }
        dropDownItem.setAttribute('onclick', 'updateStatus("' + statuses[i] + '")');
        dropDownItem.innerText = statuses[i];
        statusesDiv.appendChild(dropDownItem);
    }
}
}

function updateMessage() {
    let id = document.getElementById('msgNum').innerHTML;
    let title = document.getElementById('vmHeader').value;
    // let description = document.getElementById('vmDescription').value;
    // let content = document.getElementById('vmContent').innerHTML;
    let content = nicEditors.findEditor('vmContent').getContent();
    let description = nicEditors.findEditor('vmDescription').getContent();
    if(description!=null && content !=null && id!=null && title !=null){
        let newMessage = new Message(id, title, description, content, msgStatus);

        newMessage.addClubs(clubs);
        newMessage.getAll();

        let tosent = JSON.stringify(newMessage);
        $.ajax({
            url:'processMessage.php',
            method:'POST',
            data: {
                updateMessage : tosent
            },
            success: function(res) {
                alert(res);
            }
        });

        document.getElementById('vmHeader').value = '';
        document.getElementById('vmDescription').value = '';
        document.getElementById('vmContent').innerHTML = '';
        clubs = [];

        window.location.href = './StaffDashboard.php';
    }
}

function saveMessage() {
    let id = document.getElementById('msgNum').innerHTML;
    let title = document.getElementById('vmHeader').value;
    let description = document.getElementById('vmDescription').value;
    // let content = document.getElementById('vmContent').innerHTML;
    let content = nicEditors.findEditor('vmContent').getContent();
    let newMessage = new Message(id, title, description, content, msgStatus);

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
            alert(res);
        }
    });

    document.getElementById('vmHeader').value = '';
    document.getElementById('vmDescription').value = '';
    document.getElementById('vmContent').value = '';
    clubs = [];
}

function stopTTS() {
    synth.cancel();
}

function textToSpeech() {
    var text0 = "Message title. " + document.getElementById('vmHeader').innerHTML;
    var text1 = ". Message description. " + document.getElementById('vmDescription').innerHTML;
    var text2 = ". Message content. " + document.getElementById('vmContent').innerHTML;
    var text = text0 + text1 + text2;

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

function fontUp() {
    fontsize=fontsize+5
    if (fontsize > 60) fontsize = 60;
    // document.getElementById('vmHeader').style.fontSize = fontsize+'px';
    // itemFontChange(document.getElementById('vmHeader'));
    itemFontChange(document.getElementById('viewMessageCard'),1);
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
    itemFontChange(document.getElementById('viewMessageCard'),-1);
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
    if(currentSize<minFontSize) currentSize = minFontSize
    item.style.fontSize = (parseFloat(currentSize)+(5*change))+'px';
    console.log(currentSize);
    for (let i = 0; i < item.children.length; i++) {
        itemFontChange(item.children[i], change);
    }
} 

function backToIndex() {
    stopTTS();
    window.location.href="./index.php";
}

function backToDashboard() {
    window.location.href="./StaffDashboard.php";
}

let ttsBtn = document.getElementById('listen');

function allTTS(){
    if(ttsBtn.innerHTML.startsWith('Listen')) {
        textToSpeech();
        ttsBtn.innerHTML="Stop <i class=\"glyphicon glyphicon-volume-off\"></i>";
    }
    else if(ttsBtn.innerHTML.startsWith('Stop')){
        stopTTS();
        ttsBtn.innerHTML="Listen <i class=\"glyphicon glyphicon-volume-up\"></i>";
    }
    else{
        ttsBtn.innerHTML="Listen <i class=\"glyphicon glyphicon-volume-up\"></i>";
    }
}

let messageCard = document.getElementById('viewMessageCard');
// let content = document.getElementById('vmContent');
if(messageCard!=null){
itemFontChange(messageCard);}
// itemFontChange(content);