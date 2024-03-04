import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import EuropeSVG from "./MapSVG/EuropeSVG";
import { DataCustomization } from "./DataCustomization";
import { StatesList } from "./StatesList";
import { SecondaryDataCustomization } from "./SecondaryDataCustomization";

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 1333px) {
    width: 60vw;
    flex-direction: column;
    justify-content: flex-start;
  }
  @media (max-width: 900px) {
    width: 90vw;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const MapContainer = styled.div`
  width: 48.6vw;
  min-height: 250px;
  margin: 0px 4px 0px 4px;
  border-radius: 4px;
  border: 2px solid black;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  @media (max-width: 1333px) {
    width: 60vw;
  }
  @media (max-width: 900px) {
    width: 90vw;
  }
  @media (max-width: 415px) {
    min-height: 130px;
  }
`;

export const InteractiveMapEurope = () => {
  const [searchParams] = useSearchParams();
  const [countryData, setCountryData] = useState([]);
  const [sortedCountryList, setSortedCountryList] = useState([]);
  const [activateFetch, setActivateFetch] = useState(false);
  const [loader, setLoader] = useState(false); //loading animation switch
  const [dataDesc, setDataDesc] = useState("");
  const apiUrl = 'http://localhost:3001';
  const mapColor = searchParams.get("color") ?? "blue";
  const dataType = searchParams.get("dataType") ?? "None";
  const selectedYear = searchParams.get("selectedYear") ?? "2019";
  const region = searchParams.get("region") ?? "EU";
  const microStates = searchParams.get("microStates") ?? "0";
  const isWideScreen = useMediaQuery({ query: "(min-width: 1333px)" });

  const fetchData = async (selectedYear) => {
    const getEndpoint = (dataType) => {
      switch(dataType) {
      case("GDP Growth"): { return "gdp/growth"; }       
      case("Population"): { return "population/total"; }
      case("Population Density"): { return "population/density"; } 
      case("Population Growth"): { return "population/growth"; }
      default: { return null; }
      }
    };
    const fetchData = async () => {
      const endpoint = getEndpoint(dataType);
      if (!endpoint) {
        setLoader(false);
        return null;
      }
      return fetch (
        `${apiUrl}/${endpoint}/${region}/${selectedYear}?microStates=${microStates === '1'}`
      );
    };
    setLoader(true);
    const response = await fetchData();
    if (!response) {
      return null;
    }
    const data = await response.json();
    if(data) { 
      setCountryData(data);
      if (dataType === 'Population') {
        setDataDesc(dataType);

      } else {
        setDataDesc(dataType + ' (%)');

      }
      setLoader(false);
    }
  };

  useEffect(() => {
    if (dataType === "None" || !activateFetch) {
      setActivateFetch(false);
      return setCountryData([]); //reset map if "None" is selected
    }
    fetchData(selectedYear);
    setActivateFetch(false);
  }, [activateFetch]);

  useEffect(() => {
    fetchData(selectedYear);
  }, [microStates]);

  useEffect(() => {
    //re-arrange the existing data from highest to lowerst by value:
    const orderedArr = [...countryData].sort((a, b) => a.value-b.value);
    setSortedCountryList(orderedArr);
  }, [countryData]);

  return (
    <div>
      <DataCustomization 
        setActivateFetch={setActivateFetch}
        loader={loader}
      />
      <ContentContainer>
        <MapContainer id="mapContainer">
          <EuropeSVG
            loader={loader}
            sortedCountryList={sortedCountryList}
            mapColor={mapColor}
          />
        </MapContainer>
        {isWideScreen ? null : 
          <SecondaryDataCustomization />}
        <StatesList
          dataDesc={dataDesc}
          sortedCountryList={sortedCountryList}
          dataType={dataType}
        />
      </ContentContainer>
      {isWideScreen ? <SecondaryDataCustomization /> : null}
    </div>
  );
};