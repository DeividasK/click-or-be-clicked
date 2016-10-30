const shapesList = ['X','+','<', '>']; //'v','^',;

class Shape {

  shapesList() {
    return shapesList;
  }

  // Returns a random integer between min (included) and max (included)
  // Using Math.round() will give you a non-uniform distribution!
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomShape() {
    return shapesList[this.getRandomInt(0, shapesList.length)];
  }

  plusBlock(blockId, userColor) {
    let blocks = {};

    let topBlock = blockId - 6;
    if (topBlock > 0) blocks[topBlock] = userColor;

    let bottomBlock = blockId + 6;
    if (bottomBlock < 37) blocks[bottomBlock] = userColor;

    let leftBlock = blockId - 1;
    if (leftBlock % 6 !== 0) blocks[leftBlock] = userColor;

    let rightBlock = blockId + 1;
    if (rightBlock % 6 !== 1) blocks[rightBlock] = userColor;

    return blocks;
  }

  xBlock(blockId, userColor) {
    let blocks = {};

    let topLeftBlock = blockId - 7;
    if (topLeftBlock > 0 && topLeftBlock % 6 !== 0) blocks[topLeftBlock] = userColor;

    let topRightBlock = blockId - 5;
    if (topRightBlock > 0 && topRightBlock % 6 !== 1) blocks[topRightBlock] = userColor;

    let bottomLeftBlock = blockId + 5;
    if (bottomLeftBlock < 37 && bottomLeftBlock % 6 !== 0) blocks[bottomLeftBlock] = userColor;

    let bottomRightBlock = blockId + 7;
    if (bottomRightBlock < 37 && bottomRightBlock % 6 !== 1) blocks[bottomRightBlock] = userColor;

    return blocks;
  }

  rightBlock(blockId, userColor) {
    let blocks = {};

    let firstTopBlock = blockId - 7;
    if (firstTopBlock > 0 && firstTopBlock % 6 !== 0) blocks[firstTopBlock] = userColor;

    let secondTopBlock = blockId - 14;
    if (secondTopBlock > 0 && secondTopBlock % 6 !== 0 && secondTopBlock % 6 !== 5) blocks[secondTopBlock] = userColor;

    let firstBottomBlock = blockId + 5;
    if (firstBottomBlock < 37 && firstBottomBlock % 6 !== 0) blocks[firstBottomBlock] = userColor;

    let secondBottomBlock = blockId + 10;
    if (secondBottomBlock < 37 && secondBottomBlock % 6 !== 0 && secondBottomBlock % 6 !== 5) blocks[secondBottomBlock] = userColor;

    return blocks;
  }

  leftBlock(blockId, userColor) {
    let blocks = {};

    let firstTopBlock = blockId - 5;
    if (firstTopBlock > 0 && firstTopBlock % 6 !== 1) blocks[firstTopBlock] = userColor;

    let secondTopBlock = blockId - 10;
    if (secondTopBlock > 0 && secondTopBlock % 6 !== 1 && secondTopBlock % 6 !== 2) blocks[secondTopBlock] = userColor;

    let firstBottomBlock = blockId + 7;
    if (firstBottomBlock < 37 && firstBottomBlock % 6 !== 1) blocks[firstBottomBlock] = userColor;

    let secondBottomBlock = blockId + 14;
    if (secondBottomBlock < 37 && secondBottomBlock % 6 !== 1 && secondBottomBlock % 6 !== 2) blocks[secondBottomBlock] = userColor;

    return blocks;
  }
}

module.exports = new Shape();