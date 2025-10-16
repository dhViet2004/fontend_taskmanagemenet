import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Card,
    Typography,
    message,
    Checkbox,
    Divider,
    Space,
    Row,
    Col
} from 'antd'
import {
    UserOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    MailOutlined,
    GoogleOutlined,
    FacebookOutlined
} from '@ant-design/icons'

const { Title, Text, Link } = Typography

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token && user) {
            const userData = JSON.parse(user)
            if (userData.role === 'employee') {
                navigate('/employee')
            } else if (userData.role === 'manager') {
                navigate('/admin')
            }
        }
    }, [navigate])

    const handleLogin = async (values) => {
        try {
            setLoading(true)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock authentication - replace with real API call
            // Database of users with their roles
            const users = [
                {
                    email: 'employee@company.com',
                    password: 'employee123',
                    id: 2,
                    name: 'Nhân viên',
                    role: 'employee'
                }
            ]

            // Find user by email and password
            const user = users.find(u => u.email === values.email && u.password === values.password)

            if (user) {
                // Save user info to localStorage
                const userInfo = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

                localStorage.setItem('token', 'mock-jwt-token')
                localStorage.setItem('user', JSON.stringify(userInfo))

                message.success(`Đăng nhập thành công! Chào mừng ${user.name}`)
                
                // Navigate based on role
                if (userInfo.role === 'employee') {
                    navigate('/employee')
                } else if (userInfo.role === 'manager') {
                    navigate('/admin')
                }
            } else {
                message.error('Email hoặc mật khẩu không đúng!')
            }
        } catch {
            message.error('Có lỗi xảy ra khi đăng nhập!')
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = () => {
        message.info('Chức năng quên mật khẩu đang được phát triển!')
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(https://res.cloudinary.com/dh1o42tjk/image/upload/v1760602048/background_f9k4ko.jpg)'
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0"></div>

            <div className="relative z-10 w-full max-w-md mx-4 px-4 sm:px-0">
                <Card
                    className="backdrop-blur-sm bg-white bg-opacity-95 border-0 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
                    variant="borderless"
                >
                    {/* Logo and Title */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Title
                                level={2}
                                className="!m-0 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text !text-blue-500 font-bold text-xl sm:text-2xl"
                            >
                                PhucReport.com
                            </Title>
                        </div>
                        <Title level={3} className="!m-0 !mb-2 text-gray-800 font-semibold text-lg sm:text-xl">
                            Chào mừng trở lại!
                        </Title>
                        <Text className="text-gray-500 text-xs sm:text-sm">
                            Đăng nhập để tiếp tục quản lý công việc
                        </Text>
                    </div>

                    {/* Login Form */}
                    <Form
                        form={form}
                        name="login"
                        onFinish={handleLogin}
                        layout="vertical"
                        size="large"
                        className="mb-4 sm:mb-6"
                    >
                        <Form.Item
                            name="email"
                            label={<span className="font-medium text-gray-700 text-sm sm:text-base">Email</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-gray-400" />}
                                placeholder="Nhập email của bạn"
                                className="h-10 sm:h-12 rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:shadow-sm transition-all duration-200"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span className="font-medium text-gray-700 text-sm sm:text-base">Mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Nhập mật khẩu"
                                className="h-10 sm:h-12 rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:shadow-sm transition-all duration-200"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>


                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                            <Form.Item name="remember" valuePropName="checked" className="!mb-0">
                                <Checkbox className="text-gray-600 text-xs sm:text-sm">Ghi nhớ đăng nhập</Checkbox>
                            </Form.Item>
                            <Link
                                onClick={handleForgotPassword}
                                className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm transition-colors duration-200 text-center sm:text-right"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Form.Item className="!mb-4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="h-10 sm:h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:-translate-y-0.5"
                                block
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Demo Credentials */}
                    <div className="text-center mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Text className="text-xs text-gray-600 font-semibold block mb-2">
                            Tài khoản demo:
                        </Text>
                        <div className="space-y-1">
                            <Text className="text-xs text-gray-500 block">
                                <strong>Quản lý:</strong> manager@company.com / manager123
                            </Text>
                            <Text className="text-xs text-gray-500 block">
                                <strong>Nhân viên:</strong> employee@company.com / employee123
                            </Text>
                            <Text className="text-xs text-gray-500 block">
                                <strong>NV001:</strong> nv001@company.com / nv001123
                            </Text>
                            <Text className="text-xs text-gray-500">
                                <strong>NV002:</strong> nv002@company.com / nv002123
                            </Text>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login
