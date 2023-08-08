var scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;

function flushPromises() {
  return new Promise(function (resolve) {
    scheduler(resolve);
  });
}

export default flushPromises