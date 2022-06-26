const str = "POST/users/list";
const patt1 = new RegExp('POST\/users$');
// const patt2 = /get\/[0-9]*\/list/
// console.log(patt1 + '\n' + patt2);
console.log(str.match(patt1));