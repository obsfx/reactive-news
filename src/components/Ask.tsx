import ItemList from './ItemList'

const Ask = () => {
  const endpoint: string = 'https://hacker-news.firebaseio.com/v0/askstories.json'
  return <ItemList listEndpoint={endpoint} />
}

export default Ask
