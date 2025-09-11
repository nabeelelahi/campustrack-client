import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Avatar } from 'antd'
import { menu } from './sidebarLink'
// import DarkModeToggle from "react-dark-mode-toggle";
import { Header } from 'antd/es/layout/layout';
// import { useTheme } from '../../../context/Themeprovider';
import { useColors } from '../../../../config/color';


type Props = {
    collapsed: boolean
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
    drawerVisible: boolean
    setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>
    isMobile: boolean
}

function Headers({ collapsed, setCollapsed, drawerVisible, setDrawerVisible, isMobile }: Props) {
    // const { isDarkMode, toggleTheme } = useTheme() as any;
    const colors = useColors();

    return (
        <Header style={{ padding: 0, boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }} className="flex justify-between items-center !px-6 rounded-[20px]  mx-6 mt-6 mb-8">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined style={{ color: colors.TextColor }} /> : <MenuFoldOutlined style={{ color: colors.TextColor }} />}
                onClick={isMobile ? () => setDrawerVisible(!drawerVisible) : () => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    // width: 60,
                    height: 64,
                }}
            />
            <div className='flex gap-4 items-center'>
                {/* <DarkModeToggle
                    onChange={() => toggleTheme()}
                    checked={isDarkMode}
                    size={50}
                /> */}
                <Dropdown overlay={menu}>
                    <Avatar className="cursor-pointer" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}

export default Headers