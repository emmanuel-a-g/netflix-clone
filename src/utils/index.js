function divideListEquallyNoMix(list, desired) {
  //filter the blank ones
  list = list.filter(item => item !== "blank");
  let result = [];
  let temp = [];
  let currIdx = 0;
  let iterationTotal = Math.ceil(list.length / desired) * desired;
  for (let x = 0; x <= iterationTotal; x++) {
    let currentItem = x < list.length ? list[x] : "blank";
    if (currIdx < desired) {
      currIdx++;
      temp.push(currentItem);
    } else {
      result.push(temp);
      temp = [];
      currIdx = 0;
      currIdx++;
      temp.push(currentItem);
    }
  }
  return result;
}
export function combineNew(list, desired) {
  let result = [];
  for (let x = 0; x < list.length; x++) {
    let miniList = list[x];
    result = result.concat(miniList);
  }
  let divided = divideListEquallyNoMix(result, desired);
  return divided;
}

export function divideListEquallyBy(list, desired) {
  list = mixUpMovies(list);
  let result = [];
  let temp = [];
  let currIdx = 0;
  let iterationTotal = Math.ceil(list.length / desired) * desired;
  for (let x = 0; x <= iterationTotal; x++) {
    let currentItem = x < list.length ? list[x] : "blank";
    if (currIdx < desired) {
      currIdx++;
      temp.push(currentItem);
    } else {
      result.push(temp);
      temp = [];
      currIdx = 0;
      currIdx++;
      temp.push(currentItem);
    }
  }
  return result;
}

function mixUpMovies(list) {
  const mix = Math.floor(Math.random() * 5);
  if (mix === 0) {
    list.sort((a, b) =>
      a.genre !== b.genre ? (a.genre < b.genre ? -1 : 1) : 0
    );
  } else if (mix === 1) {
    list.sort((a, b) =>
      a.genre !== b.genre ? (a.genre < b.genre ? 1 : -1) : 0
    );
  } else if (mix === 2) {
    list.sort((a, b) =>
      a.title !== b.title ? (a.title < b.title ? 1 : -1) : 0
    );
  } else if (mix === 3) {
    list.sort((a, b) =>
      a.title !== b.title ? (a.title < b.title ? -1 : 1) : 0
    );
  } else {
    //do nothing
  }
  return list;
}
