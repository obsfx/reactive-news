import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

type Props = {
  itemID: number
  itemType: string
  itemNumber: number
  itemURL: string
  itemTitle: string
  itemTitleURL: string
  itemScore: string
  itemAuthor: string
  itemEpoch: number
  itemCommentCount: number
}

const Item = (props: Props) => {
  const {
    itemID,
    itemType,
    itemNumber,
    itemURL,
    itemTitle,
    itemTitleURL,
    itemScore,
    itemAuthor,
    itemEpoch,
    itemCommentCount,
  } = props

  const timeDiff = (itemEpoch: number) => {
    const diff = Math.abs(Date.now() - itemEpoch * 1000)

    const days: number = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours: number = Math.floor(diff / (1000 * 60 * 60))
    const minutes: number = Math.floor(diff / (1000 * 60))

    if (days >= 1) return `${days} days ago`
    if (hours >= 1) return `${hours} hours ago`

    return `${minutes} minutes ago`
  }

  return (
    <ItemContainer>
      <ItemNumber>{itemNumber}.</ItemNumber>
      <ItemBody>
        {itemURL ? (
          <ItemTitle href={itemURL}>
            {itemTitle}
            <ItemTitleURL> ({itemTitleURL})</ItemTitleURL>
          </ItemTitle>
        ) : (
          <ItemTitleRoute to={`/items/${itemID}`}>{itemTitle}</ItemTitleRoute>
        )}
        <ItemInfo>
          {itemScore} points by <ItemInfoLink to={`/items/${itemID}`}>{itemAuthor}</ItemInfoLink>
          {' | '}
          <ItemInfoLink to={`/items/${itemID}`}> {timeDiff(itemEpoch)}</ItemInfoLink>
          {itemType === 'story' && (
            <>
              {' | '}
              <ItemInfoLink to={`/items/${itemID}`}>
                {itemCommentCount > 0 ? `${itemCommentCount} comments` : 'discuss'}
              </ItemInfoLink>
            </>
          )}
        </ItemInfo>
      </ItemBody>
    </ItemContainer>
  )
}

export default Item
