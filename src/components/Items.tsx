import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  background-color: var(--item-background-color);
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px 0px;
`

const ItemNumber = styled.span`
  margin-right: 10px;
  font-size: 14px;
  text-align: right;
  min-width: 25px;
`

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`

const ItemTitle = styled.a`
  text-decoration: none;
  font-size: 14px;
  color: var(--item-title-color);

  &:hover {
    color: var(--item-title-hover-color);
  }
`

const ItemTitleURL = styled.span`
  font-size: 12px;
  color: var(--item-title-url-color);
`

const ItemInfo = styled.div`
  font-size: 10px;
  margin-top: 5px;
  color: var(--item-info-color);
`

const Items = () => {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const getTopstories = async () => {
      const topstoriesEndspoint: string = 'https://hacker-news.firebaseio.com/v0/topstories.json'
      const topstoriesResponse: Response = await fetch(topstoriesEndspoint)
      const topstoriesArr: any = await topstoriesResponse.json()

      for (let i: number = 0; i < 30; i++) {
        const itemID: number = topstoriesArr[i]
        const itemEndpoint: string = `https://hacker-news.firebaseio.com/v0/item/${itemID}.json`
        const itemResponse: Response = await fetch(itemEndpoint)
        const itemData: any = await itemResponse.json()

        setItems((prev) => [...prev, itemData])
      }

      //const itemPromises: Promise<Response>[] = topstoriesArr.map(async (e: number) => {
      //  return fetch(itemEndpoint)
      //})

      //const itemResponses: Response[] = await Promise.all([...itemPromises])
      //const items: any[] = await Promise.all([...itemResponses.map((e: Response) => e.json())])

      //console.log(items)
    }

    getTopstories()
  }, [])

  return (
    <ItemsContainer>
      {items.map((item: any, idx: number) => (
        <Item key={idx}>
          <ItemNumber>{idx + 1}</ItemNumber>
          <ItemBody>
            <ItemTitle href={item.url}>
              {item.title}
              <ItemTitleURL> ({item.url && item.url.split('/')[2]})</ItemTitleURL>
            </ItemTitle>
            <ItemInfo>
              {item.score} points by {item.by}
            </ItemInfo>
          </ItemBody>
        </Item>
      ))}
    </ItemsContainer>
  )
}

export default Items
