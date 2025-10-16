import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { Layout, Menu, Input, Button, Avatar, Badge, Dropdown, Drawer, message } from 'antd'
import {
  DashboardOutlined,
  CheckSquareOutlined,
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  SearchOutlined,
  PlusOutlined,
  BulbOutlined,
  BellOutlined,
  DownOutlined,
  MenuOutlined
} from '@ant-design/icons'
import Dashboard from './pages/Dashboard'
import MyTask from './pages/MyTask'
import Customer from './pages/Customer'
import Employee from './pages/Employee'
import Statistics from './pages/Statistics'
import Profile from '../profile/profile'
import './AdminLayout.css'

const { Header, Sider, Content } = Layout
const { Search } = Input

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Get current active menu from URL
  const getActiveMenu = () => {
    const path = location.pathname
    if (path.includes('/customer')) return 'customer'
    if (path.includes('/mytask')) return 'mytask'
    if (path.includes('/employee')) return 'employee'
    if (path.includes('/statistics')) return 'statistics'
    if (path.includes('/profile')) return 'profile'
    return 'dashboard'
  }

  const [activeMenu, setActiveMenu] = useState(getActiveMenu())

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Update active menu when location changes
  useEffect(() => {
    setActiveMenu(getActiveMenu())
  }, [location.pathname])

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: 'mytask',
      icon: <CheckSquareOutlined />,
      label: 'Công việc của tôi',
    },
    {
      key: 'customer',
      icon: <UserOutlined />,
      label: 'Khách hàng',
    },
    {
      key: 'employee',
      icon: <TeamOutlined />,
      label: 'Nhân viên',
    },
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: 'Thống kê',
    }
  ]

  const renderContent = () => {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mytask" element={<MyTask />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    )
  }

  const handleMenuClick = (key) => {
    setActiveMenu(key)
    if (isMobile) {
      setMobileDrawerVisible(false)
    }
    
    // Navigate to the selected page
    const routes = {
      dashboard: '/admin',
      mytask: '/admin/mytask',
      customer: '/admin/customer',
      employee: '/admin/employee',
      statistics: '/admin/statistics'
    }
    
    if (routes[key]) {
      navigate(routes[key])
    }
  }

  const handleLogout = () => {
    // Xóa token hoặc thông tin user khỏi localStorage/sessionStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
    
    // Hiển thị thông báo
    message.success('Đã đăng xuất thành công!')
    
    // Chuyển về trang login
    navigate('/login')
  }

  const handleProfileClick = () => {
    navigate('/admin/profile')
  }

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile Settings',
      onClick: handleProfileClick,
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  const renderSiderContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '24px', borderBottom: '1px solid #f0f0f0' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: isMobile ? '20px' : '24px', 
          fontWeight: 'bold', 
          color: '#1890ff' 
        }}>
          Mondays
        </h1>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
        style={{
          border: 'none',
          padding: '16px 8px',
        }}
      />

      {/* User Profile */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        borderTop: '1px solid #f0f0f0',
        background: '#fff'
      }}>
        <Dropdown
          menu={{ 
            items: userMenuItems,
            onClick: ({ key }) => {
              if (key === 'logout') {
                handleLogout()
              } else if (key === 'profile') {
                handleProfileClick()
              }
            }
          }}
          trigger={['click']}
          placement="topLeft"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s'
          }}>
            <Avatar 
              size={40} 
              style={{ 
                background: 'linear-gradient(135deg, #1890ff, #722ed1)' 
              }}
            >
              U
            </Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontWeight: 500, 
                fontSize: '14px',
                color: '#262626',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                User Admin
              </div>
              <div style={{ 
                fontSize: '12px',
                color: '#8c8c8c',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                admin@company.com
              </div>
            </div>
            <DownOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
          </div>
        </Dropdown>
      </div>
    </>
  )

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          styles={{ body: { padding: 0 } }}
          width={280}
          style={{ zIndex: 1000 }}
        >
          {renderSiderContent()}
        </Drawer>
      )}

      {/* Desktop Sider */}
      {!isMobile && (
        <Sider
          width={280}
          style={{
            background: '#fff',
            boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          {renderSiderContent()}
        </Sider>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : 280 }}>
        {/* Header */}
        <Header style={{
          background: '#fff',
          padding: isMobile ? '0 16px' : '0 24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          right: 0,
          left: isMobile ? 0 : 280,
          zIndex: 99,
          height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button 
                type="text" 
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerVisible(true)}
                style={{ marginRight: '8px' }}
              />
            )}
            
            <Search
              placeholder="Search or type a command"
              style={{ width: isMobile ? 200 : 400 }}
              size={isMobile ? 'middle' : 'large'}
              prefix={<SearchOutlined />}
              suffix={
                !isMobile && (
                  <span style={{
                    background: '#f5f5f5',
                    color: '#8c8c8c',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    ⌘F
                  </span>
                )
              }
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
            
            {!isMobile && (
              <Button 
                type="text" 
                icon={<BulbOutlined />}
                size="middle"
                style={{ color: '#8c8c8c' }}
              />
            )}
            
            <Badge count={5} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined />}
                size="middle"
                style={{ color: '#8c8c8c' }}
              />
            </Badge>
            
            <Avatar 
              size={isMobile ? 28 : 32} 
              style={{ 
                background: 'linear-gradient(135deg, #1890ff, #722ed1)' 
              }}
            >
              U
            </Avatar>
          </div>
        </Header>

        {/* Content Area */}
        <Content 
          className="admin-content"
          style={{
            marginTop: '64px',
            padding: isMobile ? '16px' : '24px',
            background: '#f5f5f5',
            height: 'calc(100vh - 64px)',
            overflow: 'auto'
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            padding: isMobile ? '16px' : '24px',
            minHeight: '100%'
          }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout