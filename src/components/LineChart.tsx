import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type Props = {
  data: Record<string, Record<string, number>>;
  countryCode: string;
};

export function LineChart({ data, countryCode }: Props) {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string[]>([
    '#f67f90',
    '#f67f90',
  ]);

  useEffect(() => {
    if (data) {
      const labels = Object.keys(data).map((key) => key);
      setLabels(labels);
      const values = Object.keys(data).map((key) => data[key][countryCode]);
      setValues(values);
      const backgroundColor = Object.keys(data).map(() => '#f67f90');
      setBackgroundColor(backgroundColor);
    }
  }, [data]);

  const options = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Cotação',
      fontSize: 25,
    },
    legend: {
      display: false,
      // position: 'right'
    },
    // scales: {
    //   yAxes: [{
    //     ticks: {
    //       beginAtZero: true
    //     }
    //   }],
    // },
  };
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: countryCode,
            data: values,
            backgroundColor: backgroundColor,
            borderWidth: 2,
            fill: false,
          },
        ],
      }}
      // width={100}
      // height={80}
      options={options}
    />
  );
}
