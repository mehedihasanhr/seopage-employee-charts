import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export function Charts({ data }) {
  const [gData, setGData] = useState(null);

  useEffect(() => {
    let labels;

    labels = data?.labels?.map((l) => {
      const [h, m] = l.hm.split(':');
      if (Number(h) > 12) {
        return `${Number(h) - 12}:${m}PM`;
      } else return `${h}:${m}AM`;
    });

    if (data?.yesterday) {
      setGData({
        labels,
        datasets: [
          {
            label: 'Current',
            fill: 'start',
            data: data.current,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Yesterday',
            fill: 'start',
            data: data.yesterday,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });

      return;
    }

    setGData({
      labels,
      datasets: [
        {
          label: 'Current',
          fill: 'start',
          data: data.current,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        // {
        //   label: 'Yesterday',
        //   fill: 'start',
        //   data: data.yesterday,
        //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //   borderColor: 'rgba(54, 162, 235, 1)',
        //   borderWidth: 1,
        // },
      ],
    });
  }, [data]);

  const options = {
    responsive: true,
    interaction: {
      includeInvisible: true,
    },
    elements: {
      point: {
        radius: 0,
      },
    },

    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },

    scales: {
      // y max value
      y: {
        max: 40,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },

      x: {
        ticks: {
          stepSize: 1,
          afterBuildTicks: (scale, yTicks) => {
            scale.ticks = scale.ticks.map((t, i) => {
              // if same show only 5
              if (i % 5 === 0) return t;
              return '';
            });
          },
        },
      },
    },
  };

  return gData && <Line options={options} data={gData} />;
}
