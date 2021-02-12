import { useEffect } from 'react'

const useFetchItemDetails = (
  endpoint: string,
  IDList: number[],
  page: number,
  pageLength: number,
  onComplete: (data: any[]) => void
) => {
  useEffect(() => {
    const fetchItemData = async () => {
      const itemsForCurrentPage: number[] = IDList.slice(page * pageLength, (page + 1) * pageLength)

      const itemDataPromises: Promise<Response>[] = itemsForCurrentPage.map(async (id: number) => {
        return fetch(endpoint.replace('{ID}', id.toString()))
      })

      const itemDataResponses: Response[] = await Promise.all([...itemDataPromises])

      const itemRawDataArr: any[] = await Promise.all([
        ...itemDataResponses.map((e: Response) => e.json()),
      ])

      onComplete(itemRawDataArr)
    }

    if (IDList.length > 0) {
      fetchItemData()
    }
  }, [IDList, page])
}

export default useFetchItemDetails
