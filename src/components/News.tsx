import ItemList from './ItemList'

const News = () => {
  const endpoint: string = 'https://hacker-news.firebaseio.com/v0/newstories.json'
  return <ItemList listEndpoint={endpoint} />
}

export default News
