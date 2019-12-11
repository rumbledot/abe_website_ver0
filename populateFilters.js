var ids = [];
var names = [];

function updateClubsDropDown(id) {
    let clubDropDownList = document.getElementById('selectClub');
    clubDropDownList.innerHTML = "";

    let clubDropDown = document.getElementById('dropdownClubs');
    clubDropDown.innerHTML = "Clubs by Region";

    // console.log(id);
    $.ajax({
        url:'./processMessage.php',
        method:'post',
        data: {
            getClubFromRegion : id
        },
        success: function(data) {
            let clubs = JSON.parse(data);
            // console.log(data);
            ids = clubs.id;
            names = clubs.name;

            for(let j = 0; j < ids.length; j++) {
                    console.log(ids[j]);
                    let dropDownItem = document.createElement('a');
                    dropDownItem.setAttribute('class', 'dropdown-item');
                    dropDownItem.setAttribute('onclick', 'selectClub("'+names[j]+'", ' + ids[j] + ')');
                    dropDownItem.innerText = names[j];
                    clubDropDownList.appendChild(dropDownItem);
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

function populateRegion() {
    let regionDropDown = document.getElementById('selectRegion');
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
                    // console.log(ids[j]);
                    let dropDownItem = document.createElement('a');
                    dropDownItem.setAttribute('class', 'dropdown-item');
                    dropDownItem.setAttribute('onclick', 'updateClubsDropDown(' + ids[j] + ')');
                    dropDownItem.innerText = names[j];
                    regionDropDown.appendChild(dropDownItem);
                }
            }
    });
}