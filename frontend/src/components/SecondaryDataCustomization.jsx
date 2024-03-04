import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ColorSelector } from "./ColorSelector";

const LowerContainer = styled.div`
  width: 48.7vw;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1333px) {
    width: 60vw;
    margin: 0rem 2rem 0rem 0rem;
    flex-direction: row;
  }
  @media (max-width: 900px) {
    width: 90vw;
    margin: 0.4rem 2rem 0rem 0rem;
    flex-direction: row;
  }
`;

export const SecondaryDataCustomization = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const microStates = searchParams.get("microStates") ?? "0";
  const showMicroStates = microStates === "1" ? true : false;
  const handleCheckboxClick = () => {
    searchParams.set("microStates", !showMicroStates ? "1" : "0");
    setSearchParams(searchParams);
  };
  const isNarrowScreen = useMediaQuery({ query: "(max-width: 415px)" });

  return (
    <LowerContainer>
      <FormControlLabel
        control={<Checkbox 
          checked={!showMicroStates} 
          onChange={handleCheckboxClick} 
          size={isNarrowScreen ? "small" : "medium"}
          sx={isNarrowScreen? {marginLeft: -1} : null}
        />}
        label={<Typography 
          sx={isNarrowScreen ? {fontSize: "0.85rem"} : null}>
          Disable Microstates: 
        </Typography>}
        color="default"
        labelPlacement="start"
        sx={{marginLeft: 0.6}}
      />
      <ColorSelector />
    </LowerContainer> 
  );
};