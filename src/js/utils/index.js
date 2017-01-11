export function formatDate(date) {
  if (!date) return null;

  let dateToFormat = new Date(date);
  let slicedDate = dateToFormat.toISOString().slice(0,10);
  let splitDate = slicedDate.split('-');
  let formattedDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;

  return formattedDate;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function formatPrettyDate(date) {
  if (!date) return null;

  let dateToFormat = new Date(date);
  let slicedDate = dateToFormat.toISOString().slice(0,10);
  let splitDate = slicedDate.split('-');
  let formattedDate = `${monthNames[dateToFormat.getMonth()]} ${splitDate[2]}, ${splitDate[0]}`;

  return formattedDate;
}

function combineArrays(arrays) {
  return Array.prototype.concat.apply([], arrays.map((array) => array));
}

// This combines and sorts community posts and tweets by date.
export function sortEntries(entriesToSort) {
  const entries = combineArrays(entriesToSort);

  entries.sort(function(a,b) {
    // Tweets use "created_at" while posts use "date"
    const aDate = a.created_at || a.date;
    const bDate = b.created_at || b.date;
    return new Date(bDate) - new Date(aDate);
  });

  return entries;
}

// This randomly adds elements to an array after a given index.
export function disperseElements(array, objectsToAdd, afterIndex) {
  const max = array.length;
  const min = afterIndex + 1;
  let dispersedArray = array.slice(0);

  objectsToAdd.map((item, index) => {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    dispersedArray.splice(randomIndex, 0, item);
  });

  return dispersedArray;
}

// Twitter ID integers are too large for javascript to compute without data loss.
// https://webapplog.com/decreasing-64-bit-tweet-id-in-javascript
export function decStrNum (n) {
  n = n.toString();
  let result = n;
  let i = n.length-1;
  
  while (i > -1) {
    if (n[i] === "0") {
      result = `${result.substring(0,i)}9${result.substring(i+1)}`;
      i --;
    } else {
      result = `${result.substring(0,i)}${(parseInt(n[i],10)-1).toString()}${result.substring(i+1)}`;
      return result;
    }
  }

  return result;
}

export function truncateString(string) {
  let newString = string.match(/^.{0,90}[\S]*/);
  const stringLength = newString[0].length;
  newString = newString[0].replace(/\s$/,'');
  if(stringLength < string.length)
    newString = newString + "...";
  return newString;
}

export function getYears () {
  const today = new Date();
  const numYears = today.getFullYear() - 1989;
  return Array.from({length: numYears}, (v, k) => today.getFullYear() - k);
}

export function isImage(path) {
  return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(path);
}
