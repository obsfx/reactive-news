import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  background-color: var(--item-details-background-color);
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
  margin-top: 15px;
  font-size: 12px;
  color: var(--item-details-text-color);

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  a {
    color: var(--item-details-text-link-color);
  }
`

const ItemDetailsInfo = styled.div`
  font-size: 12px;
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

type Props = {
  itemAuthor: string
  itemID: number
  itemScore: number
  itemEpoch: number
  itemTitle: string
  itemText: string
}

const ItemDetails = (props: Props) => {
  const { itemAuthor, itemID, itemScore, itemEpoch, itemTitle, itemText } = props

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
    <ItemDetailsContainer>
      <>
        <ItemDetailsTitle to={`/items/${itemID}`}>{itemTitle}</ItemDetailsTitle>
        <ItemDetailsInfo>
          {itemScore} points by{' '}
          <ItemDetailsInfoLink to={`/items/${itemID}`}>{itemAuthor}</ItemDetailsInfoLink>
          {' | '}
          <ItemDetailsInfoLink to={`/items/${itemID}`}> {timeDiff(itemEpoch)}</ItemDetailsInfoLink>
        </ItemDetailsInfo>
      </>

      {itemText !== '' && <ItemDetailsText>{ReactHtmlParser(itemText)}</ItemDetailsText>}
    </ItemDetailsContainer>
  )
}

export default ItemDetails
