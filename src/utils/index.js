/* eslint-disable no-unreachable */
import { data, data2, heroMaterial } from "../store/data";
function divideListEquallyNoMix(list, desired) {
  //filter the blank ones
  list = list.filter((item) => item !== "blank");
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
  if (!desired) {
    return list;
  }
  let result = [];
  for (let x = 0; x < list.length; x++) {
    let miniList = list[x];
    result = result.concat(miniList);
  }
  let divided = divideListEquallyNoMix(result, desired);
  return divided;
}

export function divideListEquallyBy(list, desired) {
  if (!desired) {
    return list;
  }
  list = shuffle(list);
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

//Fisher–Yates Shuffle
function shuffle(movies) {
  let m = movies.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = movies[m];
    movies[m] = movies[i];
    movies[i] = t;
  }

  return movies;
}

// deprecated
// function mixUpMovies(list) {
//   const mix = Math.floor(Math.random() * 5);
//   if (mix === 0) {
//     list.sort((a, b) =>
//       a.genre !== b.genre ? (a.genre < b.genre ? -1 : 1) : 0
//     );
//   } else if (mix === 1) {
//     list.sort((a, b) =>
//       a.genre !== b.genre ? (a.genre < b.genre ? 1 : -1) : 0
//     );
//   } else if (mix === 2) {
//     list.sort((a, b) =>
//       a.title !== b.title ? (a.title < b.title ? 1 : -1) : 0
//     );
//   } else if (mix === 3) {
//     list.sort((a, b) =>
//       a.title !== b.title ? (a.title < b.title ? -1 : 1) : 0
//     );
//   } else {
//     //do nothing
//   }
//   return list;
// }

export function divide(list, desired) {
  if (!list || !list.length) {
    return list;
  }
  let result = [];
  let temp = [];
  let currIdx = 0;
  let total = list.length;
  let iterationTotal = Math.ceil(total / desired) * desired;
  for (let x = 0; x <= iterationTotal; x++) {
    let currentItem = x < total ? list[x] : "blank";
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

export function divideMylist(list, desired) {
  if (typeof desired !== "number") {
    return list;
  }
  let result = [];
  let temp = [];
  let currIdx = 0;
  let total = list.length;
  let iterationTotal = Math.ceil(total / desired) * desired;
  for (let x = 0; x <= iterationTotal; x++) {
    let currentItem = x < total ? list[x] : "blank";
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

export function searchMovie(search) {
  if (typeof search !== "string") {
    return;
  }
  const allMovies = data.concat(data2, heroMaterial);
  const lowerSearch = search.toLowerCase();

  const filtered = allMovies.filter((mov) => {
    return mov.title.toLowerCase().includes(lowerSearch);
  });
  return filtered;
}
