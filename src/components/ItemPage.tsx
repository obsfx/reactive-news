import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
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

export type ItemDetailsData = {
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
  const [details, setDetails] = useState<ItemDetailsData | null>(null)

  useEffect(() => {
    const fetchItem = async (itemID: number) => {
      const response: Response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${itemID}.json`
      )

      const item: any = await response.json()

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

    fetchItem(Number(id))
  }, [])

  return (
    <ItemDetailsContainer>
      {details ? (
        <>
          <ItemDetails
            itemAuthor={details.by}
            itemID={details.id}
            itemScore={details.score}
            itemEpoch={details.time}
            itemTitle={details.title}
            itemText={details.text}
          />

          <ItemDetailsComments>
            {details.kids.map((kidID: number) => (
              <Comment key={kidID} id={kidID} />
            ))}
          </ItemDetailsComments>
        </>
      ) : (
        <ItemLoader width="100%" height="80px" margin="5px 0px" />
      )}
    </ItemDetailsContainer>
  )
}

export default ItemPage
