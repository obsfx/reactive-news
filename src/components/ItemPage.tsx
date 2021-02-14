import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import useFetchDetailsOfItems from '../hooks/useFetchDetailsOfItems'
import ItemDetails from './ItemDetails'
import ItemLoader from './ItemLoader'

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  background-color: var(--item-details-background-color);
`

const ItemDetailsHead = styled.div`
  margin-bottom: 15px;
`

const ItemDetailsTitle = styled((props) => <Link {...props} />)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--item-title-color);

  &:hover {
    text-decoration: underline;
  }
`

const ItemDetailsText = styled.div`
  font-size: 12px;
  color: var(--item-details-text-color);
`

const ItemDetailsInfo = styled.div`
  font-size: 9px;
  color: var(--item-info-color);
  margin-top: 5px;
`

const ItemDetailsInfoLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--item-info-link-color);

  &:hover {
    text-decoration: underline;
  }
`

type ItemDetailsData = {
  by: string
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
  text: string
}

const ItemPage = () => {
  const { id } = useParams<{ id: string }>()
  const [itemID] = useState<number[]>([Number(id)])
  const [details, setDetails] = useState<ItemDetailsData | null>(null)

  const [status, itemRawDataArr] = useFetchDetailsOfItems(
    `https://hacker-news.firebaseio.com/v0/item/{ID}.json`,
    itemID,
    0,
    1
  )

  useEffect(() => {
    const [item] = itemRawDataArr

    if (item) {
      setDetails({
        by: item.by || '',
        id: item.id || -1,
        kids: item.kids || [],
        score: item.score || 0,
        time: item.time || 0,
        title: item.title || '',
        type: item.type || '',
        url: item.url || '',
        text: item.text || '',
      })
    }
  }, [itemRawDataArr])

  return (
    <ItemDetailsContainer>
      {details && (
        <ItemDetails
          itemAuthor={details.by}
          itemID={details.id}
          itemCommentCount={details.kids.length}
          itemScore={details.score}
          itemEpoch={details.time}
          itemTitle={details.title}
          itemType={details.type}
          itemText={details.text}
        />
      )}
    </ItemDetailsContainer>
  )
}

export default ItemPage
