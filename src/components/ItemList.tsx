import { useState } from 'react'
import styled from 'styled-components'
import useFetchItemIDs from '../hooks/useFetchItemIDs'
import Item from './Item'

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  background-color: var(--item-background-color);
`

const LoadMoreButton = styled.div`
  font-size: 12px;
  cursor: pointer;
  margin-top: 15px;
  color: var(--load-more-button-color);

  &:hover {
    text-decoration: underline;
  }
`

type Props = {
  listEndpoint: string
}

const ItemList = (props: Props) => {
  const pageLength: number = 30

  const { listEndpoint } = props

  const [page, setPage] = useState<number>(0)

  const itemIDs: number[] = useFetchItemIDs(listEndpoint)

  const handleLoadMoreButtonClick = () => {
    setPage((prev: number) => prev + 1)
  }

  return (
    <ItemListContainer>
      {itemIDs.slice(0, (page + 1) * pageLength).map((id: number, idx: number) => (
        <Item key={id} idx={idx + 1} id={id} />
      ))}

      <LoadMoreButton onClick={handleLoadMoreButtonClick}>More</LoadMoreButton>
    </ItemListContainer>
  )
}

export default ItemList
