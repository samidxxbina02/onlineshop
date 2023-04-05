import styled from "styled-components";

export const StyledProductDetails = {
  Wrapper: styled.div`
  display:flex;
  border:2px solid gray;
  width: 70%;
  gap:50px;

  margin: 10% 15%; 
  `,
  ImgWrapper:styled.div`
  
  `,

  Img:styled.img`
  height:500px;
  width: 450px;
  `,
  ContentWrapper:styled.div`
  display: flex;
  flex-direction: column;
  gap:5%;
  `,
  ContentTitle:styled.h2`
  font-weight:700;  
  `,
  Title:styled.span`
    font-weight:500;
    font-size:20px;
  `,
  Description:styled.span`
  width:250px;
  `,
  CommentsWrapper:styled.div`
  display: flex;
  flex-direction:column;
  gap:2%;
  border: 2px solid gray ;
  width: 34%;
  text-align:center;
  `


};
