import { LoadingOutlined } from '@ant-design/icons/lib/icons'
import { Spin } from 'antd'

function Loader() {
  return (
    <div className='flex items-center justify-center h-100 w-100'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#333333' }} spin />} />
    </div>
  )
}

export default Loader
