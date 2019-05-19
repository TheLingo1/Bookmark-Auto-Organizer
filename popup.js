var numIndex;

function setIndex(){
    numIndex = document.getElementById("numberInput").value;
    chrome.storage.local.set({key: numIndex}, function(){
        console.log("number stored")});

    }


window.onload = function() {
  chrome.storage.local.get('key', function(results) {
    document.getElementById('numberInput').value = results.key;
  });
};

document.getElementById('do-setindex').onclick = setIndex;
