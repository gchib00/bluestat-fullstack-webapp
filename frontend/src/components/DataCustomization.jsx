import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import { Button, CircularProgress, MenuItem, Select, TextField } from "@mui/material";

const Container = styled.div`
  width: 48.6vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 10px 6px;
  @media (max-width: 1333px) {
    min-width: 100%;
    height: 180px;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  align-items: center;
  @media (max-width: 1333px) {
    min-width: 0px;
    width: 100%;
    height: 130px;
    margin: auto;
    flex-wrap: wrap;
  }
`;

export const DataCustomization = ({setActivateFetch, loader}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataType = searchParams.get("dataType") ?? "None";
  const selectedYear = searchParams.get("selectedYear") ?? "2019";
  const region = searchParams.get("region") ?? "EU";
  const isWideScreen = useMediaQuery({ query: "(min-width: 1333px)" });
  const minYear=1990; const maxYear=2021;

  const availableYears = []; //arr for populating the "Select" element (because TextField type=number is incompatable with mobile)
  for(let i=minYear; i<=maxYear; i++) { //populate arr with available years
    availableYears.push(i.toString());
  }
 
  const handleChange = (name, value) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const handleSubmit = () => {
    setActivateFetch(true);
  };

  return (
    <Container>
      <FormContainer>
        <Select
          id="dataType"
          value={dataType}
          renderValue={(selectedVal) => selectedVal === "None" ? "Select Data-Type" : dataType}
          sx={isWideScreen ? {width:190, height:40 } : {width:"100%", height:40}}
          onChange={(e) => handleChange("dataType", e.target.value)}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="GDP Growth">GDP Growth</MenuItem>
          <MenuItem value="Population">Population</MenuItem>
          <MenuItem value="Population Density">Population Density</MenuItem>
          <MenuItem value="Population Growth">Population Growth</MenuItem>
        </Select>
        <Select
          value={region}
          sx={isWideScreen ? {width:100, marginLeft:1, height:40} : {width:"45%", height:40}}
          onChange={(e) => handleChange("region", e.target.value)}
        >
          <MenuItem value="EU">EU</MenuItem>
          <MenuItem value="EEA">EEA</MenuItem>
          <MenuItem value="Europe+">Europe+</MenuItem>
        </Select>
        {isWideScreen ? //Textfield type="number" isn't suitable for mobile users. Render "Select" version instead
          <TextField
            type="number"
            sx={isWideScreen ? {width:120, marginLeft:1} : {width:"45%", marginLeft:1}}
            InputProps={{ inputProps: {max:maxYear, min:minYear} }}
            size="small"    
            defaultValue={selectedYear}      
            label="Year"
            onKeyDownCapture={(e) => e.preventDefault()}
            onChange={(e) => handleChange("selectedYear", e.target.value)}  
          />
          :
          <Select
            value={selectedYear}
            sx={{width:"45%", height:40}}
            onChange={(e) => handleChange("selectedYear", e.target.value)}
            MenuProps={{ PaperProps: {sx: { maxHeight:200 }} }}
          >
            {availableYears.map(year => {
              return(<MenuItem key={year} value={year}>{year}</MenuItem>);
            })}
          </Select>
        }
      </FormContainer>
      {isWideScreen ?
        <Button 
          type="submit" 
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{height: "40px", width: "154px"}}
        >
          { loader ? <CircularProgress size={"24px"} color="inherit" /> : "Render Data" }
        </Button>
        :
        <Button 
          type="submit" 
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{height: "40px", width: "100%", textAlign: "center"}}
        >
          { loader ? <CircularProgress size={"24px"} color="inherit" /> : "Render Data" }
        </Button>
      }
    </Container>
  );
};