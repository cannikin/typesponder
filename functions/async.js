// sample async/await function

exports.handler = async (event, context) => {

  // wait ms milliseconds
  function fetch(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async function loop() {
    await asyncForEach([1, 2], async num => {
      await fetch(500)
      console.log('done')
    })
  }

  await loop()

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foo: 'bar'})
  }
}
