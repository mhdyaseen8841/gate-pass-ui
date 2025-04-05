import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const DropdownSearch = ({ options, label, onChange, disabled, formdata,value, isRequired=true }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (formdata) {
      setSelectedValue(null);  // Clears the child state
    }
  }, [formdata]);  


  useEffect(() => {
    if (value) {
      setSelectedValue(options.find(option => option.value === value) || null);
    }
  }, [value, options]); 

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

      filterOptions={(options, state) => {
        // Filter based on the input value, but limit the number of results
        const filtered = options.filter(option => option.label.toLowerCase().includes(state.inputValue.toLowerCase()));
        return filtered.slice(0, 15);  // Limit the displayed options
      }}
    />
  );
};

export default DropdownSearch;