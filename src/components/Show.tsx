import ItemList from './ItemList'

const Show = () => {
  const endpoint: string = 'https://hacker-news.firebaseio.com/v0/showstories.json'
  return <ItemList listEndpoint={endpoint} />
}

export default Show
