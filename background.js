var visitedURLs = [];
bookmarkBar = [];
bookmarkBarIds = [];
bookmarkBarUrls = [];
arrayWithFolder = [];
bar = chrome.bookmarks;

var protectedBookmarksS;
var protectedBookmarksI;

chrome.runtime.onInstalled.addListener(function() {


  if (typeof protectedBookmarksI === "undefined") {

    protectedBookmarksI = 1

 }


});

function SetProtBookmarks() {

  chrome.storage.sync.get('key', function(results) {
    protectedBookmarksS = results.key;
    protectedBookmarksI = parseInt(protectedBookmarksS, 10);
     console.log(results.key);});

}

chrome.storage.sync.get('key', function(results) {
  protectedBookmarksS = results.key;
  protectedBookmarksI = parseInt(protectedBookmarksS, 10);
   console.log(results.key);});

function listBookmarkTree() {
  bar.getTree(
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  );
}

function getBookmarkBarChildren() {
  bar.getChildren(
    "1",
    function(bookmarkArray) {
      //console.log(bookmarkArray);
      bookmarkBar = bookmarkArray;
      for (i = 0; i < bookmarkArray.length; i++) {
        bookmarkBarIds.push(bookmarkArray[i].id);
        bookmarkBarUrls.push(bookmarkArray[i].url);
      }
      //console.log(bookmarkBarIds);
      //console.log(bookmarkBarUrls);
    }
  )
}

function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
          arrayWithFolder.push(bookmark.url);
          console.log(bookmark.title + ": " + bookmark.url);
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}

function processBookmarks() {
  console.log("listing bookmarks: " );
  bar.getTree( process_bookmark );
}

function stackProcessNode() {
  bar.getTree(function(itemTree){
      itemTree.forEach(function(item){
          processNode(item);
      });
  });

  function processNode(node) {
      // recursively process child nodes
      if(node.children) {
        if (node.title = "Bookmarks Bar") {
          node.children.forEach(function(child) { processNode(child); });
        }
      }

      // print leaf nodes URLs to console
      if(node.url) {
        console.log(node.url);
      }
  }
}

// from https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
function move(array, oldIndex, newIndex) {
    if (newIndex >= array.length) {
        newIndex = array.length - 1;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
}

getBookmarkBarChildren(); // This gets all of the bookmarkTreeNodes in the Bookmark Bar, and saves them to an array, so that th

chrome.tabs.onCreated.addListener(function(tab){
    if (tab.url) {

        if (bookmarkBarUrls.includes(tab.url)) {



            var Pos = bookmarkBarUrls.indexOf(tab.url)
            console.log("Yes! " + Pos)
        } else {
            console.log("No!")
        }

    }
});

chrome.storage.onChanged.addListener(function(){

  SetProtBookmarks()

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var Pos;




    if (changeInfo.url) {

        if (bookmarkBarUrls.includes(tab.url)) {




            Pos = bookmarkBarUrls.indexOf(tab.url)
            console.log("Yes! " + Pos)
            console.log(bookmarkBarIds[Pos])
            if (Pos > protectedBookmarksI) {
              bar.move(bookmarkBarIds[Pos], {index: protectedBookmarksI});
              move(bookMarbBarIds, Pos, protectedBookmarksI);
              move(bookMarbBarUrls, Pos, protectedBookmarksI);
            } else {
              console.log("Bookmark in protected range")
            }


        } else {
            console.log("No!")
        }

    }
});

chrome.bookmarks.onCreated.addListener(function(bookmarkId, bookmark) {
  bookmarkBarIds.push(bookmarkId);
  bookmarkBarUrls.push(bookmark.url);
  bar.move(bookmarkId, {index: protectedBookmarksI})
});
