// More work is required to make this an ES6 file
// (i.e. a webpack entry point for the worker/subprocess)
// See https://github.com/chentsulin/electron-react-boilerplate/issues/1043#issuecomment-312514802
// "A better solution is to create a webpack entry point..."

function slowdown() {
  console.log('Starting slow stuff');
  for (var i = 0; i < 500000; i++) {
    const x = {
      y:
          Math.ceil(i) +
            'sdsfjdlfjlkMNFONnsdno'.slice(4, (Math.random() * 20) | 0)
    };
    eval('(' + JSON.stringify(x) + ')');
  }
  console.log('Finishing slow stuff');
}

module.exports = slowdown();
