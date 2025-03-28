import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const DropdownSearch = ({ options, label, onChange, disabled, formdata, isRequired=true }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (formdata) {
      setSelectedValue(null);  // Clears the child state
    }
  }, [formdata]);  // This will run whenever the triggerClear prop changes

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
        if (onChange) onChange(newValue);
      }}
      renderInput={(params) => <TextField   required={isRequired} {...params} label={label} variant="outlined" />}

      
      disabled={disabled}
    />
  );
};

export default DropdownSearch;