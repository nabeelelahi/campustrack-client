
import { Button, Form, Modal } from 'antd'
import BaseInput, { BaseInputProps } from '../../shared/BaseInput'
import { menuItemForm } from '../../../config/form/menuItem'
import useFormOperations from '../../../hooks/useFormOperations'
import { AddModalProps } from '../../../types'

function AddMenuItem(props: AddModalProps) {
    const { open, cbCancel, updateData } = props;
    const { handleFinish, loading } = useFormOperations({ ...props, url: 'menu-item' })
    const onFinish = (values: Record<string, unknown>) => {
        console.log(values)
        handleFinish({ ...values })
    }

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
                {menuItemForm.map((item) => {
                    return (
                        <Form.Item
                            label={item.label}
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

export default AddMenuItem
