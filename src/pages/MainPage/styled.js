import styled from "styled-components";

export const StyledMainPage = {
  Container: styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
      flex-wrap:wrap 
    ;
   

    @media screen and (max-width: 425px) {
      width: 300px;
      display: flex;
    justify-content: center;
   
  }
  `,
  SliderContainer: styled.div`
  margin-top: 4rem;
  width: 100%;
  max-width: 100%;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
  `,
  ProductListContainer: styled.div`
    margin-bottom: 30px
  }
  `,
};
