// import React, { useEffect } from 'react';
// import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
// import { Charts } from './components/Charts';
// import { countActiveEmployee } from './utils/CountActiveEmployee';
// import { createLabels } from './utils/CreateGraphLabels';
// import { FilterByDate } from './utils/FilterByDate';
// import { FilterByHourRange } from './utils/FilterByHourRange';

import EmployeeChart from './components/EmployeeChart';

// function App() {
//   const [data, setData] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [graphData, setGraphData] = React.useState(null);
//   const [labels, setLabels] = React.useState([]);
//   const [date, setDate] = React.useState('');
//   const [dateRange, setDateRange] = React.useState(null);
//   const [hours, setHours] = React.useState({ start: 8, end: 17 });
//   const [activeData, setActiveData] = React.useState({
//     today: null,
//     yesterday: null,
//   });

//   React.useEffect(() => {
//     (async () => {
//       const response = await fetch(
//         'https://seopage1erp.website/api/projecttimelogs',
//       );
//       const { data } = await response.json();
//       console.log(data);
//       setData([...data]);
//       setLoading(false);
//     })();
//   }, []);

//   // filter all data
//   const FilterAllData = () => {
//     if (!data || !data.length) return;
//     const filteredData = FilterByDate(data, date);
//     const PrevFilteredData = FilterByDate(
//       data,
//       new Date(date).setDate(new Date(date).getDate() - 1),
//     );

//     let l = createLabels(hours.start, hours.end);
//     setLabels(l);

//     // * filter by minutes
//     const todayActiveEmployee = countActiveEmployee(
//       FilterByHourRange(filteredData, hours.start, hours.end),
//       labels,
//     );

//     const yesterdayActiveEmployee = countActiveEmployee(
//       FilterByHourRange(PrevFilteredData, hours.start, hours.end),
//       labels,
//     );

//     console.log({
//       todayActiveEmployee,
//       yesterdayActiveEmployee,
//     });

//     if (todayActiveEmployee.length && yesterdayActiveEmployee.length) {
//       setActiveData({
//         today: todayActiveEmployee,
//         yesterday: yesterdayActiveEmployee,
//       });
//     }
//   };

//   // set time when data change
//   React.useEffect(() => {
//     setDate(new Date().toISOString().slice(0, 10));
//     const start = new Date().getHours() - 1;
//     const end = new Date().getHours();

//     setHours({
//       start,
//       end,
//     });
//   }, [data]);

//   React.useEffect(() => {
//     FilterAllData();
//     // const l = createLabels()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [data, date, hours]);

//   useEffect(() => {
//     if (!activeData.today && !activeData.yesterday) return;

//     setGraphData({
//       labels,
//       datasets: [
//         {
//           label: 'Today',
//           fill: 'start',
//           data: activeData.today,
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//         },
//         {
//           label: 'Yesterday',
//           fill: 'start',
//           data: activeData.yesterday,
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         },
//       ],
//     });
//   }, [activeData, labels]);

//   // // create labels for x axis
//   // const createLabels = (start, end) => {
//   //   const labels = [];

//   //   /*
//   //    ** if start is 0 and end is 1 then create labels for each 3 minute
//   //    ** else create labels for 20 minutes
//   //    */

//   //   if (end - start === 1) {
//   //     for (let i = 0; i <= 20; i++) {
//   //       if (i * 3 === 60) {
//   //         labels.push(new Date().getHours() + ':00');
//   //       } else {
//   //         labels.push(start + ':' + i * 3);
//   //       }
//   //     }
//   //   } else {
//   //     // convert end - start hours to minutes
//   //     const minutes = (end - start) * 60;

//   //     // create labels for each 20 minutes
//   //     for (let i = 0; i <= minutes / 20; i++) {
//   //       if (start === new Date().getHours()) break;
//   //       if (i * 20 === 60) {
//   //         start++;
//   //         i = 0;
//   //       }
//   //       labels.push(start + ':' + i * 20);
//   //     }
//   //   }
//   //   setLabels(labels);
//   // };

//   // handle select change
//   const handleSelectChange = (e) => {
//     setDate(new Date().toISOString().slice(0, 10));
//     const hour = e.target.value;
//     let d = new Date().getHours();
//     let start = d - hour;
//     let end = d;
//     setHours({ start, end });
//     const l = createLabels(start, end);
//     setLabels(l);
//   };

//   /**
//    * 1. handle date change
//    * 2. reset hours range to start from 8 to 17
//    */

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//     const l = createLabels(8, 17);
//     setHours({
//       start: 8,
//       end: 17,
//     });

//     setLabels(l);
//   };

//   // handle datetime range
//   const handleDateTimeRange = (v) => {
//     if (!v || !v.length > 0) return;
//     const startTime = new Date(v[0]).getHours();
//     const endTime = new Date(v[1]).getHours();
//     const startDate = new Date(v[0]).getDate();
//     const endDate = new Date(v[0]).getDate();
//     setHours({
//       start: startTime,
//       endTime: endTime,
//     });

//     setData(startDate);
//     const l = createLabels(startTime, endTime);
//     setLabels([...l]);
//   };

//   if (loading) return <h1>Loading...</h1>;

//   return (
//     <div className="bg-red-5000">
//       <div className="flex items-center justify-center gap-3">
//         <div>
//           {/* <DateRangePicker
//             onChange={handleDateTimeRange}
//             format="yyyy-MM-dd hh:mm aa"
//             showMeridianformat="yyyy-MM-dd HH:mm:ss"
//             defaultCalendarValue={[
//               new Date('2022-02-01 00:00:00'),
//               new Date('2022-05-01 23:59:59'),
//             ]}
//           /> */}
//           <DateRangePicker
//             format="yyyy-MM-dd hh:mm aa"
//             onChange={handleDateTimeRange}
//             showMeridian
//             defaultCalendarValue={[
//               new Date('2022-02-01 00:00:00'),
//               new Date('2022-05-01 23:59:59'),
//             ]}
//           />
//         </div>
//         <input
//           type="date"
//           value={date}
//           onChange={handleDateChange}
//           className="px-3 py-2 border border-gray-300 hover:border-blue-500 focus:border-blue-500 rounded-md outline-none"
//         />

//         <select
//           name="hours"
//           id="hours"
//           onChange={handleSelectChange}
//           className="px-3 py-2 border border-gray-300 hover:border-blue-500 focus:border-blue-500 rounded-md outline-none"
//         >
//           <option value="1">Last 1h</option>
//           <option value="2">Last 2h</option>
//           <option value="3">Last 3h</option>
//           <option value="4">Last 4h</option>
//           <option value="5">Last 5h</option>
//         </select>

//         <div className="flex items-center gap-2 border border-gray-300 hover:border-blue-500 focus:border-blue-500 rounded-md outline-none">
//           <input
//             type="time"
//             className="py-2 px-3 border-0 outline-none border-r-1 rounded-md"
//           />
//           <input
//             type="time"
//             className="py-2 px-3 border-0 outline-none rounded-md"
//           />
//         </div>
//       </div>

//       <div className="max-h-[550px] w-screen relative flex items-center justify-center">
//         {graphData ? <Charts data={graphData} /> : <h1>No data</h1>}
//       </div>
//     </div>
//   );
// }

// export default App;

export default function App() {
  return <EmployeeChart />;
}
