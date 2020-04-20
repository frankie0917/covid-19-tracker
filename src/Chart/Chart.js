import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";

function Chart({ data }) {
  const [dates, setDates] = useState([]);
  const [confirmeds, setConfirmed] = useState([]);
  const [recovereds, setRecovereds] = useState([]);
  const [deaths, setDeaths] = useState([]);
  useEffect(() => {
    let dateArr = [],
      confirmedArr = [],
      recoveredArr = [],
      deathArr = [];
    data.forEach(({ date, Confirmed, Recovered, Deaths }) => {
      dateArr.push(new Date(date).toLocaleDateString().slice(0,-5));
      confirmedArr.push(Confirmed);
      recoveredArr.push(Recovered);
      deathArr.push(Deaths);
    });
    setDates(dateArr);
    setConfirmed(confirmedArr);
    setRecovereds(recoveredArr);
    setDeaths(deathArr);
  }, [data]);
  return (
    <div className="Chart">
      <Line
        data={{
          
          labels:dates,
          datasets:[
            {
              label: "确诊",
              fill: true,
              data: confirmeds,
              backgroundColor: "rgba(0,0,255,.2)"
            },
            {
              label: "康复",
              fill: true,
              data: recovereds,
              backgroundColor: "rgba(0,255,0,.2)"
            },
            {
              label: "死亡",
              fill: true,
              data: deaths,
              backgroundColor: "rgba(255,0,0,.2)"
            }
          ]
        }

        }
      />
    </div>
  );
}

export default Chart;
