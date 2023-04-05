import React, { useContext, useEffect, useState } from "react";
import { StyledSidebar } from "./styled";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { initialFiltersState } from "./const";
import { StoreContext } from "../../context/store/StoreContext";
import { useSearchParams } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Sidebar = () => {
  const [params, setParams] = useSearchParams();
  const { getProductsRequest } = useContext(StoreContext);

  const [filters, setFilters] = React.useState({
    shoes: false,
    bag: false,
    dress: false,
    blazer: false,
  });

  const { shoes, bag, dress, blazer } = filters;

  const handleChangeTest = (event) => {
    const { name, checked } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  useEffect(() => {
    // Object.entries({ 
    //   name: 'Albina',
    //   age: 20
    // }) = [[name, 'Albina'], [age, 20]]
   
    const filterParams = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(",");

    if (filterParams) {
      setParams({ type: filterParams });
    } else {
      setParams({});
    }
  }, [filters]);

  useEffect(() => {
    getProductsRequest();
  }, [params]);

  return (
    <StyledSidebar.Wrapper>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={shoes}
                    onChange={handleChangeTest}
                    name="shoes"
                  />
                }
                label="Shoes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bag}
                    onChange={handleChangeTest}
                    name="bag"
                  />
                }
                label="Bag"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dress}
                    onChange={handleChangeTest}
                    name="dress"
                  />
                }
                label="Dress"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={blazer}
                    onChange={handleChangeTest}
                    name="blazer"
                  />
                }
                label="Blazer"
              />
            </Box>
          </FormGroup>
        </FormControl>
      </Box>
    </StyledSidebar.Wrapper>
  );
};

export default Sidebar;
