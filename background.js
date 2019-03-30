var visitedURLs = [];
bookmarkBar = [];
bookmarkBarIds = [];
bookmarkBarUrls = [];
arrayWithFolder = [];

//gets every node in bookmark tree
function listBookmarkTree() {
  chrome.bookmarks.getTree(
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  );
}

//gets the nodes in bookmark bar (folder and bookmarks)
function getBookmarkBarChildren() {
  chrome.bookmarks.getChildren(
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

//gets every bookmark in the whole tree (even inside folders)
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

//calls process_bookmark with chrome's bookmarks
function processBookmarks() {
  console.log("listing bookmarks: " );
  chrome.bookmarks.getTree( process_bookmark );
}


function stackProcessNode() {
  chrome.bookmarks.getTree(function(itemTree){
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
