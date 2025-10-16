import { useState, useEffect } from 'react'
import { Layout, Menu, Button, Avatar, Dropdown, Space, Drawer, Typography, message } from 'antd'
import { 
  DashboardOutlined, 
  FileTextOutlined, 
  UserOutlined, 
  MenuOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MyWork from './pages/MyWork'
import Profile from './pages/Profile'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const EmployeeLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) {
        setMobileDrawerVisible(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
    } else if (user) {
      const userData = JSON.parse(user)
      setUserInfo(userData)
      
      // Check if user is employee
      if (userData.role !== 'employee') {
        message.error('Bạn không có quyền truy cập trang này!')
        navigate('/admin')
      }
    }
  }, [navigate])

  const getActiveMenu = () => {
    const path = location.pathname
    if (path.includes('/dashboard')) return 'dashboard'
    if (path.includes('/mywork')) return 'mywork'
    if (path.includes('/profile')) return 'profile'
    return 'dashboard'
  }

  const handleMenuClick = (key) => {
    if (isMobile) {
      setMobileDrawerVisible(false)
    }
    const routes = {
      dashboard: '/employee',
      mywork: '/employee/mywork',
      profile: '/employee/profile'
    }
    if (routes[key]) {
      navigate(routes[key])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
    message.success('Đã đăng xuất thành công!')
    navigate('/login')
  }

  const handleProfileClick = () => {
    navigate('/employee/profile')
  }

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile Settings',
      icon: <SettingOutlined />,
      onClick: handleProfileClick,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ]

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: 'mywork',
      icon: <FileTextOutlined />,
      label: 'Công việc của tôi',
    },
  ]

  const renderContent = () => {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mywork" element={<MyWork />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    )
  }

  const renderSider = () => (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      width={250}
      style={{
        background: '#fff',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ 
        padding: '16px', 
        textAlign: 'center',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '16px'
      }}>
        <div style={{ 
          fontSize: collapsed ? '16px' : '20px', 
          fontWeight: 'bold',
          color: '#1890ff',
          marginBottom: '8px'
        }}>
          {collapsed ? 'NV' : 'Nhân Viên'}
        </div>
        {!collapsed && (
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Hệ thống quản lý công việc
          </Text>
        )}
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[getActiveMenu()]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
        style={{ border: 'none' }}
      />
    </Sider>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          styles={{ body: { padding: 0 } }}
        >
          {renderSider()}
        </Drawer>
      ) : (
        renderSider()
      )}

      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerVisible(true)}
                style={{ marginRight: '16px' }}
              />
            )}
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginRight: '16px' }}
              />
            )}
            <Typography.Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              {isMobile ? 'NV' : 'Nhân Viên'}
            </Typography.Title>
          </div>

          <Space>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#1890ff' }}
                />
                <Text strong>{userInfo?.name || 'Nhân Viên'}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ 
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 112px)'
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  )
}

export default EmployeeLayout
