import { useEffect, useState } from 'react'
import styled from 'styled-components'
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

const ItemList = () => {
  const [topStoriesArr, setTopStoriesArr] = useState<number[]>([])
  const [loaderCount, setLoaderCount] = useState<number>(0)
  const [items, setItems] = useState<ItemData[]>([])
  const [loadButtonVisibility, setLoadButtonVisibility] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)

  const pageLength: number = 30

  useEffect(() => {
    const getTopStories = async () => {
      setLoaderCount(pageLength)

      const topStoriesResponse: Response = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      )
      setTopStoriesArr((await topStoriesResponse.json()) || [])
    }
    getTopStories()
  }, [])

  useEffect(() => {
    const fetchItemData = async () => {
      setLoadButtonVisibility(false)

      const itemsForCurrentPage = topStoriesArr.slice(page * pageLength, (page + 1) * pageLength)

      setLoaderCount(itemsForCurrentPage.length)

      const itemDataPromises: Promise<Response>[] = itemsForCurrentPage.map(async (e: number) => {
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
      setLoaderCount(0)

      if (itemsForCurrentPage.length === pageLength) {
        setLoadButtonVisibility(true)
      }
    }

    if (topStoriesArr.length > 0) {
      fetchItemData()
    }
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

      {new Array(loaderCount).fill(<ItemLoader />)}

      {loadButtonVisibility && (
        <LoadMoreButton onClick={handleLoadMoreButtonClick}>More</LoadMoreButton>
      )}
    </ItemListContainer>
  )
}

export default ItemList
