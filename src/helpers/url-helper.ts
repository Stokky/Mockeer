//const removeLastDirectoryPartOfUrl = (url) => {
const removeLastDirectoryPartOfUrl = (url: string): string => {
  //const urlArray = url.split('/');
  const urlArray: string[] = url.split('/');
  urlArray.pop();
  return (urlArray.join('/'));
};

//module.exports = { removeLastDirectoryPartOfUrl };
export { removeLastDirectoryPartOfUrl };
