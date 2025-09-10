import { PlusOutlined } from '@ant-design/icons';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { request } from '../../repositories';
import { ResponseData } from '../../types';

function UploadFile({ setFile, file, type = 'image' }: { setFile: Dispatch<SetStateAction<string>>, file: string, type: 'image' | 'doc' }) {
    const [base64File, setBase64File] = useState<{ img: string, state: 'loading' | 'loaded' }>({ img: file, state: 'loaded' })

    const getBase64 = (img: File, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length)
            getBase64(e.target.files[0], (img: string) => setBase64File({ state: 'loading', img }))
        request('file/upload', 'post')
            .setBody({ mode: 'single', file: e.target.files?.[0] }, 'formData')
            // @ts-expect-error @ts-ignore
            .onSuccess((res: ResponseData<{ url: string }>) => {
                setBase64File({ state: 'loaded', img: res?.data?.url })
                if (setFile) setFile(res?.data?.url)
            })
            .call();
        // uploadFileToServer(e.target.files[0], 'single', (res: any) => {
        //     setBase64File({ state: 'loaded', img: res?.data?.link })
        // })
    }

    return (
        <div className='file-upload'>
            {
                type === 'image' ?
                    (
                        <>
                            <div className='d-flex flex-wrap'>
                                {
                                    base64File.img.length ?
                                        <label htmlFor='file-upload'>

                                            <img
                                                src={base64File.img as string}
                                                alt=''
                                                className={`!h-[100px] my-2 ${base64File.state === 'loading' && 'opacity-50'}`}
                                            />
                                        </label>
                                        :
                                        <label
                                            htmlFor='file-upload'
                                        >
                                            <div className='!h-[100px] !w-[100px] my-2 flex justify-center items-center border border-dashed border-[#333333]'>
                                                <PlusOutlined style={{ fontSize: '35px', color: '#333333' }} />
                                            </div>
                                        </label>
                                }
                            </div>
                            <input className='!hidden' onChange={onChange} id="file-upload" accept="image/png, image/gif, image/jpeg" type="file" capture="user" />
                        </>
                    )
                    :
                    <input onChange={onChange} id="file-upload" className='my-2' accept=".pdf" type="file" capture="user" />
           }
        </div>
    )
}

export default UploadFile