const random = (max) => Math.ceil(Math.random() * (max || 100));
const dice = () => random(6);
const trait = () => dice() + dice() + dice();
const positive = (input) =>  Math.ceil(Math.abs(input));
const randomPosOrNeg = (max) => (Math.random() < 0.5 ? -1 : 1) * random(max);

// Return the distance from point "a" to point "b".
const distance = (a, b) => Math.sqrt(
  Math.pow((b[0] - a[0]), 2)
  + Math.pow((b[1] - a[1]), 2)
  + Math.pow((b[2] - a[2]), 2)
);

// Return new x, y, and z co-ordinates for point "a" in order to get
// closer to point "b" by a given reduction of distance "r".
const reducedDistance = (a, b, r) => {
  return [
    Math.floor(a[0] + ((b[0] - a[0]) * r)),
    Math.floor(a[1] + ((b[1] - a[1]) * r)),
    Math.floor(a[2] + ((b[2] - a[2]) * r))
  ];
};

const randomPosition = (size) => {
  const width = size[0];
  const height = size[1];
  const depth = size[2];

  return [
    Math.floor(random(width) - width / 2),
    Math.floor(random(height) - height / 2),
    Math.floor(random(depth) - depth / 2)
  ];
};

const highestTick = (ticks) => Math.max(...ticks.map(tick => tick.id));

const randomTick = (ticks, max = 10) => (!ticks || ticks.length === 0) ?
    random(max)
    : highestTick(ticks) + random(max);

const deepCopy = (input) => JSON.parse(JSON.stringify(input));

module.exports = {
  random,
  dice,
  trait,
  positive,
  randomPosOrNeg,
  distance,
  reducedDistance,
  randomPosition,
  highestTick,
  randomTick,
  deepCopy  
};
