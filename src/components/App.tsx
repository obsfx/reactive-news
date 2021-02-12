import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import ItemList from './ItemList'

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
        <ItemList />
      </AppBody>
    </AppContainer>
  )
}

export default App
