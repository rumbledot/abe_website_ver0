$(document).ready(function() {

// -----------------------Submit and save message to DB--------------------------//
displayMessages();

});

function backToIndex() {
    window.location.href = "./index.php";
}

function displayMessages() {
    let ids = [];
    let titles = [];
    let descriptions = [];
    let timestamps = [];
    let statuses = [];
    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            displayMessages : 1
        },
        success: function(data1) {
            data = JSON.parse(data1);
            
            ids = data.id;
            titles = data.title;
            descriptions = data.description;
            timestamps = data.timestamp;
            statuses = data.status;
                    
            var div = document.getElementById('messagesDivStaff');

            for (let i = 0; i < titles.length; i++) {
                let messageDivStaff = document.createElement('div'); 
                messageDivStaff.setAttribute('class', 'card');
                messageDivStaff.setAttribute('id', 'messageCard');
                div.appendChild(messageDivStaff);

                let titleDiv = document.createElement('h4');
                titleDiv.setAttribute('class','card-header');
                titleDiv.setAttribute('id','messageCardHeader');
                messageDivStaff.appendChild(titleDiv);

                let bodyDiv = document.createElement('div');
                bodyDiv.setAttribute('class','card-body');
                bodyDiv.setAttribute('id','messageCardBody');
                messageDivStaff.appendChild(bodyDiv);

                let descriptionDiv = document.createElement('p');
                descriptionDiv.setAttribute('class','card-text');
                bodyDiv.appendChild(descriptionDiv);

                let timeStampDiv = document.createElement('p');
                timeStampDiv.setAttribute('class','card-footer');
                timeStampDiv.setAttribute('id','messageCardFooter');
                bodyDiv.appendChild(timeStampDiv);

                let editButton = document.createElement('button');
                editButton.setAttribute('class', 'viewButton');
                editButton.setAttribute('class', 'btn btn-lg btn-info');
                editButton.style.zIndex = '5';
                editButton.style.margin = '0';
                editButton.style.display = 'inline-block';
                editButton.innerHTML = 'Edit';
                bodyDiv.appendChild(editButton);

                let archButton = document.createElement('button');
                archButton.setAttribute('class', 'viewButton');
                archButton.setAttribute('class', 'btn btn-dark btn-lg');
                archButton.style.zIndex = '5';
                archButton.style.margin = '0';
                archButton.style.display = 'inline-block';
                archButton.innerHTML = 'Archive';
                bodyDiv.appendChild(archButton);

                let deleteButton = document.createElement('button');
                deleteButton.setAttribute('class', 'viewButton');
                deleteButton.setAttribute('class', 'btn btn-primary btn-lg');
                deleteButton.setAttribute('data-toggle', 'modal');
                deleteButton.setAttribute('data-target', '#viewModal');
                deleteButton.style.zIndex = '5';
                deleteButton.style.margin = '0';
                deleteButton.style.display = 'inline-block';
                deleteButton.innerHTML = 'Delete';
                bodyDiv.appendChild(deleteButton);

                if (statuses[i]===null || statuses[i]==="") statuses[i] = "draft";
                titleDiv.innerHTML = titles[i] + " (" + statuses[i] + ")";
                descriptionDiv.innerHTML = descriptions[i];
                timeStampDiv.innerHTML = "Created at " + timestamps[i];

                editButton.addEventListener('click', function() {
                    editMessage(ids[i]);
                });

                archButton.addEventListener('click',function() {
                    archieveMessage(ids[i]);
                });

                deleteButton.addEventListener('click', function() {
                    deleteMessage(ids[i]);
                });
            }
        }
    });
}

// CRUD operation
function createMessage() {
    window.location.href = "CreateMessage.php";
}

function editMessage(id) {
    window.location.href = "EditMessage.php?viewMessage="+id;
}

function archieveMessage(id) {
    $.ajax({
            url:'./processMessage.php',
            method:'post',
            data: {
                archiveMessage : id
            },
            success: function() {
                var div = document.getElementById('messagesDivv');
                div.innerHTML='';
                displayMessages();
            }
        });
}

function deleteMessage(id) {
    var idToDelete = id;
    let confirmDeleteBtnDiv = document.getElementById('vmButtons');
    confirmDeleteBtnDiv.innerHTML="";

    let cancelDeleteBtn = document.createElement('button');
    cancelDeleteBtn.setAttribute('class','btn btn-primary btn-lg');
    cancelDeleteBtn.setAttribute('data-dismiss','modal');
    cancelDeleteBtn.innerHTML = "Cancel";
    confirmDeleteBtnDiv.appendChild(cancelDeleteBtn);

    let confirmDeleteBtn = document.createElement('button');
    confirmDeleteBtn.setAttribute('class','btn btn-danger btn-lg');
    confirmDeleteBtn.setAttribute('data-dismiss','modal');
    confirmDeleteBtn.innerHTML = "Delete!";
    confirmDeleteBtnDiv.appendChild(confirmDeleteBtn);

    confirmDeleteBtn.addEventListener('click', function() {
        $.ajax({
            url:'./processMessage.php',
            method:'post',
            data: {
                deleteMessage : idToDelete
            },
            success: function() {
                var div = document.getElementById('messagesDivStaff');
                div.innerHTML='';
                displayMessages();
            }
        });
    });


}