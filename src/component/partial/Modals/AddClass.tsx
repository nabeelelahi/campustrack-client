
import { Button, Form, Modal, Select } from 'antd'
import BaseInput, { BaseInputProps } from '../../shared/BaseInput'
import { classForm } from '../../../config/form/class'
import useFormOperations from '../../../hooks/useFormOperations'
import { AddModalProps } from '../../../types'
import { request } from '../../../repositories'
import { useEffect, useState } from 'react'
import Loader from '../../shared/Loader'

function AddClassModal(props: AddModalProps) {
    const { open, cbCancel, updateData } = props;
    const [students, setStudents] = useState<{ name: string, value: string }[]>([])
    const [teachers, setTeachers] = useState<{ name: string, value: string }[]>([])
    const [inputLoading, setInputLoading] = useState(false)
    const { handleFinish, loading } = useFormOperations({ ...props, url: 'class' })
    const onFinish = (values: Record<string, unknown>) => {
        console.log(values)
        handleFinish({ ...values })
    }

    const getUsers = () => {
        setInputLoading(true)
        request('user', 'GET')
            .setParams({ limit: 100 })
            .onSuccess((res: any) => {
                setInputLoading(false)
                setStudents(res.data?.filter((i: any) => i.role === 'student').map((i: any) => ({ label: i.name, value: i._id })))
                setTeachers(res.data?.filter((i: any) => i.role === 'teacher').map((i: any) => ({ label: i.name, value: i._id })))
            })
            .call()
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Modal
            title={'Add Class'}
            open={open === 'post' || open === 'patch'}
            onCancel={cbCancel}
            footer={null}
            centered
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
                initialValues={updateData}
            >
                {
                    (inputLoading && loading) ?
                        <Loader />
                        :
                        <>
                            {classForm.map((item) => {
                                return (
                                    <Form.Item
                                        label={item.label}
                                        key={item.name}
                                        name={item.name}
                                        rules={item.rules as never[]}
                                    >
                                        <BaseInput options={teachers} {...item as BaseInputProps} />
                                    </Form.Item>
                                )
                            })}
                            <Form.Item
                                label={'Students'}
                                name={'students'}
                                rules={[]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className='!rounded-[10px] h-[44px]'
                                    style={{ width: '100%' }}
                                    options={students}
                                />
                            </Form.Item>
                        </>
                }
                <Button loading={loading} htmlType='submit' >Submit</Button>
            </Form>
        </Modal>
    )
}

export default AddClassModal
