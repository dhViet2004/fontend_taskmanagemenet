import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Avatar, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  message, 
  Row, 
  Col, 
  Typography, 
  Divider,
  Upload,
  Space
} from 'antd'
import dayjs from 'dayjs'
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  CalendarOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form] = Form.useForm()

  // Get user info from localStorage
  const [userInfo, setUserInfo] = useState({
    id: 1,
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    phone: '+84 123 456 789',
    address: 'Hà Nội, Việt Nam',
    birthday: '1990-01-01',
    bio: 'Quản trị viên hệ thống',
    avatar: null
  })

  useEffect(() => {
    // Load user info from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserInfo(prev => ({ ...prev, ...user }))
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone || '+84 123 456 789',
        address: user.address || 'Hà Nội, Việt Nam',
        birthday: user.birthday ? dayjs(user.birthday, 'YYYY-MM-DD') : dayjs('1990-01-01', 'YYYY-MM-DD'),
        bio: user.bio || 'Quản trị viên hệ thống'
      })
    }
  }, [form])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = async (values) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user info
      const updatedUser = {
        ...userInfo,
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : userInfo.birthday
      }
      
      setUserInfo(updatedUser)
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      message.success('Cập nhật thông tin thành công!')
      setEditing(false)
    } catch {
      message.error('Có lỗi xảy ra khi cập nhật thông tin!')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    // Reset form to original values
    form.setFieldsValue({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      birthday: userInfo.birthday ? dayjs(userInfo.birthday, 'YYYY-MM-DD') : null,
      bio: userInfo.bio
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            Thông tin cá nhân
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Card */}
          <Col xs={24} lg={8}>
            <Card className="text-center">
              <div className="mb-6">
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />}
                  className="mb-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                    fontSize: '48px'
                  }}
                />
                <Title level={3} className="!mb-2">
                  {userInfo.name}
                </Title>
                <Text className="text-gray-500 block mb-2">
                  {userInfo.email}
                </Text>
                <Text className="text-blue-500 font-medium">
                  {userInfo.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                </Text>
              </div>

              <Divider />

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <PhoneOutlined className="text-gray-400" />
                  <Text>{userInfo.phone}</Text>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <EnvironmentOutlined className="text-gray-400" />
                  <Text>{userInfo.address}</Text>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CalendarOutlined className="text-gray-400" />
                  <Text>{userInfo.birthday}</Text>
                </div>
              </div>

              <Divider />

              <div className="text-left">
                <Text className="font-medium block mb-2">Giới thiệu</Text>
                <Text className="text-gray-600">
                  {userInfo.bio}
                </Text>
              </div>
            </Card>
          </Col>

          {/* Edit Form */}
          <Col xs={24} lg={16}>
            <Card 
              title={
                <div className="flex justify-between items-center">
                  <span>Chỉnh sửa thông tin</span>
                  {!editing && (
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />}
                      onClick={handleEdit}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              }
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                disabled={!editing}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />}
                        placeholder="Nhập họ và tên"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined />}
                        placeholder="Nhập email"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                    >
                      <Input 
                        prefix={<PhoneOutlined />}
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="birthday"
                      label="Ngày sinh"
                    >
                      <DatePicker 
                        className="w-full"
                        placeholder="Chọn ngày sinh"
                        format="DD/MM/YYYY"
                        disabledDate={(current) => current && current > dayjs().endOf('day')}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="address"
                  label="Địa chỉ"
                >
                  <Input 
                    prefix={<EnvironmentOutlined />}
                    placeholder="Nhập địa chỉ"
                  />
                </Form.Item>

                <Form.Item
                  name="bio"
                  label="Giới thiệu"
                >
                  <TextArea 
                    rows={4}
                    placeholder="Nhập giới thiệu về bản thân"
                  />
                </Form.Item>

                {editing && (
                  <div className="flex justify-end gap-2">
                    <Button onClick={handleCancel}>
                      Hủy
                    </Button>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      loading={loading}
                      icon={<SaveOutlined />}
                    >
                      Lưu thay đổi
                    </Button>
                  </div>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Profile
