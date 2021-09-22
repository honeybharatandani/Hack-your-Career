function pullDate(arr) {
  let date = [];
  for (let a in arr) {
    var ob = arr[a];

    let create_date = ob.createdAt.split("T", 1);
    date.push(create_date);
  }
  return date.flat();
}

// console.log(pullDate(orders));

function pullMonth(arr) {
  let dateArr = pullDate(arr);

  let month = [];

  dateArr.map((x) => month.push(parseInt(x.slice(5, 7))));
  return month;
}

export const dataPoint = (arr) => {
  let output = [];
  let final_arr = pullMonth(arr);

  let freqCounter = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };

  for (let val of final_arr) {
    freqCounter[val] = freqCounter[val] ? freqCounter[val] + 1 : 1;
  }

  for (let i in freqCounter) {
    output.push(freqCounter[i]);
  }

  return output;
};
