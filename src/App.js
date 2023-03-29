import React from 'react';
import './App.css';
import { Charts } from './components/Charts';
import { countActiveEmployee } from './utils/CountActiveEmployee';
import { FilterByDate } from './utils/FilterByDate';
import { FilterByHourRange } from './utils/FilterByHourRange';

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [graphData, setGraphData] = React.useState(null);
  const [labels, setLabels] = React.useState([]);
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [hours, setHours] = React.useState({
    start: 8,
    end: 17,
  });

  React.useEffect(() => {
    (async () => {
      const response = await fetch('https://seopage1erp.website/api/projecttimelogs');
      const { data } = await response.json();
      setData([...data]);
      setLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    if (!data.length) return;
    const filteredData = FilterByDate(data, date);
    console.log({ filteredData });
    const PrevFilteredData = FilterByDate(data, new Date(date).setDate(new Date(date).getDate() - 1));
    console.log({ PrevFilteredData });
    createLabels(hours.start, hours.end);

    const filterHours = FilterByHourRange(filteredData, hours.start, hours.end);
    console.log({ filterHours });
    const prevFilterHours = FilterByHourRange(PrevFilteredData, hours.start, hours.end);
    console.log({ prevFilterHours });

    // * filter by minutes
    const todayActiveEmployee = countActiveEmployee(filterHours, labels);
    console.log({ todayActiveEmployee });
    const yesterdayActiveEmployee = countActiveEmployee(prevFilterHours, labels);
    console.log({ yesterdayActiveEmployee });

    console.log({
      todayActiveEmployee,
      yesterdayActiveEmployee,
    });

    console.log({ data });
    if (todayActiveEmployee.length && yesterdayActiveEmployee.length) {
      setGraphData({
        labels,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            data: todayActiveEmployee,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Yesterday',
            fill: 'start',
            data: yesterdayActiveEmployee,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, date, hours]);

  // create labels for x axis
  const createLabels = (start, end) => {
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
        if (start === new Date().getHours()) break;
        if (i * 20 === 60) {
          start++;
          i = 0;
        }
        labels.push(start + ':' + i * 20);
      }
    }
    setLabels(labels);
  };

  // handle select change
  const handleSelectChange = (e) => {
    setDate(new Date().toISOString().slice(0, 10));
    const hour = e.target.value;
    let d = new Date().getHours();
    let start = d - hour;
    let end = d;
    setHours({ start, end });
    createLabels(start, end);
  };

  /**
   * 1. handle date change
   * 2. reset hours range to start from 8 to 17
   */

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setHours({
      start: 8,
      end: 17,
    });

    createLabels(8, 17);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <input type="date" value={date} onChange={handleDateChange} />

      <select name="hours" id="hours" onChange={handleSelectChange}>
        <option value="1">Last 1h</option>
        <option value="2">Last 2h</option>
        <option value="3">Last 3h</option>
        <option value="4">Last 4h</option>
        <option value="5">Last 5h</option>
      </select>
      {graphData ? <Charts data={graphData} /> : <h1>No data</h1>}
    </div>
  );
}

export default App;
