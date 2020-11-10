import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'


function Chart ({data, symbol}) {
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])
  const [backgroundColor, setBackgroundColor] = useState([])

  useEffect(() => {
    if(data) {
      const labels = Object.keys(data).map(key => (key))
      setLabels(labels)

      const values = Object.keys(data).map(key => (data[key][symbol]))
      setValues(values)

      const backgroundColor = Object.keys(data).map(() => ('#f67f90'))
      setBackgroundColor(backgroundColor)
    }
  }, [data])

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
  }
  return(
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Real',
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
  )
}

export default Chart