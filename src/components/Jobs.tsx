import ItemList from './ItemList'

const Jobs = () => {
  const endpoint: string = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
  return <ItemList listEndpoint={endpoint}></ItemList>
}

export default Jobs
