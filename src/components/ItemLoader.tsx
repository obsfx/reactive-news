import styled from 'styled-components'

type Props = {
  width: string
  height: string
  margin: string
}

const ItemLoader = (props: Props) => {
  const { width, height, margin } = props

  const ItemLoaderContainer = styled.div`
    background-color: var(--item-loader-background-color);
    width: ${width};
    height: ${height};
    margin: ${margin};
  `

  return <ItemLoaderContainer />
}

export default ItemLoader
