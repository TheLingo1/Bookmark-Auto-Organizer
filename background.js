var visitedURLs = [];

function listBookmarkTree() {
  chrome.bookmarks.getTree(
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  );
}

// This function doesn't work
function listBookmarkBar() {
  chrome.bookmarks.get(
    0,
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  )
}


function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            console.log("bookmark: " + bookmark.url);
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
      if(node.url) { console.log(node.url); }
  }
}
