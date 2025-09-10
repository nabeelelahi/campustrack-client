import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { renderMenu } from './sidebarLink'
import { useColors } from '../../../config/color';


function Drawers({ drawerVisible, setDrawerVisible }: any) {
    const colors = useColors();
    return (
        <Drawer
            title="CampusTrack"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            closeIcon={<CloseOutlined style={{ color: 'white' }} />}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            style={{ height: '100vh', width: '60%', backgroundColor: colors.drawerColor, color: colors.TextColor }}
        >
            {renderMenu()}
        </Drawer>
    )
}

export default React.memo(Drawers)