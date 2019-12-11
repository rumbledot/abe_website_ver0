$(document).ready(function() {

// -----------------------Submit and save message to DB--------------------------//
displayMessages();

});

$('#viewMessage').on('show.bs.modal', function(e) {
});

function displayMessages() {
    let ids = [];
    let titles = [];
    let descriptions = [];
    let contents = [];
    let timestamps = [];
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
            contents = data.content;
            timestamps = data.timestamp;
                    
            var div = document.getElementById('messagesDiv');

            for (let i = 0; i < titles.length; i++) {
                let messageDiv = document.createElement('div'); 
                messageDiv.setAttribute('class', 'card');
                div.appendChild(messageDiv);

                let titleDiv = document.createElement('h4');
                titleDiv.setAttribute('class','card-header');
                messageDiv.appendChild(titleDiv);

                let bodyDiv = document.createElement('div');
                bodyDiv.setAttribute('class','card-body');
                messageDiv.appendChild(bodyDiv);

                let descriptionDiv = document.createElement('p');
                descriptionDiv.setAttribute('class','card-text');
                bodyDiv.appendChild(descriptionDiv);

                let timeStampDiv = document.createElement('p');
                timeStampDiv.setAttribute('class','card-footer');
                bodyDiv.appendChild(timeStampDiv);

                let viewButton = document.createElement('button');
                viewButton.setAttribute('id', ids[i]);
                viewButton.setAttribute('class', 'viewButton');
                viewButton.setAttribute('class', 'btn btn-primary btn-sm submitorder');
                viewButton.setAttribute('data-toggle', 'modal');
                viewButton.setAttribute('data-target', '#viewMessage');
                viewButton.style.margin = '0';
                viewButton.style.display = 'inline-block';
                viewButton.innerHTML = 'view';
                bodyDiv.appendChild(viewButton);

                viewButton.addEventListener('click', function() {
                    let vmHeader = document.getElementById('vmHeader');
                    vmHeader.innerHTML = titles[i];

                    let vmDescription = document.getElementById('vmDescription');
                    vmDescription.innerHTML = descriptions[i];

                    let vmTS = document.getElementById('vmTimestamp');
                    vmTS.innerHTML = timestamps[i];

                    let vmContent = document.getElementById('vmContent');
                    vmContent.innerHTML = contents[i];
                });

                titleDiv.innerHTML = titles[i];
                descriptionDiv.innerHTML = descriptions[i];
                timeStampDiv.innerHTML = "Created at " + timestamps[i];
            }
        }
    });
}

