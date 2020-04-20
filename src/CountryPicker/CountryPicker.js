import React, { useState } from "react";
import "./CountryPicker.css";
import { FormControl, NativeSelect } from "@material-ui/core";

function CountryPicker({ countries, changeCountry }) {
  const [selectValue, setSelectValue] = useState("global");
  return (
    <div className="CountryPicker">
      <FormControl style={{ width: "100%" }}>
        <NativeSelect
          onChange={e => changeCountry(e.target.value, setSelectValue)}
          value={selectValue}
        >
          <option value="global">全球</option>
          {countries.map(({ name, slug }) => (
            <option key={slug} value={slug}>
              {name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default CountryPicker;
