import { useState, useEffect } from 'react'

const useFetchItemIDs = (endpoint: string) => {
  const [itemIDs, setItemIDs] = useState<number[]>([])

  useEffect(() => {
    const getItemIDs = async () => {
      const response: Response = await fetch(endpoint)
      setItemIDs((await response.json()) || [])
    }

    getItemIDs()
  }, [])

  return itemIDs
}

export default useFetchItemIDs
