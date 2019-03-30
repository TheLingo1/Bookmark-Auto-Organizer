function listBookmarkTree() {
  chrome.bookmarks.getTree(
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  );
}

/* This function doesn't work
function listBookmarkBar() {
  chrome.bookmarks.get(
    1,
    function(bookmarkArray) {
      console.log(bookmarkArray)
    }
  )
}
*/
