import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  padding: 5px;
  background-color: var(--header-background-color);
  font-size: 12px;
`

const HeaderTitleIcon = styled.a`
  text-decoration: none;
  font-size: 12px;
  padding: 1.5px 3px;
  font-weight: bold;
  color: var(--header-title-icon-color);
  border: 1px solid var(--header-title-icon-color);
  margin-right: 10px;
`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  color: var(--header-title-color);
  font-weight: 300;
`

const HeaderTitleColored = styled.span`
  color: var(--header-title-span-color);
  font-weight: 400;
`

const HeaderGithub = styled.a`
  text-decoration: none;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-self: center;
  margin-left: 5px;
  font-size: 10px;
  color: var(--header-link-color);

  &:hover {
    color: var(--header-link-hover-color);
  }
`

const HeaderLinks = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`

const HeaderLink = styled.a`
  color: var(--header-link-color);
  padding: 0px 5px;
  text-decoration: none;
  border-right: 1px solid var(--header-link-border-color);

  &:last-child {
    border: none;
  }

  &:hover {
    color: var(--header-link-hover-color);
  }
`

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <HeaderTitleIcon href="#">Y</HeaderTitleIcon>
        <HeaderTitleColored>Reactive</HeaderTitleColored>&nbsp;News
      </HeaderTitle>

      <HeaderLinks>
        <HeaderLink href="#">new</HeaderLink>
        <HeaderLink href="#">threads</HeaderLink>
        <HeaderLink href="#">past</HeaderLink>
        <HeaderLink href="#">comments</HeaderLink>
        <HeaderLink href="#">ask</HeaderLink>
        <HeaderLink href="#">show</HeaderLink>
        <HeaderLink href="#">jobs</HeaderLink>
      </HeaderLinks>

      <HeaderGithub href="#">(github/obsfx/reactive-news)</HeaderGithub>
    </HeaderContainer>
  )
}

export default Header
