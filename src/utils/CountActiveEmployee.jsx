export const countActiveEmployee = (filteredData, labels) => {
  // console.log(filteredData, labels);
  const activeTime = [];
  labels.forEach((label, index) => {
    const filteredByHour = filteredData?.filter((item) => {
      const endHour = new Date(item.end_time).getHours();
      const endMinute = new Date(item.end_time).getMinutes();
      const itemEndTime = `${endHour}:${endMinute}`;

      if (!item.end_time) return true;

      // * count active time if end time is greater than label
      if (itemEndTime > label) {
        if (index === labels.length - 1) {
          return true;
        } else {
          const nextLabel = labels[index + 1];
          const [nextHour, nextMinute] = nextLabel.split(':');
          const nextItemEndTime = `${nextHour}:${nextMinute}`;
          return itemEndTime < nextItemEndTime;
        }
      }

      return false;
    });

    activeTime.push(filteredByHour.length);
  });
  return activeTime;
};
