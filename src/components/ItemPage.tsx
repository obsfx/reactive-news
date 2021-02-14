import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import useFetchDetailsOfItems from '../hooks/useFetchDetailsOfItems'
import ItemDetails from './ItemDetails'
import ItemLoader from './ItemLoader'
import Comment from './Comment'

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  background-color: var(--item-details-background-color);
`

const ItemDetailsComments = styled.div`
  padding: 5px;
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
        <>
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

          <ItemDetailsComments>
            {details.kids.map((id: number) => (
              <Comment key={id} id={id} />
            ))}
          </ItemDetailsComments>
        </>
      )}
      {status !== 'done' && <ItemLoader width="100%" height="80px" margin="5px 0px" />}
    </ItemDetailsContainer>
  )
}

export default ItemPage
