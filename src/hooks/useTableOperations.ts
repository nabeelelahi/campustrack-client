import { useEffect, useState } from "react";
import { useRequest } from "../hooks/useRequest";
import { ResponseData } from "../types";


const useTableOperations = (url: string) => {
  const [open, setOpen] = useState<'post' | 'patch' | 'none'>('none');
  const [updateData, setUpdateData] = useState<{ [key: string]: never; } | null>();
  const { data, loading, setData, execute, service } = useRequest(url, 'get', {
    type: 'mount'
  });
  const [params, setParams] = useState<{ [key: string]: any; }>({ page: 1 })
  const cbSuccess = (response: ResponseData<unknown>) => {
    if (open === 'post')
      setData((p: never) => [response.data, ...p])
    else
      // @ts-expect-error @ts-ignore
      setData((p: never) => p.map((item: never) => item._id === response.data._id ? response.data : item))
    setOpen('none')
    setUpdateData(null)
  }
  const cbCancel = () => {
    setOpen('none')
    setUpdateData(null)
  }
  const onEditClick = (record: { [key: string]: never }) => {
    console.log(record)
    setUpdateData(record)
    setOpen('patch')
  }

  const onButtonClick = () => {
    setUpdateData(null)
    setOpen('post')
  }

  const onFilterChange = (data: { [key: string]: any }) => {
    setParams(p => ({ ...p, ...data, }))
  }

  useEffect(() => {
    console.log(params)
    service.setParams(params)
    execute()
  }, [params])

  return {
    open,
    setOpen,
    updateData,
    setUpdateData,
    cbSuccess,
    cbCancel,
    onEditClick,
    data,
    loading,
    onButtonClick,
    onFilterChange
  }

}

export default useTableOperations