import styled from "styled-components";

export const StyledAdminForm = {
  Container: styled.div`
    background: rgb(38, 38, 38);
    border-radius: 10px;
    color: white;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 3rem auto;
    padding-bottom: 5rem;
  `,
  Title: styled.h3`
    width: 100%;
    text-align: center;
    border-bottom: 0.5px solid white;
    font-size: 15px;
    margin: 0;
    line-height: 40px;
    font-weight: 200;
  `,
  Body: styled.div`
    padding: 30px;
  `,
};
