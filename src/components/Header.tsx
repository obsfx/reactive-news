import styled from 'styled-components'

const HeaderContainer = styled.div`
  padding: 10px;
  border-radius: 3px;
  background-color: #f4f4f4;
`

const Header = () => {
  return (
    <HeaderContainer>
      Reactive News
    </HeaderContainer>
  )
}

export default Header
