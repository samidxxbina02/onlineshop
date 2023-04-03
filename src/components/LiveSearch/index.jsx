import React, { useContext, useEffect, useState } from 'react';
import AppInput from '../UI/AppInput/AppInput';
import { StyledLiveSearch } from './styled';
import { useDebounce } from '../../hooks/useDebounce';
import { StoreContext } from '../../context/store/StoreContext';

const inpWidth = 300

const LiveSearch = ({ searchActive }) => {
    const { getProductsRequest } = useContext(StoreContext)
    const [search, setSearch] = useState('')

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const debouncedSearch = useDebounce(search, 500);

    useEffect(
        () => {
          if (debouncedSearch) {
            // q - JSON поиск
            getProductsRequest({ q: search })
          } else {
            getProductsRequest()
          }
        },
        [debouncedSearch]
      );

    return (
        <StyledLiveSearch.Wrapper searchActive={searchActive} inpWidth={inpWidth}>
            <AppInput 
                onChange={handleSearch}
                placeholder='Давайте вместе найдем что вы искали'
                value={search}
                size='lg'
                sx={{
                    width: inpWidth
                }}
            />
        </StyledLiveSearch.Wrapper>
    );
};

export default LiveSearch;