function randInt(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

function randIntExcl(minimum, maximum) {
  return randInt(minimum, maximum - 1);
}
