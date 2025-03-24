import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const DropdownSearch = ({ options, label, onChange, disabled }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
        if (onChange) onChange(newValue);
      }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      disabled={disabled}
    />
  );
};

export default DropdownSearch;