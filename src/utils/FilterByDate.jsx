// This function will filter the data by date
export const FilterByDate = (data, date) => {
    const filteredData = data?.filter((item) => {
        const itemDate = new Date(item.start_time).getDate(); 
        const selectedDate = new Date(date).getDate();

        return itemDate === selectedDate;
    });

    return filteredData;
};