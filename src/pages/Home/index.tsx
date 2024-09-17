import { useEffect, useState } from 'react';

import { LineChart } from '../../components/LineChart';
import { CountryCodeSelect } from '../../components/CountryCodeSelect';

import { ExchangeRateApi } from '../../api';

import './styles.css';

export function Home() {
  const [data, setData] = useState<Record<string, Record<string, number>>>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [value, setValue] = useState(1);
  const [convertedValue, setConvertedValue] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fromCountryCode, setFromCountryCode] = useState('USD');
  const [toCountryCode, setToCountryCode] = useState('BRL');

  useEffect(() => {
    const api = new ExchangeRateApi();
    api
      .realTime({ source: fromCountryCode, currencies: toCountryCode })
      .then((response) => {
        if (!response.success) {
          console.log(response.error);
          return;
        }

        const code = `${fromCountryCode}${toCountryCode}`;

        if (response.quotes[code]) {
          setCurrentQuote(response.quotes[code]);
        }
      });
  }, [fromCountryCode, toCountryCode]);

  useEffect(() => {
    setConvertedValue(value * currentQuote);
  }, [value, currentQuote]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const endMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const endFullDate = `${year}-${endMonth}-${day}`;
    setEndDate(endFullDate);

    const startMonth = date.getMonth().toString().padStart(2, '0');
    const startFullDate = `${startMonth === '00' ? year - 1 : year}-${
      startMonth === '00' ? '12' : startMonth
    }-${day}`;

    setStartDate(startFullDate);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const api = new ExchangeRateApi();
    api
      .timeFrame({
        source: fromCountryCode,
        start_date: startDate,
        end_date: endDate,
      })
      .then((data) => {
        if (!data.success) {
          console.log(data.error);
          return;
        }
        setData(data.quotes);
      });
  }, [startDate, endDate, fromCountryCode]);

  return (
    <main>
      <div className='container'>
        <div className='chart'>
          {data && (
            <LineChart
              data={data}
              countryCode={`${fromCountryCode}${toCountryCode}`}
            />
          )}
        </div>

        <ul className='home-choose-date'>
          <li>
            <label htmlFor='start-date'>Data Inicial</label>
            <input
              type='date'
              name='start-date'
              value={startDate ?? ''}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </li>
          <li>
            <label htmlFor='end-date'>Data Final</label>
            <input
              type='date'
              name='end-date'
              value={endDate ?? ''}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </li>
          <li>
            <label htmlFor='from'>De</label>
            <CountryCodeSelect
              value={fromCountryCode}
              onChange={(event) => setFromCountryCode(event.target.value)}
            />
          </li>
          <li>
            <label htmlFor='to'>Para</label>
            <CountryCodeSelect
              value={toCountryCode}
              onChange={(event) => setToCountryCode(event.target.value)}
            />
          </li>
          <li>
            <label htmlFor='value'>Valor</label>
            <input
              type='number'
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
            />
          </li>
          <li>
            <label htmlFor='convertedValue'>Valor convertido</label>
            <span>{convertedValue}</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
