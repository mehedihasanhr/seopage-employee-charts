// create labels for x axis
export const createLabels = (start, end) => {
  const labels = [];

  /*
   ** if start is 0 and end is 1 then create labels for each 3 minute
   ** else create labels for 20 minutes
   */

  if (end - start === 1) {
    for (let i = 0; i <= 20; i++) {
      if (i * 3 === 60) {
        labels.push(new Date().getHours() + ':00');
      } else {
        labels.push(start + ':' + i * 3);
      }
    }
  } else {
    // convert end - start hours to minutes
    const minutes = (end - start) * 60;
    // create labels for each 20 minutes
    for (let i = 0; i <= minutes / 20; i++) {
      if (start === end) break;
      if (i * 20 === 60) {
        start++;
        i = 0;
      }
      labels.push(start + ':' + i * 20);
    }
  }
  return labels;
};
