import { useState, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import { FilterDataByTimeRange } from '../utils/FilterDataByTime';
import { timeCount } from '../utils/timeCount';
import { Charts } from './Charts';

const EmployeeChart = () => {
  const [data, setData] = useState([]); //* data
  const [date, setDate] = useState([]); // * filter date
  const [filterdData, setFilterdData] = useState([]);
  const [loading, setLoading] = useState(false);

  /***** Fetch Data *******/
  useEffect(() => {
    let d = timeCount(1);
    setDate(d);
    const unSubscribe = async () => {
      const response = await fetch(
        'https://seopage1erp.website/api/projecttimelogs',
      );
      const { data } = await response.json();
      // console.log(data);

      setData([...data]);
      setLoading(false);
    };
    unSubscribe();
    return () => unSubscribe();
  }, []);

  /*
   * **** Filter Data by date and time ****
   */
  const FilterData = () => {
    // ** filter by date and time
    if (data.length > 0 && date.length > 0) {
      const filteredData = FilterDataByTimeRange(data, date);
      setFilterdData(filteredData);
    }
  };

  // ** when data state change
  // ** filter data by range
  useEffect(() => {
    // console.log(data);
    FilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, date]);

  //* handle time range
  const handleDateRange = (value) => {
    if (!value) {
      let d = timeCount(1);
      setDate([...d]);
    } else setDate(value);
  };

  // * handle last hours pick
  const handleLastHours = (e) => {
    let d = timeCount(e.target.value);
    setDate([...d]);
  };

  // console.log(date);

  return (
    <div>
      <div className="flex items-center justify-between ">
        {/* <DateRangePicker
          format="yyyy-MM-dd hh:mm aa"
          onChange={handleDateRange}
          showMeridian
          defaultCalendarValue={[new Date(), new Date()]}
        /> */}

        {/* pick last hours */}
        <select onChange={handleLastHours} className="border border-gray-300 py-2 px-2 outline-none focus:border-blue-500">
          <option value="1">Last 1h</option>
          <option value="2">Last 2h</option>
          <option value="3">Last 3h</option>
          <option value="4">Last 4h</option>
          <option value="8">Last 8h</option>
          <option value="12">Last 12h</option>
          <option value="18">Last 18h</option>
          <option value="20">Last 20h</option>
          <option value="24">Last 1 Day </option>
          <option value="48">Last 2 Day</option>
          <option value="72">Last 3 Day</option>
          <option value="168">Last 7 Day</option>
        </select>
      </div>

      <div className="w-screen overflow-x-auto max-h-[550px]">
        <Charts data={filterdData} />
      </div>
    </div>
  );
};
export default EmployeeChart;
