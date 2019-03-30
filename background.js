var visitedURLs = [];
bookmarkBar = [];
bookmarkBarIds = [];
bookmarkBarUrls = [];
arrayWithFolder = [];
bar = chrome.bookmarks;

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
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.url) {
        if (bookmarkBarUrls.includes(tab.url)) {
            var Pos = bookmarkBarUrls.indexOf(tab.url)
            console.log("Yes! " + Pos)
        } else {
            console.log("No!")
        }
    }

    // bar.move("137", {index: 6})



});

bar.move("137", {index: 6});
