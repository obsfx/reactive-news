import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import ItemLoader from './ItemLoader'

const CommentContainer = styled.li`
  &::marker {
    color: var(--comment-container-marker-color);
  }
`

const CommentInfo = styled.div`
  font-size: 10px;
  color: var(--comment-info-color);
  margin-top: 5px;
`

const CommentText = styled.div`
  font-size: 12px;
  color: var(--comment-text-color);

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  a {
    color: var(--comment-text-link-color);
  }
`

const CommentChilds = styled.ul`
  margin: 2px 0px;
  border-left: 1px dashed var(--comment-childs-border-color);
`

type CommentData = {
  comment: {
    by: string
    id: number
    time: number
    text: string
  }
  childs: CommentData[]
}

type Props = {
  id: number
}

const Comment = (props: Props) => {
  const { id } = props
  const [commentData, setCommentData] = useState<CommentData | null>(null)

  useEffect(() => {
    const fetchComment = async (id: number): Promise<CommentData> => {
      const response: Response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      )
      const comment: any = await response.json()

      const rawCommentData: any[] = comment.kids
        ? await Promise.all([...comment.kids.map((id: number) => fetchComment(id))])
        : []

      let childs: CommentData[] = rawCommentData.map((item: any) => ({
        comment: {
          by: item.comment.by || '',
          id: item.comment.id || -1,
          time: item.comment.time || 0,
          text: item.comment.text || '',
        },
        childs: item.childs,
      }))

      return {
        comment,
        childs,
      }
    }

    const setComments = async () => {
      const commentData: CommentData = await fetchComment(id)
      setCommentData(commentData)
    }

    setComments()
  }, [])

  const createCommentTree = (commentData: CommentData): React.ReactNode => {
    const { comment, childs } = commentData

    return (
      <CommentContainer key={comment.id}>
        <CommentInfo>
          {comment.by} {timeDiff(comment.time)}
        </CommentInfo>
        <CommentText>{ReactHtmlParser(comment.text)}</CommentText>
        <CommentChilds>
          {childs.map((child: CommentData) => createCommentTree(child))}
        </CommentChilds>
      </CommentContainer>
    )
  }

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
    <CommentChilds>
      {commentData === null ? (
        <ItemLoader width="100%" height="80px" margin="5px 0px" />
      ) : (
        createCommentTree(commentData)
      )}
    </CommentChilds>
  )
}

export default Comment
