var numIndex;

function setIndex(){
    numIndex = document.getElementById("numberInput").value;
    chrome.storage.sync.set({"key": numIndex}, function(obj){
        console.log(obj)});
    }