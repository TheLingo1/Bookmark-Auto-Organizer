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
    1,
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


console.log("listing bookmarks: " );
chrome.bookmarks.getTree( process_bookmark );
