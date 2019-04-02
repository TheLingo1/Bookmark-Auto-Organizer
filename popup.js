var numIndex;

function setIndex(){
    numIndex = document.getElementById("numberInput").value;
    chrome.storage.local.set({key: numIndex}, function(){
        console.log("number stored")});

    
    }

    

document.getElementById('do-setindex').onclick = setIndex;

