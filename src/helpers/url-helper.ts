//const removeLastDirectoryPartOfUrl = (url) => {
const removeLastDirectoryPartOfUrl = (url: string) => {
  const urlArray: Array<string> = url.split('/');
  urlArray.pop();
  return (urlArray.join('/'));
};

//module.exports = { removeLastDirectoryPartOfUrl };
export { removeLastDirectoryPartOfUrl };
