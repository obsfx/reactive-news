import { useState } from 'react'
import styled from 'styled-components'
import useFetchItemIDs from '../hooks/useFetchItemIDs'
import useFetchItemDetails from '../hooks/useFetchItemDetails'
import Item from './Item'
import ItemLoader from './ItemLoader'

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

type ItemData = {
  by: string
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
}

type Props = {
  listEndpoint: string
}

const ItemList = (props: Props) => {
  const { listEndpoint } = props

  const [items, setItems] = useState<ItemData[]>([])
  const [page, setPage] = useState<number>(0)

  const pageLength: number = 30
  const [loaderCount, setLoaderCount] = useState<number>(pageLength)

  const [loadButtonVisibility, setLoadButtonVisibility] = useState<boolean>(false)

  const itemIDs: number[] = useFetchItemIDs(listEndpoint)

  useFetchItemDetails(
    `https://hacker-news.firebaseio.com/v0/item/{ID}.json`,
    itemIDs,
    page,
    pageLength,
    (data: any[]) => {
      setLoaderCount(0)
      setItems((prev: ItemData[]) => [
        ...prev,
        ...data.map((item: any) => ({
          by: item.by || '',
          id: item.id || -1,
          kids: item.kids || [],
          score: item.score || 0,
          time: item.time || 0,
          title: item.title || '',
          type: item.type || '',
          url: item.url || '',
        })),
      ])

      if (data.length === pageLength) {
        setLoadButtonVisibility(true)
      }
    }
  )

  const handleLoadMoreButtonClick = () => {
    setLoaderCount(pageLength)
    setLoadButtonVisibility(false)
    setPage((prev: number) => prev + 1)
  }

  return (
    <ItemListContainer>
      {items.map((item: any, idx: number) => (
        <Item
          key={item.id}
          itemID={item.id}
          itemType={item.type}
          itemNumber={idx + 1}
          itemURL={item.url}
          itemTitle={item.title}
          itemTitleURL={item.url.split('/')[2]}
          itemScore={item.score}
          itemAuthor={item.by}
          itemEpoch={item.time}
          itemCommentCount={item.kids.length}
        />
      ))}

      {new Array(loaderCount).fill(0).map((_, idx: number) => (
        <ItemLoader key={idx} />
      ))}

      {loadButtonVisibility && (
        <LoadMoreButton onClick={handleLoadMoreButtonClick}>More</LoadMoreButton>
      )}
    </ItemListContainer>
  )
}

export default ItemList
