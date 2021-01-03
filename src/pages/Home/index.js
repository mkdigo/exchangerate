import { useEffect, useState } from 'react'

import './styles.css'
import api from '../../api'

import Chart from '../../components/Chart'

function Home () {
  const [data, setData] = useState('');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [value, setValue] = useState(1);
  const [convertedValue, setConvertedValue] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0)
  const [base, setBase] = useState('USD')
  const [symbol, setSymbol] = useState('BRL')
  const [symbols, setSymbols] = useState({
    "BRL": {
      "description": "Brazilian Real",
      "code": "BRL"
    },
    "USD": {
      "description": "United States Dollar",
      "code": "USD"
    },
  })

  useEffect(() => {
    api.getCurrentQuote(base, symbol)
      .then(response => {
        if(response.error) console.log(response.error)
        else setCurrentQuote(response)
      })
  }, [base, symbol])

  useEffect(() => {
    setConvertedValue(value * currentQuote)
  }, [value, currentQuote])

  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    const endMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const endFullDate = `${year}-${endMonth}-${day}`
    setEndDate(endFullDate)

    const startMonth = date.getMonth().toString().padStart(2, '0');
    const startFullDate = `${startMonth === '00' ? year - 1 : year}-${startMonth === '00' ? '12' : startMonth}-${day}`
    console.log(startFullDate)

    setStartDate(startFullDate)
  }, [])

  useEffect(() => {
    api.getTimeSeries(startDate, endDate, base, symbol)
      .then(response => {
        if(response.error) console.log(response.error)
        else setData(response)
      })
  }, [startDate, endDate, base, symbol])

  useEffect(() => {
    api.getSymbols()
      .then(response => {
        if(response.error) console.log(response.error)
        else setSymbols(response)
      })
  }, [])

  return (
    <main>
      <div className="container">
        <div className="chart">
          <Chart data={data} symbol={symbol} />
        </div>

        <ul className="home-choose-date">
          <li>
            <label htmlFor="start-date">Data Inicial</label>
            <input type="date" name="start-date" value={startDate} onChange={event => setStartDate(event.target.value)}/>
          </li>
          <li>
            <label htmlFor="end-date">Data Final</label>
            <input type="date" name="end-date" value={endDate} onChange={event => setEndDate(event.target.value)}/>
          </li>
          <li>
            <label htmlFor="from">De</label>
            <select name="from" id="from" value={base} onChange={event => setBase(event.target.value)}>
              {Object.keys(symbols).map(key => (
                <option value={key} key={key}>{symbols[key].description}</option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="to">Para</label>
            <select name="to" id="to" value={symbol} onChange={event => setSymbol(event.target.value)}>
              {Object.keys(symbols).map(key => (
                <option value={key} key={key}>{symbols[key].description}</option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="value">Valor</label>
            <input type="number" value={value} onChange={event => setValue(event.target.value)} />
          </li>
          <li>
            <label htmlFor="convertedValue">Valor convertido</label>
            <span>{convertedValue}</span>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default Home
