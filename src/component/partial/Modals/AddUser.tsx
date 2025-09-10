
import { Button, Form, Modal, Select } from 'antd'
import { userForm } from '../../../config/form/user'
import BaseInput, { BaseInputProps } from '../../shared/BaseInput'
import { AddModalProps } from '../../../types'
import useFormOperations from '../../../hooks/useFormOperations'
import { request } from '../../../repositories'
import { useState } from 'react'
import Loader from '../../shared/Loader'

function AddUserModal(props: AddModalProps) {

    const { open, cbCancel, updateData } = props;
    const { handleFinish, loading } = useFormOperations({ ...props, url: 'user' });
    const [classes, setClasses] = useState<{ name: string, value: string }[]>([])
    const [inputLoading, setInputLoading] = useState(false)
    const [showClasses, setShowClasses] = useState(false)

    const onFinish = (values: Record<string, unknown>) => {
        handleFinish({ ...values, password: 'CampusTrack@123' })
    }

    const onRoleChange = (value: string) => {
        if (value === 'student') {
            setShowClasses(true)
            if(classes.length) return 
            setInputLoading(true)
            request('class', 'GET')
                .setParams({ limit: 100 })
                .onSuccess((res: any) => {
                    setInputLoading(false)
                    setClasses(res.data?.map((i: any) => ({ label: i.name, value: i._id })))
                    console.log(res.data)
                })
                .call()
        }
        else{
            setShowClasses(false)
        }
    }

    return (
        <Modal
            title={'Add User'}
            open={open === 'post' || open === 'patch'}
            onCancel={cbCancel}
            footer={null}
            centered
        >
            <Form
                layout='vertical'
                initialValues={updateData}
                onFinish={onFinish}
            >
                {userForm.map((item) => {
                    return (
                        <Form.Item
                            label={item.label}
                            key={item.name}
                            name={item.name}
                            rules={item.rules as never[]}
                        >
                            <BaseInput onChange={item.name === 'role' ? onRoleChange : () => { }} disabled={open === 'patch' && item.name === 'email'} {...item as BaseInputProps} />
                        </Form.Item>
                    )
                })}
                {
                    showClasses &&
                    <>
                        {
                            inputLoading ?
                                <Loader />
                                :
                                <Form.Item
                                    label={'Assign Classes'}
                                    name={'classes'}
                                    rules={[]}
                                >
                                    <Select
                                        allowClear
                                        mode="multiple"
                                        className='!rounded-[10px] h-[44px]'
                                        style={{ width: '100%' }}
                                        options={classes}
                                    />
                                </Form.Item>
                        }
                    </>
                }
                <Button loading={loading} htmlType='submit' >Submit</Button>
            </Form>
        </Modal>
    )
}

export default AddUserModal
