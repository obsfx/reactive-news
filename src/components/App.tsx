import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import Hits from './Hits'
import News from './News'
import Ask from './Ask'
import Show from './Show'
import Jobs from './Jobs'

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
      <Router>
        <AppBody>
          <Header />
          <Switch>
            <Route exact path="/">
              <Hits />
            </Route>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/ask">
              <Ask />
            </Route>
            <Route path="/show">
              <Show />
            </Route>
            <Route path="/jobs">
              <Jobs />
            </Route>
          </Switch>
        </AppBody>
      </Router>
    </AppContainer>
  )
}

export default App
