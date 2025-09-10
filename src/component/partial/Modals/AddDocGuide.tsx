
import { Button, Form, Modal, notification } from 'antd'
import BaseInput, { BaseInputProps } from '../../shared/BaseInput'
import { docGuideForm } from '../../../config/form/docGuide'
import { AddModalProps } from '../../../types';
import useFormOperations from '../../../hooks/useFormOperations';
import useFile from '../../../hooks/useFile';
import UploadFile from '../../shared/UploadFile';

function AddDocGuide(props: AddModalProps) {
    const { open, cbCancel, updateData } = props;
    const { handleFinish, loading } = useFormOperations({ ...props, url: 'doc-guide' })
    const [file, setFile] = useFile(updateData?.image_url || '')
    const onFinish = (values: Record<string, unknown>) => {
        if (!file.length) return notification.warning({ message: 'File not found', description: 'Please upload a file' })
        handleFinish({ ...values, file_url: file })
    }
    return (
        <Modal
            title={'Add Doc/Guide'}
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
                <UploadFile type='doc' file={file} setFile={setFile} />
                {docGuideForm.map((item) => {
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
                <Button loading={loading} htmlType='submit'  >Submit</Button>
            </Form>
        </Modal>
    )
}

export default AddDocGuide
