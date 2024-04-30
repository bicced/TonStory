import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Micro+5&family=Platypi:ital,wght@0,300..800;1,300..800&family=Protest+Guerrilla&display=swap')
  
  body {
    font-family: 'Platypi', sans-serif;
  }
  h1 {
    font-family: 'Platypi', sans-serif;
  }
`;

export const Fullscreen = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

export const Card = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  margin: 10px;
`;

export const Label = styled.label`
  color: white;
  font-weight: bold;
  font-size: 16px;
`; 

export const Title = styled.h1`
  color: white;
  font-size: 24px;
  margin: 10px;
  font-family: inherit;

`;

