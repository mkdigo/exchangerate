type TExchangeRateResonseError = {
  success: false;
  error: {
    code: number;
    info: string;
  };
};

type TRealTimeResponse = {
  success: true;
  terms: string;
  privacy: string;
  timestamp: number;
  source: string;
  quotes: Record<string, number>;
};

type TTimeFrameResonse = {
  success: true;
  terms: string;
  privacy: string;
  timeframe: boolean;
  start_date: string;
  end_date: string;
  source: string;
  quotes: Record<string, Record<string, number>>;
};

type TRealTimeParams = {
  source: string;
  currencies: string;
};

type TTimeFrameParams = {
  start_date: string;
  end_date: string;
  source: string;
};

export class ExchangeRateApi {
  private baseUrl: string = 'https://api.exchangerate.host';

  private getURL(
    endpoint: string,
    params: Record<string, string | number>
  ): string {
    let formatedParams: string = '';

    Object.keys(params).forEach((key) => {
      formatedParams += `&${key}=${params[key]}`;
    });

    return `${this.baseUrl}${endpoint}?access_key=${
      import.meta.env.VITE_EXCHANGERATE_API_KEY
    }${formatedParams}`;
  }

  public async realTime(
    params: TRealTimeParams
  ): Promise<TRealTimeResponse | TExchangeRateResonseError> {
    const url = this.getURL('/live', params);
    const response = await fetch(url);
    return await response.json();
  }

  public async timeFrame(
    params: TTimeFrameParams
  ): Promise<TTimeFrameResonse | TExchangeRateResonseError> {
    const url = this.getURL('/timeframe', params);
    const response = await fetch(url);
    return await response.json();
  }
}
