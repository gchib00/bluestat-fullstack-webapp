import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const MainContainer = styled.div`
  width: 34vw;
  text-align: "center";
  @media (max-width: 1333px) {
    width: 60vw;
    margin: 0rem 2rem 3rem 0rem;
  }
  @media (max-width: 900px) {
    width: 90vw;
    margin: 0rem 2rem 3rem 0rem;
  }
`;
const Description = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  margin: 35px 0px 12px 0px;
  @media (max-width: 415px) {
    font-size: 0.9rem;
  }
`;

export const StatesList = ({dataDesc, sortedCountryList, dataType}) => {
  const isWideScreen = useMediaQuery({ query: "(min-width: 1333px)" });
  const columns = [
    { id: "country", label: "Country", minWidth: 30 },
    { id: "value", label: "Value", minWidth: 40 }
  ];
  const rows = sortedCountryList.map(data => {
    return {
      country: data.country,
      value: data.value ? //format numbers to make them more readable (or return n/a if value is missing):
        data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "n/a"
    } ;
  }).reverse(); //reverse arr so that the values are listed from highest to lowest
  if (sortedCountryList.length < 1) {
    return null; //hide component if there is no data to display
  }
  return (
    <MainContainer>
      <Description>
        {dataDesc}
      </Description>
      <TableContainer sx={isWideScreen ? {height: "40vh"} : null}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    backgroundColor: "#6e6969", 
                    color: "white", 
                    fontWeight: "bold",
                    borderRight: "3px solid white",
                    textAlign: "center"
                  }}
                  key={column.id}
                  align={column.align}
                  style={{width: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.country}>
                  {columns.map((column) => {
                    const value = column.id; // "name" or "country" or "value"
                    return (
                      <TableCell key={column.id} align={column.align} sx={{borderRight: "3px solid white", textAlign: "center"}}>
                        {row[value]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
};