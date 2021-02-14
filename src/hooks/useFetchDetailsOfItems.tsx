import { useEffect, useState } from 'react'

const useFetchDetailsOfItems = (
  endpoint: string,
  IDList: number[],
  page: number,
  pageLength: number
): [string, any[]] => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'done'>('idle')
  const [itemRawDataArr, setItemRawDataArr] = useState<any[]>([])

  useEffect(() => {
    const fetchItemData = async () => {
      setStatus('pending')

      const itemsForCurrentPage: number[] = IDList.slice(page * pageLength, (page + 1) * pageLength)

      const itemDataPromises: Promise<Response>[] = itemsForCurrentPage.map(async (id: number) => {
        return fetch(endpoint.replace('{ID}', id.toString()))
      })

      let itemDataResponses: Response[]

      try {
        itemDataResponses = await Promise.all([...itemDataPromises])
      } catch (e) {
        throw new Error(
          `useFetchDetailsOfItems.tsx (itemDataResponses) | Promise Rejected =>  ${e}`
        )
      }

      try {
        let itemRawDataArr: any[] = await Promise.all([
          ...itemDataResponses.map((e: Response) => e.json()),
        ])

        setItemRawDataArr(itemRawDataArr)
      } catch (e) {
        throw new Error(`useFetchDetailsOfItems.tsx (itemRawDataArr) | Promise Rejected =>  ${e}`)
      }

      setStatus('done')
    }

    if (IDList.length > 0) {
      fetchItemData()
    }
  }, [IDList, page])

  return [status, itemRawDataArr]
}

export default useFetchDetailsOfItems
