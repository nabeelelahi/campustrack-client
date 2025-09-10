import { Dispatch, SetStateAction } from 'react'
import CustomTable from './Table';
import { useRequest } from '../../hooks/useRequest';

function TableView({
    title,
    buttonText,
    columns,
    // open,
    setOpen,
    // updateData,
    // setUpdateData,
    url,
    method
}: {
    url: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    title: string;
    buttonText: string;
    columns: unknown[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    updateData: unknown;
    setUpdateData: Dispatch<SetStateAction<unknown>>
}) {
    const { data, loading } = useRequest(url, method, {
        type: 'mount'
    });
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <CustomTable
                title={title}
                buttonText={buttonText}
                onButtonClick={() => setOpen(true)}
                columns={columns}
                data={data}
            />
        )
    }
}

export default TableView
