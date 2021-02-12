import styled from 'styled-components'

const ItemLoader = () => {
  const ItemLoaderContainer = styled.div`
    background-color: var(--item-loader-background-color);
    width: 100%;
    height: 45px;
    margin: 2px 0px;
  `

  return <ItemLoaderContainer />
}

export default ItemLoader
