import styled from "styled-components";

export const StyledSlider = {
    Wrapper: styled.div`
        width: 100%;
        background-color: black;
        display: flex;
        max-width: 100%;
        justify-content: center;

        img {
            max-width: 100%;
        }
    `,
    Btn: styled.button`
        color: white;
    `
}