import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
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
      max: 30,
      min: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export function Charts({ data }) {
  return <Line options={options} data={data} />;
}
