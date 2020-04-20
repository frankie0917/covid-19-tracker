export const fetchCountries = async () => {
  return await fetch("https://api.covid19api.com/countries")
    .then(res => res.json())
    .then(data =>
      data
        .map(country => {
          return { name: country.Country, slug: country.Slug };
        })
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          else if (a.name > b.name) return 1;
          return 0;
        })
    );
};

export const fetchDailyGlobalData = async () => {
  return await fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => ({
      NewConfirmed: data.Global.NewConfirmed,
      TotalConfirmed: data.Global.TotalConfirmed,
      NewDeaths: data.Global.NewDeaths,
      TotalDeaths: data.Global.TotalDeaths,
      NewRecovered: data.Global.NewRecovered,
      TotalRecovered: data.Global.TotalRecovered,
      date: data.Date
    }));
};

export const fetchByCountry = async country => {
  return await fetch(`https://api.covid19api.com/total/country/${country}`)
    .then(res => res.json())
    .then(data =>
      data.map(day => ({
        Confirmed: day.Confirmed,
        Deaths: day.Deaths,
        Recovered: day.Recovered,
        date: day.Date
      }))
    );
};
export const fetchGlobalChartData = async () => {
  return await fetch("https://covid19.mathdro.id/api/daily")
    .then(res => res.json())
    .then(data => data.map(day => ({
      Confirmed: day.totalConfirmed,
      Recovered: day.totalRecovered,
      Deaths: day.deaths.total,
      date: day.reportDate
    })));
};
