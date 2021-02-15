import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ItemLoader from './ItemLoader'

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px 0px;
`

const ItemNumber = styled.span`
  margin-right: 10px;
  font-size: 12px;
  text-align: right;
  min-width: 25px;
  color: var(--item-number-color);
`

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`
const ItemTitle = styled.a`
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  color: var(--item-title-color);

  &:hover {
    text-decoration: underline;
  }
`

const ItemTitleRoute = styled((props) => <Link {...props} />)`
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  color: var(--item-title-color);

  &:hover {
    text-decoration: underline;
  }
`

const ItemTitleURL = styled.span`
  font-size: 10px;
  color: var(--item-title-url-color);
`

const ItemInfo = styled.div`
  font-size: 9px;
  color: var(--item-info-color);
  margin-top: 5px;
`

const ItemInfoLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--item-info-link-color);

  &:hover {
    text-decoration: underline;
  }
`

export type ItemData = {
  by: string
  id: number
  score: number
  time: number
  title: string
  type: string
  url: string
  text: string
}

type Props = {
  number: number
  id: number
}

const Item = (props: Props) => {
  const { number, id } = props
  const [item, setItem] = useState<ItemData | null>(null)

  useEffect(() => {
    const fetchItem = async (itemID: number) => {
      const response: Response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${itemID}.json`
      )

      const item: any = await response.json()

      setItem({
        by: item.by || '',
        id: item.id || -1,
        score: item.score || 0,
        time: item.time || 0,
        title: item.title || '',
        type: item.type || '',
        url: item.url || '',
        text: item.text || '',
      })
    }

    fetchItem(id)
  }, [])

  const timeDiff = (epoch: number) => {
    const diff = Math.abs(Date.now() - epoch * 1000)

    const days: number = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours: number = Math.floor(diff / (1000 * 60 * 60))
    const minutes: number = Math.floor(diff / (1000 * 60))

    if (days >= 1) return `${days} days ago`
    if (hours >= 1) return `${hours} hours ago`

    return `${minutes} minutes ago`
  }

  return (
    <ItemContainer>
      <ItemNumber>{number}.</ItemNumber>
      {item ? (
        <ItemBody>
          {item.url !== '' ? (
            <ItemTitle href={item.url}>
              {item.title}
              <ItemTitleURL> ({item.url.split('/')[2]})</ItemTitleURL>
            </ItemTitle>
          ) : (
            <ItemTitleRoute to={`/items/${item.id}`}>{item.title}</ItemTitleRoute>
          )}
          <ItemInfo>
            {item.score} points by <ItemInfoLink to={`/items/${item.id}`}>{item.by}</ItemInfoLink>
            {' | '}
            <ItemInfoLink to={`/items/${item.id}`}> {timeDiff(item.time)}</ItemInfoLink>
            {item.type === 'story' && (
              <>
                {' | '}
                <ItemInfoLink to={`/items/${item.id}`}>discuss</ItemInfoLink>
              </>
            )}
          </ItemInfo>
        </ItemBody>
      ) : (
        <ItemLoader width="100%" height="45px" margin="2px 0px" />
      )}
    </ItemContainer>
  )
}

export default Item
