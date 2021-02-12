import { useEffect, useState } from 'react'
import styled from 'styled-components'
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

const ItemList = () => {
  const [topStoriesArr, setTopStoriesArr] = useState<number[]>([])
  const [items, setItems] = useState<ItemData[]>([])
  const [page, setPage] = useState<number>(0)

  const pageLength: number = 30

  useEffect(() => {
    const getTopStories = async () => {
      const topStoriesEndspoint: string = 'https://hacker-news.firebaseio.com/v0/topstories.json'
      const topStoriesResponse: Response = await fetch(topStoriesEndspoint)
      setTopStoriesArr((await topStoriesResponse.json()) || [])
    }

    getTopStories()
  }, [])

  useEffect(() => {
    const fetchItemData = async () => {
      const itemDataPromises: Promise<Response>[] = topStoriesArr
        .slice(page * pageLength, (page + 1) * pageLength)
        .map(async (e: number) => {
          return fetch(`https://hacker-news.firebaseio.com/v0/item/${e}.json`)
        })

      const itemDataResponses: Response[] = await Promise.all([...itemDataPromises])
      const itemRawDataArr: any[] = await Promise.all([
        ...itemDataResponses.map((e: Response) => e.json()),
      ])

      const itemDataArr: ItemData[] = itemRawDataArr.map((item: any) => ({
        by: item.by || '',
        id: item.id || -1,
        kids: item.kids || [],
        score: item.score || 0,
        time: item.time || 0,
        title: item.title || '',
        type: item.type || '',
        url: item.url || '',
      }))

      setItems((prev: ItemData[]) => [...prev, ...itemDataArr])
    }

    fetchItemData()
  }, [topStoriesArr, page])

  const handleLoadMoreButtonClick = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <ItemListContainer>
      {items.map((item: any, idx: number) => (
        <Item
          key={idx}
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
      <LoadMoreButton onClick={handleLoadMoreButtonClick}>More</LoadMoreButton>
    </ItemListContainer>
  )
}

export default ItemList
