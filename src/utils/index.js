export function divideListEquallyBy(list, desired) {
  let result = [];
  let temp = [];
  let curr = 0;
  for (let x = 0; x <= list.length; x++) {
    if (curr < desired) {
      curr++;
      temp.push(list[x]);
    } else {
      result.push(temp);
      temp = [];
      curr = 0;
      curr++;
      temp.push(list[x]);
    }
  }
  return result;
}
