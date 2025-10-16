import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Avatar, Button, Form, Input, Select, DatePicker, message, Row, Col, Typography, Divider, Upload, Space } from 'antd'
import dayjs from 'dayjs'
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, EditOutlined, SaveOutlined, CameraOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form] = Form.useForm()

  const [userInfo, setUserInfo] = useState({
    id: 1,
    name: 'Employee User',
    email: 'employee@company.com',
    role: 'employee',
    phone: '+84 123 456 789',
    address: 'Hà Nội, Việt Nam',
    birthday: '1990-01-01',
    bio: 'Nhân viên chuyên nghiệp',
    avatar: null,
    employeeCode: 'NV00001',
    department: 'Phòng Kỹ thuật',
    position: 'Nhân viên',
    startDate: '2023-01-01',
    salary: 15000000
  })

  useEffect(() => {
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
        bio: user.bio || 'Nhân viên chuyên nghiệp',
        employeeCode: user.employeeCode || 'NV00001',
        department: user.department || 'Phòng Kỹ thuật',
        position: user.position || 'Nhân viên',
        startDate: user.startDate ? dayjs(user.startDate, 'YYYY-MM-DD') : dayjs('2023-01-01', 'YYYY-MM-DD'),
        salary: user.salary || 15000000
      })
    }
  }, [form])

  const handleSave = async (values) => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedUser = {
        ...userInfo,
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : userInfo.birthday,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : userInfo.startDate
      }
      
      setUserInfo(updatedUser)
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
    form.setFieldsValue({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      birthday: userInfo.birthday ? dayjs(userInfo.birthday, 'YYYY-MM-DD') : null,
      bio: userInfo.bio,
      employeeCode: userInfo.employeeCode,
      department: userInfo.department,
      position: userInfo.position,
      startDate: userInfo.startDate ? dayjs(userInfo.startDate, 'YYYY-MM-DD') : null,
      salary: userInfo.salary
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
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
          {/* Avatar and Basic Info */}
          <Col xs={24} lg={8}>
            <Card className="text-center">
              <div className="mb-6">
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#1890ff', fontSize: '48px' }}
                />
                <div className="mt-4">
                  <Title level={4} className="!mb-1">{userInfo.name}</Title>
                  <Text type="secondary">{userInfo.position}</Text>
                </div>
              </div>
              
              <Divider />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Text strong>Mã nhân viên:</Text>
                  <Text code>{userInfo.employeeCode}</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text strong>Phòng ban:</Text>
                  <Text>{userInfo.department}</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text strong>Ngày vào làm:</Text>
                  <Text>{new Date(userInfo.startDate).toLocaleDateString('vi-VN')}</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text strong>Mức lương:</Text>
                  <Text strong style={{ color: '#52c41a' }}>
                    {formatCurrency(userInfo.salary)}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          {/* Detailed Information */}
          <Col xs={24} lg={16}>
            <Card 
              title="Thông tin chi tiết"
              extra={
                !editing ? (
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={() => setEditing(true)}
                  >
                    Chỉnh sửa
                  </Button>
                ) : (
                  <Space>
                    <Button onClick={handleCancel}>
                      Hủy
                    </Button>
                    <Button 
                      type="primary" 
                      icon={<SaveOutlined />}
                      loading={loading}
                      onClick={() => form.submit()}
                    >
                      Lưu
                    </Button>
                  </Space>
                )
              }
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                disabled={!editing}
              >
                <Row gutter={16}>
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

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
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

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="department"
                      label="Phòng ban"
                    >
                      <Select placeholder="Chọn phòng ban">
                        <Option value="Phòng Kỹ thuật">Phòng Kỹ thuật</Option>
                        <Option value="Phòng Marketing">Phòng Marketing</Option>
                        <Option value="Phòng Kinh doanh">Phòng Kinh doanh</Option>
                        <Option value="Phòng Nhân sự">Phòng Nhân sự</Option>
                        <Option value="Phòng Tài chính">Phòng Tài chính</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="position"
                      label="Chức vụ"
                    >
                      <Select placeholder="Chọn chức vụ">
                        <Option value="Nhân viên">Nhân viên</Option>
                        <Option value="Trưởng nhóm">Trưởng nhóm</Option>
                        <Option value="Chuyên viên">Chuyên viên</Option>
                        <Option value="Thực tập sinh">Thực tập sinh</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="bio"
                  label="Giới thiệu bản thân"
                >
                  <Input.TextArea 
                    rows={4} 
                    placeholder="Giới thiệu về bản thân, kinh nghiệm, kỹ năng..."
                  />
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Profile
