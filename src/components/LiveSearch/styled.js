import styled from "styled-components";

export const StyledLiveSearch = {
    Wrapper: styled.li`
        position: absolute;
        left: ${({ inpWidth }) => `-${inpWidth}px`};
        display: ${({ searchActive }) => searchActive ? 'block' : 'none'}
    `
}