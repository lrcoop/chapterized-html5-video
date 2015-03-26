var chapters = {
      '0' : 'chapter-1',
      '5' : 'chapter-2',
      '10' : 'chapter-3',
      '15' : 'chapter-4',
      '20' : 'chapter-5'
    },
    chapterKeys = Object.keys(chapters),
    currChapter = 0;

function next() {
  currChapter++;
  if (currChapter === chapterKeys.length) {
    currChapter = 0;
  }
  // Call something with chapterKeys[currChapter];
  console.log(chapters[chapterKeys[currChapter]]);
}

function prev() {
  currChapter--;
  if (currChapter < 0) {
    currChapter = chapterKeys.length - 1;
  }
  // Call something with chapterKeys[currChapter];
  console.log(chapters[chapterKeys[currChapter]]);
}