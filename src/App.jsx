import React from 'react';
import styled from 'styled-components';

import CardList from './CardList';



const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  /* background: red; */
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;  



function App() {

  return (
    <MainContainer>
      <h1>MovieSystem-API React Client</h1>
      <CardList />
    </MainContainer>
  )
}

export default App
