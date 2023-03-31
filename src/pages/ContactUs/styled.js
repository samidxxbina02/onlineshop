import styled from "styled-components";

export const StyledContacts = {
  Container: styled.div`
    display: flex;
    padding: 7%;

    flex-direction: column;
    align-items: center;
  `,
  Title: styled.h1`
    font-family: "Comfortaa", cursive;
  `,
  Content: styled.p`
    width: 40%;
    margin-top: 40px;
  `,
  IconsWrapper: styled.ul`
    display: flex;
    margin-top: 100px;
    gap:10%;
  `,
  Icon: styled.li``,
  IconLink: styled.a``,
};
