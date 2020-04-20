import React from "react";
import "./DataIndicator.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";

function DataIndicator({
  indicateData: {
    NewConfirmed,
    TotalConfirmed,
    NewDeaths,
    TotalDeaths,
    NewRecovered,
    TotalRecovered,
    date
  },
  currentCountry
}) {
  return (
    <div className="DataIndicator">
      <Card className="confirmed">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            确诊
          </Typography>
          <Typography variant="h4">
            <CountUp
              start={0}
              end={TotalConfirmed}
              duration={2}
              separator=","
              gutterBottom
            />
          </Typography>

          <Typography color="textSecondary">新增</Typography>
          <Typography variant="h5">
            <CountUp start={0} end={NewConfirmed} duration={2} separator="," />
          </Typography>
          <Typography color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography>{currentCountry || '全球'}的新冠病毒确诊数量</Typography>
        </CardContent>
      </Card>
      <Card className="recoverd">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            康复
          </Typography>
          <Typography variant="h4">
            <CountUp
              start={0}
              end={TotalRecovered}
              duration={2}
              separator=","
            />
          </Typography>
          <Typography color="textSecondary">新增</Typography>
          <Typography variant="h5">
            <CountUp start={0} end={NewRecovered} duration={2} separator="," />
          </Typography>
          <Typography color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography>{currentCountry || '全球'}的新冠病毒康复数量</Typography>
        </CardContent>
      </Card>
      <Card className="death">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            死亡
          </Typography>

          <Typography variant="h4">
            <CountUp start={0} end={TotalDeaths} duration={2} separator="," />
          </Typography>
          <Typography color="textSecondary">新增</Typography>
          <Typography variant="h5">
            <CountUp start={0} end={NewDeaths} duration={2} separator="," />
          </Typography>
          <Typography color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography>{currentCountry || '全球'}的新冠病毒死亡数量</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default DataIndicator;
