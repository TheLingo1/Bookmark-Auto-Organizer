var numIndex;

function setIndex(){
    numIndex = document.getElementById("numberInput").value;
    chrome.storage.sync.set({key: numIndex}, function(){
        console.log("number stored")});

    }


window.onload = function() {
  chrome.storage.sync.get('key', function(results) {
    document.getElementById('numberInput').value = results.key;
  });
};

document.getElementById('do-setindex').onclick = setIndex;
