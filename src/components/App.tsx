import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import Items from './Items'

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const AppBody = styled.div`
  padding: 15px;
  width: 900px;
`

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <AppBody>
        <Header />
        <Items />
      </AppBody>
    </AppContainer>
  )
}

export default App