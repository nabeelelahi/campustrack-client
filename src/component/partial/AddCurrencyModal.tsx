// import AuthButton from '../partial/AuthButton'
// import { Form, Modal } from 'antd'
// import BaseInput from '../shared/BaseInput'
// import Text from '../higherOrder/Text'
// import { AddBankModalProps } from '../../types'
// import { useRequest } from '../../hooks'
// import { postCurrency } from '../../repositories'
// import { currencyFields } from '../../config/dummy-data/form/currency'

// function AddCurrency({ isOpen, setIsOpen, cbSuccess }: AddBankModalProps) {
//     const {execute, loading} = useRequest(postCurrency.url, postCurrency.method, { auth: true, type: 'delay' });
//     const onFinish = (values: any) => {
//         execute({
//             body: values,
//             cbSuccess: cbSuccess
//         })
//     }
//     return (
//         <Modal
//             title={
//                 <Text className='text-[22px] text-[#171717] roboto-semibold' text={'add currency'} />
//             }
//             open={isOpen}
//             loading={loading}
//             onCancel={() => setIsOpen(false)}
//             footer={null}
//             centered
//         >
//             <Form
//                 layout='vertical'
//                 onFinish={onFinish}
//             >
//                 {currencyFields.map((item: any) => {
//                     return (
//                         <Form.Item
//                             label={item.label}
//                             key={item.name}
//                             name={item.name}
//                             rules={item.rules}
//                         >
//                             <BaseInput {...item} />
//                         </Form.Item>
//                     )
//                 })}
//                 <AuthButton loading={loading} htmlType='submit' text={'save'} />
//             </Form>
//         </Modal>
//     )
// }

// export default AddCurrency
