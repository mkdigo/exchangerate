export default {
  getCurrentQuote: async (base, symbol) => {
    const url = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbol}`

    try {
      const response = await fetch(url)
      const data = await response.json();
      if(!data.success) throw new Error("Não foi possível fazer a requisição.")
      return data.rates[symbol]
    } catch (err) {
      return {error: err}
    }
  },

  getSymbols: async () => {
    const url = 'https://api.exchangerate.host/symbols'
    
    try {
      const response = await fetch(url)
      const data = await response.json();
      if(!data.success) throw new Error("Não foi possível fazer a requisição.")
      return data.symbols
    } catch (err) {
      return {error: err}
    }
  },

  getTimeSeries: async (startDate, endDate, base, symbol) => {
    const url = `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${symbol}`

    try {
      const response = await fetch(url)
      const data = await response.json();
      if(!data.success) throw new Error("Não foi possível fazer a requisição.")
      return data.rates
    } catch (err) {
      return {error: err}
    }
  },
}