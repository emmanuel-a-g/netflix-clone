export function divideListEquallyBy(list, desired) {
  // pluck?;)
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
