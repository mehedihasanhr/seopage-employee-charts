// // create labels
// const createLabels = ({ isSameDate, time }) => {
//   const s = new Date(time[0]).getTime();
//   const e = new Date(time[1]).getTime();

//   let l = [];
//   let lim = isSameDate ? 3 : 60;

//   for (let i = s; i <= e; i += 1000 * 60 * lim) {
//     const t = new Date(i);
//     l.push(t);
//   }

//   return l;
// };

// const cb = (d, t) => {
//   if (d.end_time === null) return true;
//   if (new Date(d.end_time).getTime() >= t.getTime()) {
//     return true;
//   }
//   return false;
// };

// // filter data by label
// const FilterDataByLabels = (_data, labels) => {
//   console.log({ _data });
//   let newData = [];
//   console.log(labels);
//   labels.map((l, i) => {
//     let d = _data.filter((f) => {
//       console.log(new Date(f.end_time).getTime());
//       console.log(new Date(l).getTime());
//       if (
//         new Date(f.end_time).getTime() >= new Date(l).getTime()
//         // new Date(f.start_time).getTime() <= new Date(l).getTime()
//       ) {
//         console.log(`true`);
//         return true;
//       } else if (f.end_time === null) {
//         return true;
//       }
//       return false;
//     });
//     return newData.push(d.length);
//   });

//   return newData;
// };

// export const FilterDataByTimeRange = (data, time) => {
//   let filteredData = { current: null, yesterday: null };
//   const s = new Date(time[0]);
//   const e = new Date(time[1]);

//   // * check the date is not same
//   const isSameDate = s.getDate() === e.getDate();
//   // if date is same in time range then
//   // get today and yesterday data
//   if (isSameDate) {
//     // code goes to here...
//     const todayData = data.filter((d) => cb(d, s)); // get current data
//     const y = new Date(s).setDate(new Date(s).getDate() - 2);

//     let yesterday = data.filter((d) => cb(d, new Date(y))); // get yesterday data

//     let l = createLabels({ isSameDate, time }); // create labels
//     let f = FilterDataByLabels(todayData, l); // filter by labels
//     console.log({ yesterday });
//     let pre = FilterDataByLabels(yesterday, l); // filter yesterday data by label

//     console.log(pre);
//     l = l.map((m) => ({
//       hm: `${new Date(m).getHours()}:${new Date(m).getMinutes()}`,
//       full: m,
//     })); // convert labels to HH:MM

//     filteredData = {
//       labels: l,
//       current: f,
//       yesterday: pre,
//     };
//   } else {
//     // if not then collect only ranged date
//     // console.log(data);
//     let newData = data.filter((d) => cb(d, s));

//     let l = createLabels({ isSameDate, time });

//     let f = FilterDataByLabels(newData, l);

//     console.log({ dayrange: newData });

//     l = l.map((m) => ({
//       hm: `${new Date(m).getHours()}:${new Date(m).getMinutes()}`,
//       full: m,
//     }));

//     filteredData = {
//       labels: l,
//       current: f,
//       yesterday: null,
//     };
//   }

//   return filteredData;
// };

// create labels
const createLabels = (isSameDate, time) => {
  const s = new Date(time[0]).getTime();
  const e = new Date(time[1]).getTime();

  let l = [];
  let lim = isSameDate ? 3 : 60;

  for (let i = s; i <= e; i += 1000 * 60 * lim) {
    const t = new Date(i);
    l.push(t);
  }
  return l;
};

//create graph data for current
const graphPrevData = (data, labels) => {
  let newData = [];
  labels.map((l) => {
    let filtered = data.filter((f) => {
      if (f.end_time === null) {
        return true;
      } else if (
        new Date(f.end_time).getTime() >=
        new Date(l).setDate(new Date(l).getDate() - 1)
      ) {
        console.log('true asd');
        return true;
      } else return false;
    });

    return newData.push(filtered.length);
  });

  return newData;
};

//create graph data for current
const graphCurrentData = (data, labels) => {
  let newData = [];
  labels.map((l) => {
    let filtered = data.filter((f) => {
      if (f.end_time === null) return true;
      if (new Date(f.end_time).getTime() >= new Date(l).getTime()) {
        return true;
      }

      return false;
    });

    return newData.push(filtered.length);
  });

  return newData;
};

// get prev Data
const previousData = (data, time, labels) => {
  const s = new Date(time[0]);
  const e = new Date(time[1]);
  let ps = new Date(s).setDate(new Date(s).getDate() - 1);
  let pe = new Date(e).setDate(new Date(e).getDate() - 1);

  console.log({ ps });

  let fd = data.filter((d) => {
    if (d.end_time === null) return true;
    if (new Date(d.end_time).getTime() >= ps) {
      return true;
    }

    return false;
  });

  console.log({ fd });
  return graphPrevData(fd, labels);
};

// get current data

const getCurrentData = (data, time, labels) => {
  const s = new Date(time[0]);
  const e = new Date(time[1]);

  let fd = data.filter((d) => {
    if (d.end_time === null) return true;
    if (new Date(d.end_time).getTime() > s) return true;

    return false;
  });

  return graphCurrentData(fd, labels);
};

export function FilterDataByTimeRange(data, time) {
  const s = new Date(time[0]);
  const e = new Date(time[1]);
  const isSameDate = s.getDate() === e.getDate();
  console.log(isSameDate);
  const labels = createLabels(isSameDate, time);

  let prev = previousData(data, time, labels);
  let curr = getCurrentData(data, time, labels);

  console.log({ prev, curr });
  let l = labels.map((m) => ({
    hm: `${new Date(m).getHours()}:${new Date(m).getMinutes()}`,
    full: m,
  }));

  return {
    current: curr,
    labels: l,
    yesterday: prev,
  };
}
