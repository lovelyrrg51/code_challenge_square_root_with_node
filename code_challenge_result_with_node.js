const BigNumber = require('bignumber.js');
const maxLen = 21;

function checkSqrtValueInteger(numValue) {
  const bigNumValue = new BigNumber(numValue, 16);
  const sqrtValue = bigNumValue.sqrt();

  return sqrtValue.isInteger();
}

function getMinSqrt(from, to, numStr) {
  if (checkSqrtValueInteger(numStr.substring(from, to)) === true) {
    return 1;
  }

  // Check if it has only one.
  if (to === from + 1) {
    return -1;
  }

  let minSqrtValue = maxLen;
  for (let i = from + 1; i < to; i ++) {
    // check left substring value.
    const leftValue = getMinSqrt(from, i, numStr);
    if (leftValue === -1) {
      continue;
    }
    // check right substring value.
    const rightValue = getMinSqrt(i, to, numStr);
    if (rightValue === -1) {
      continue;
    }

    // Update min split count
    minSqrtValue = (leftValue + rightValue) < minSqrtValue ? (leftValue + rightValue) : minSqrtValue;
  }

  if (minSqrtValue === maxLen) {
    return -1;
  }
  return minSqrtValue;
}

function getMinSqrtOptimized (hexStr, length) {
  let resArray = new Array(length);

  for (let i = 0; i < resArray.length; i++) {
    resArray[i] = new Array(length);
  }

  for (let i = 0; i < length; i ++)
    for (let j = 0; j < length; j ++)
      resArray[i][j] = -1;

  for (let i = 0; i < length; i ++) {
    for (let j = 0; i + j < length; j ++) {
      if (checkSqrtValueInteger(hexStr.substring(j, j + i + 1)) === true) {
        resArray[i][j] = 1;
      } else {
        let minValue = maxLen;
        for (let k = j; k < j + i; k ++) {
          if (resArray[k - j][j] === -1 || resArray[i - (k - j) - 1][k + 1] === -1) {
            continue;
          }
          minValue = Math.min(minValue, resArray[k - j][j] + resArray[i - (k - j) - 1][k + 1])
        }
        resArray[i][j] = minValue === maxLen ? -1 : minValue;
      }
    }
  }

  return resArray[length - 1][0];
}

function getMin (s) {
  const length = s.length;
//  return getMinSqrt(0, length, s);
  return getMinSqrtOptimized (s, length);
}

console.log(getMin('896bb1'));
