import React, { useEffect, useState } from "react";
import "./App.css";
import covid19 from "./image/covid-19.png";
import DataIndicator from "./DataIndicator/DataIndicator";
import CountryPicker from "./CountryPicker/CountryPicker";
import Chart from "./Chart/Chart";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import {
  fetchCountries,
  fetchDailyGlobalData,
  fetchByCountry,
  fetchGlobalChartData
} from "./Api";

const THEME = createMuiTheme({
  typography: {
    fontFamily: "JGH",
    fontSize: 16
  }
});

function App() {
  const [currentCountry, setCurrentCountry] = useState("");
  const [chartData, setChartData] = useState([]);
  const [globalChartData, setGlobalChartData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [globalData, setGlobalData] = useState({});
  const [indicateData, setIndicateData] = useState({});
  useEffect(() => {
    (async function() {
      const [
        fetchedCountries,
        fetchedDailyGlobalData,
        fetchedGlobalChartData
      ] = await Promise.all([
        fetchCountries(),
        fetchDailyGlobalData(),
        fetchGlobalChartData()
      ]);
      setCountries(fetchedCountries);
      setGlobalData(fetchedDailyGlobalData);
      setIndicateData(fetchedDailyGlobalData);
      setGlobalChartData(fetchedGlobalChartData);
      setChartData(fetchedGlobalChartData);
    })();
  }, []);

  const setToGlobal = setSelectValue => {
    setSelectValue("global");
    setCurrentCountry("");
    setIndicateData(globalData);
    setChartData(globalChartData);
  };

  const changeCountry = async (country, setSelectValue) => {
    if (country === "global") {
      return setToGlobal(setSelectValue);
    }
    const fetchedCountryData = await fetchByCountry(country);
    if (fetchedCountryData.length < 1) {
      setToGlobal(setSelectValue);
      return alert("此国家暂无数据。");
    }

    setChartData(fetchedCountryData);

    const foundCountry = countries.find(item => item.slug === country);
    setCurrentCountry(foundCountry.name);
    setSelectValue(foundCountry.slug);
    const today = fetchedCountryData[fetchedCountryData.length - 1];
    const yesterday = fetchedCountryData[fetchedCountryData.length - 2];
    setIndicateData({
      NewConfirmed: today.Confirmed - yesterday.Confirmed,
      TotalConfirmed: today.Confirmed,
      NewDeaths: today.Deaths - yesterday.Deaths,
      TotalDeaths: today.Deaths,
      NewRecovered: today.Recovered - yesterday.Recovered,
      TotalRecovered: today.Recovered,
      date: today.date
    });
  };

  return (
    <MuiThemeProvider theme={THEME}>
      <div className="App">
        {indicateData.NewConfirmed ? (
          <>
            <img src={covid19} alt="covid-19" />
            <DataIndicator
              indicateData={indicateData}
              currentCountry={currentCountry}
            />
            <CountryPicker
              countries={countries}
              changeCountry={changeCountry}
            />
            <Chart data={chartData} />
          </>
        ) : (
          <div className="skeleton-wrap">
            <Skeleton
              variant="rect"
              width="100%"
              height="150px"
              style={{ margin: "1rem 0" }}
            />
            <div className="cards" style={{ marginBottom: "1rem" }}>
              <Skeleton variant="rect" height="200px" />
              <Skeleton variant="rect" height="200px" />
              <Skeleton variant="rect" height="200px" />
            </div>
            <Skeleton
              variant="rect"
              height="50px"
              style={{ marginBottom: "1rem" }}
            />
            <Skeleton variant="rect" height="500px" />
          </div>
        )}
      </div>
    </MuiThemeProvider>
  );
}

export default App;
