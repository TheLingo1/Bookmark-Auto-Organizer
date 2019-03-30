var visitedURLs = [];
bookmarkBar = [];
bookmarkBarIds = [];
bookmarkBarUrls = [];
arrayWithFolder = [];

function listBookmarkTree() {
  chrome.bookmarks.getTree(
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  );
}

function listBookmarkBarChildren() {
  chrome.bookmarks.getChildren(
    "1",
    function(bookmarkArray) {
      console.log(bookmarkArray);
      bookmarkBar = bookmarkArray;
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
