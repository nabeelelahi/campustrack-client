
import { Button, Form, Modal } from 'antd'
import BaseInput, { BaseInputProps } from '../../shared/BaseInput'
import { changePasswordForm } from '../../../config/form/changePassword'
import { Dispatch, SetStateAction } from 'react'
import { useRequest } from '../../../hooks/useRequest'

function ChangePassword(props: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { open, setOpen } = props;
    const { execute, loading } = useRequest('user/change-password', 'POST', { type: 'mount' })
    const onFinish = (values: Record<string, string>) => {
        execute({
            body: values,
            cbSuccess: () => setOpen(false)
        })
    }


    return (
        <Modal
            title={'Change Password'}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            centered
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                {changePasswordForm.map((item) => {
                    return (
                        <Form.Item
                            label={item.title}
                            key={item.name}
                            name={item.name}
                            rules={item.rules as never[]}
                        >
                            <BaseInput {...item as BaseInputProps} />
                        </Form.Item>
                    )
                })}
                <Button loading={loading} htmlType='submit' >Submit</Button>
            </Form>
        </Modal>
    )
}

export default ChangePassword
