// module.exports = Object.freeze({
//   RECORD: 'record',
//   PLAY: 'play',
// });
interface MODESObj {
  RECORD: string,
  PLAY: string
};

const MODES: Readonly<MODESObj> = Object.freeze({
  RECORD: 'record',
  PLAY: 'play',
});

export { MODES };
