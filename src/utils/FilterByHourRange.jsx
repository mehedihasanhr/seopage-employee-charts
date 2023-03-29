export const FilterByHourRange = (filteredData, start, end) => {
    // * filter if end_time is null or greater than end hour
    const filteredByHour = filteredData?.filter((item) => {
      if(!item.end_time) return true;
      const endHour = new Date(item.end_time).getHours();
      return endHour >= start
    });
    return filteredByHour;
  }