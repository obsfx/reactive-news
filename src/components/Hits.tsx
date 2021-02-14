import ItemList from './ItemList'

const Hits = () => {
  const endpoint: string = 'https://hacker-news.firebaseio.com/v0/topstories.json'
  return <ItemList listEndpoint={endpoint}></ItemList>
}

export default Hits
