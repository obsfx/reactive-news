import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useFetchItemIDs from '../hooks/useFetchItemIDs'
import useFetchDetailsOfItems from '../hooks/useFetchDetailsOfItems'
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
  const pageLength: number = 30

  const { listEndpoint } = props

  const [items, setItems] = useState<ItemData[]>([])
  const [page, setPage] = useState<number>(0)

  const itemIDs: number[] = useFetchItemIDs(listEndpoint)

  const [status, itemRawDataArr] = useFetchDetailsOfItems(
    `https://hacker-news.firebaseio.com/v0/item/{ID}.json`,
    itemIDs,
    page,
    pageLength
  )

  useEffect(() => {
    setItems((prev: ItemData[]) => [
      ...prev,
      ...itemRawDataArr.map((item: any) => ({
        by: item.by || '',
        id: item.id || -1,
        kids: item.kids || [],
        score: item.score || 0,
        time: item.time || 0,
        title: item.title || '',
        type: item.type || '',
        url: item.url || '',
        text: item.text || '',
      })),
    ])
  }, [itemRawDataArr])

  const handleLoadMoreButtonClick = () => {
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

      {status !== 'done' &&
        new Array(pageLength)
          .fill(0)
          .map((_, idx: number) => (
            <ItemLoader key={idx} width="100%" height="45px" margin="2px 0px" />
          ))}

      {status === 'done' && (
        <LoadMoreButton onClick={handleLoadMoreButtonClick}>More</LoadMoreButton>
      )}
    </ItemListContainer>
  )
}

export default ItemList
