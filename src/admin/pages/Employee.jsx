import { Row, Col, Card, Button, Table, Tag, Input, Select, Avatar, Space, Modal, Form, DatePicker, message, Popconfirm, Drawer, List, InputNumber, Tooltip } from 'antd'
import { PlusOutlined, SearchOutlined, UserOutlined, PhoneOutlined, MailOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DollarOutlined, CalendarOutlined, KeyOutlined, BankOutlined, EyeInvisibleOutlined, EyeTwoTone, ReloadOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { Option } = Select
const { TextArea } = Input

const Employee = () => {
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [viewingEmployee, setViewingEmployee] = useState(null)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sample employee data with enhanced fields
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeCode: 'NV00001',
      name: "Nguyễn Văn An",
      email: "an.nguyen@company.com",
      phone: "0123-456-789",
      position: "Senior Frontend Developer",
      role: "Nhân viên",
      department: "Kỹ thuật",
      salary: 25000000,
      status: "Đang làm việc",
      joinDate: "2023-01-15",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      totalTasks: 50,
      tasksInProgress: 5,
      tasksCompleted: 42,
      tasksNotStarted: 3,
      unpaidAmount: 5000000,
      paidAmount: 20000000,
      totalAmount: 25000000,
      avatar: "AN",
      username: "an.nguyen",
      password: "NV00001@2024"
    },
    {
      id: 2,
      employeeCode: 'NV00002',
      name: "Trần Thị Bình",
      email: "binh.tran@company.com",
      phone: "0987-654-321",
      position: "Project Manager",
      role: "Quản lý",
      department: "Quản lý",
      salary: 35000000,
      status: "Đang làm việc",
      joinDate: "2022-11-20",
      address: "456 Đường DEF, Quận 3, TP.HCM",
      totalTasks: 40,
      tasksInProgress: 3,
      tasksCompleted: 35,
      tasksNotStarted: 2,
      unpaidAmount: 8000000,
      paidAmount: 27000000,
      totalAmount: 35000000,
      avatar: "TB",
      username: "binh.tran",
      password: "NV00002@2024"
    },
    {
      id: 3,
      employeeCode: 'NV00003',
      name: "Lê Văn Cường",
      email: "cuong.le@company.com",
      phone: "0369-147-258",
      position: "UI/UX Designer",
      role: "Nhân viên",
      department: "Thiết kế",
      salary: 22000000,
      status: "Đang làm việc",
      joinDate: "2023-03-10",
      address: "789 Đường GHI, Quận 5, TP.HCM",
      totalTasks: 35,
      tasksInProgress: 4,
      tasksCompleted: 28,
      tasksNotStarted: 3,
      unpaidAmount: 3000000,
      paidAmount: 19000000,
      totalAmount: 22000000,
      avatar: "LC",
      username: "cuong.le",
      password: "NV00003@2024"
    },
    {
      id: 4,
      employeeCode: 'NV00004',
      name: "Phạm Thị Dung",
      email: "dung.pham@company.com",
      phone: "0912-345-678",
      position: "Backend Developer",
      role: "Nhân viên",
      department: "Kỹ thuật",
      salary: 28000000,
      status: "Nghỉ phép",
      joinDate: "2023-02-05",
      address: "321 Đường JKL, Quận 7, TP.HCM",
      totalTasks: 32,
      tasksInProgress: 2,
      tasksCompleted: 26,
      tasksNotStarted: 4,
      unpaidAmount: 6000000,
      paidAmount: 22000000,
      totalAmount: 28000000,
      avatar: "PD",
      username: "dung.pham",
      password: "NV00004@2024"
    },
    {
      id: 5,
      employeeCode: 'NV00005',
      name: "Hoàng Văn Em",
      email: "em.hoang@company.com",
      phone: "0945-678-912",
      position: "System Admin",
      role: "Admin",
      department: "IT",
      salary: 32000000,
      status: "Đang làm việc",
      joinDate: "2022-06-12",
      address: "654 Đường MNO, Quận 2, TP.HCM",
      totalTasks: 25,
      tasksInProgress: 3,
      tasksCompleted: 20,
      tasksNotStarted: 2,
      unpaidAmount: 4000000,
      paidAmount: 28000000,
      totalAmount: 32000000,
      avatar: "HE",
      username: "em.hoang",
      password: "NV00005@2024"
    }
  ])

  // Auto-generate employee code
  const generateEmployeeCode = () => {
    const maxId = Math.max(...employees.map(emp => parseInt(emp.employeeCode.substring(2))))
    const nextId = maxId + 1
    return `NV${nextId.toString().padStart(5, '0')}`
  }

  // Auto-generate username from name
  const generateUsername = (name) => {
    if (!name) return ''
    const nameParts = name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .split(' ')
      .filter(part => part.length > 0)
    
    if (nameParts.length >= 2) {
      return `${nameParts[nameParts.length - 1]}.${nameParts[0]}`
    } else if (nameParts.length === 1) {
      return nameParts[0]
    }
    return ''
  }

  // Auto-generate password
  const generatePassword = (employeeCode) => {
    const currentYear = new Date().getFullYear()
    return `${employeeCode}@${currentYear}`
  }

  // Role color mapping
  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return '#ff4d4f'
      case 'Quản lý':
        return '#faad14'
      case 'Nhân viên':
        return '#1890ff'
      default:
        return '#d9d9d9'
    }
  }

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang làm việc':
        return 'success'
      case 'Nghỉ phép':
        return 'warning'
      case 'Nghỉ việc':
        return 'default'
      default:
        return 'default'
    }
  }

  // Department color mapping
  const getDepartmentColor = (department) => {
    switch (department) {
      case 'Kỹ thuật':
        return 'blue'
      case 'Thiết kế':
        return 'purple'
      case 'Quản lý':
        return 'gold'
      case 'IT':
        return 'cyan'
      default:
        return 'default'
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  // Calculate task completion percentage
  const getTaskCompletion = (employee) => {
    if (employee.totalTasks === 0) return 0
    return Math.round((employee.tasksCompleted / employee.totalTasks) * 100)
  }

  // Calculate payment percentage
  const getPaymentCompletion = (employee) => {
    if (employee.totalAmount === 0) return 0
    return Math.round((employee.paidAmount / employee.totalAmount) * 100)
  }

  // Modal handlers
  const handleAdd = () => {
    setModalMode('add')
    setEditingEmployee(null)
    setShowPassword(false)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (employee) => {
    setModalMode('edit')
    setEditingEmployee(employee)
    setShowPassword(false)
    form.setFieldsValue({
      ...employee,
      joinDate: employee.joinDate ? new Date(employee.joinDate) : null,
    })
    setIsModalVisible(true)
  }

  const handleView = (employee) => {
    setViewingEmployee(employee)
    setIsViewModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const employeeCode = modalMode === 'add' ? generateEmployeeCode() : editingEmployee.employeeCode
      const employeeData = {
        ...values,
        employeeCode: employeeCode,
        id: modalMode === 'add' ? Date.now() : editingEmployee.id,
        joinDate: values.joinDate ? values.joinDate.format('YYYY-MM-DD') : null,
        avatar: values.name ? values.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'NV',
        username: modalMode === 'add' ? generateUsername(values.name) : values.username,
        password: modalMode === 'add' ? generatePassword(employeeCode) : values.password
      }

      if (modalMode === 'add') {
        setEmployees([...employees, employeeData])
        message.success('Thêm nhân viên thành công!')
      } else {
        setEmployees(employees.map(emp => 
          emp.id === editingEmployee.id 
            ? { ...emp, ...employeeData, joinDate: values.joinDate ? values.joinDate.format('YYYY-MM-DD') : emp.joinDate }
            : emp
        ))
        message.success('Cập nhật nhân viên thành công!')
      }
      
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setShowPassword(false)
    form.resetFields()
  }

  // Handle name change to auto-generate username
  const handleNameChange = (e) => {
    const name = e.target.value
    if (modalMode === 'add') {
      const username = generateUsername(name)
      form.setFieldsValue({ username })
    }
  }

  // Handle regenerate password
  const handleRegeneratePassword = () => {
    const employeeCode = form.getFieldValue('employeeCode') || generateEmployeeCode()
    const newPassword = generatePassword(employeeCode)
    form.setFieldsValue({ password: newPassword })
  }

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id))
    message.success('Xóa nhân viên thành công!')
  }

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.phone.includes(searchText) ||
      employee.employeeCode.toLowerCase().includes(searchText.toLowerCase())

    const matchesRole = roleFilter === 'all' || employee.role === roleFilter
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Statistics
  const totalEmployees = employees.length
  const activeEmployees = employees.filter(e => e.status === 'Đang làm việc').length
  const totalUnpaidAmount = employees.reduce((sum, e) => sum + e.unpaidAmount, 0)
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)

  // Role statistics
  const roleStats = {
    'Admin': employees.filter(e => e.role === 'Admin').length,
    'Quản lý': employees.filter(e => e.role === 'Quản lý').length,
    'Nhân viên': employees.filter(e => e.role === 'Nhân viên').length,
  }

  // Table columns
  const columns = [
    {
      title: 'Mã NV',
      dataIndex: 'employeeCode',
      key: 'employeeCode',
      render: (code) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1890ff' }}>
          {code}
        </span>
      ),
      width: 100,
    },
    {
      title: 'Nhân viên',
      key: 'employee',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size="large" 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#1890ff' }}
          >
            {record.avatar}
          </Avatar>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.position}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      render: (record) => (
        <div>
          <div style={{ fontSize: '13px', marginBottom: '4px' }}>
            <MailOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
            {record.email}
          </div>
          <div style={{ fontSize: '13px' }}>
            <PhoneOutlined style={{ marginRight: '6px', color: '#52c41a' }} />
            {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag 
          color={getRoleColor(role)}
          style={{ 
            color: 'white', 
            fontWeight: 'bold',
            border: 'none'
          }}
        >
          <KeyOutlined style={{ marginRight: '4px' }} />
          {role}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Tasks',
      key: 'tasks',
      render: (record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#999', marginBottom: '2px' }}>
            Tổng: {record.totalTasks} | Hoàn thành: {record.tasksCompleted}
          </div>
          <div style={{ fontSize: '11px', color: '#999' }}>
            Đang làm: {record.tasksInProgress} | Chưa làm: {record.tasksNotStarted}
          </div>
          <div style={{ marginTop: '4px' }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: getTaskCompletion(record) >= 80 ? '#52c41a' : getTaskCompletion(record) >= 60 ? '#faad14' : '#ff4d4f'
            }}>
              {getTaskCompletion(record)}%
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Thanh toán',
      key: 'payment',
      render: (record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#52c41a', marginBottom: '2px' }}>
            Đã TT: {formatCurrency(record.paidAmount)}
          </div>
          <div style={{ fontSize: '11px', color: '#ff4d4f' }}>
            Chưa TT: {formatCurrency(record.unpaidAmount)}
          </div>
          <div style={{ marginTop: '4px' }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: getPaymentCompletion(record) >= 80 ? '#52c41a' : '#faad14'
            }}>
              {getPaymentCompletion(record)}%
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Tổng lương',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {formatCurrency(salary)}
        </span>
      ),
    },
    {
      title: 'Ngày vào làm',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => (
        <div>
          <CalendarOutlined style={{ marginRight: '6px', color: '#faad14' }} />
          {new Date(date).toLocaleDateString('vi-VN')}
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', margin: 0 }}>
          Quản lý Nhân viên
        </h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size={isMobile ? 'middle' : 'large'}
          onClick={handleAdd}
        >
          Thêm nhân viên
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {totalEmployees}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng nhân viên</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {activeEmployees}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Đang làm việc</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {formatCurrency(totalUnpaidAmount)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Chưa thanh toán</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold', color: '#fa8c16' }}>
                {formatCurrency(totalSalary)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng lương tháng</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Role Statistics */}
      <Card 
        title="Thống kê theo phân quyền" 
        style={{ marginBottom: '24px' }} 
        size={isMobile ? 'small' : 'default'}
      >
        <Row gutter={[12, 12]}>
          {Object.entries(roleStats).map(([role, count]) => (
            <Col xs={8} sm={8} md={8} key={role}>
              <div style={{ 
                textAlign: 'center', 
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #d9d9d9'
              }}>
                <Tag 
                  color={getRoleColor(role)} 
                  style={{ 
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: 'white'
                  }}
                >
                  <KeyOutlined style={{ marginRight: '4px' }} />
                  {role}
                </Tag>
                <div style={{ 
                  fontSize: isMobile ? '16px' : '18px', 
                  fontWeight: 'bold',
                  color: getRoleColor(role)
                }}>
                  {count}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#666',
                  marginTop: '4px'
                }}>
                  nhân viên
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Search and Filter */}
      <Card style={{ marginBottom: '24px' }} size={isMobile ? 'small' : 'default'}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm nhân viên..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size={isMobile ? 'middle' : 'large'}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Phân quyền"
              value={roleFilter}
              onChange={setRoleFilter}
              size={isMobile ? 'middle' : 'large'}
            >
              <Option value="all">Tất cả</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Quản lý">Quản lý</Option>
              <Option value="Nhân viên">Nhân viên</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Trạng thái"
              value={statusFilter}
              onChange={setStatusFilter}
              size={isMobile ? 'middle' : 'large'}
            >
              <Option value="all">Tất cả</Option>
              <Option value="Đang làm việc">Đang làm việc</Option>
              <Option value="Nghỉ phép">Nghỉ phép</Option>
              <Option value="Nghỉ việc">Nghỉ việc</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={4}>
            <div style={{ fontSize: '14px', color: '#666', textAlign: isMobile ? 'left' : 'center' }}>
              Hiển thị {filteredEmployees.length} / {totalEmployees} nhân viên
            </div>
          </Col>
        </Row>
      </Card>

      {/* Employee Table */}
      <Card>
        {!isMobile ? (
          <Table
            columns={columns}
            dataSource={filteredEmployees}
            rowKey="id"
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} nhân viên`,
            }}
          />
        ) : (
          <List
            dataSource={filteredEmployees}
            renderItem={(employee) => (
              <List.Item style={{ padding: '12px 0' }}>
                <Card size="small" style={{ width: '100%' }}>
                  <Row gutter={[8, 8]}>
                    <Col span={6}>
                      <Avatar 
                        size="large" 
                        style={{ backgroundColor: '#1890ff' }}
                      >
                        {employee.avatar}
                      </Avatar>
                    </Col>
                    <Col span={18}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                        <span style={{ color: '#1890ff', fontFamily: 'monospace' }}>{employee.employeeCode}</span>
                        {' - '}{employee.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        {employee.position}
                      </div>
                      <Space size="small" wrap style={{ marginBottom: '8px' }}>
                        <Tag color={getRoleColor(employee.role)} style={{ color: 'white' }}>
                          <KeyOutlined style={{ marginRight: '2px' }} />
                          {employee.role}
                        </Tag>
                        <Tag color={getStatusColor(employee.status)}>
                          {employee.status}
                        </Tag>
                        <Tag color={getDepartmentColor(employee.department)}>
                          {employee.department}
                        </Tag>
                      </Space>
                      <div style={{ fontSize: '11px', marginBottom: '8px' }}>
                        <div>Tasks: {employee.tasksCompleted}/{employee.totalTasks} ({getTaskCompletion(employee)}%)</div>
                        <div>Thanh toán: {getPaymentCompletion(employee)}% | Lương: {formatCurrency(employee.salary)}</div>
                      </div>
                      <Space size="small">
                        <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => handleView(employee)}>
                          Xem
                        </Button>
                        <Button size="small" type="link" icon={<EditOutlined />} onClick={() => handleEdit(employee)}>
                          Sửa
                        </Button>
                        <Popconfirm
                          title="Bạn có chắc chắn muốn xóa?"
                          onConfirm={() => handleDelete(employee.id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button size="small" type="link" danger icon={<DeleteOutlined />}>
                            Xóa
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
            pagination={{
              pageSize: 6,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} nhân viên`,
            }}
          />
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={modalMode === 'add' ? 'Thêm nhân viên mới' : 'Chỉnh sửa thông tin nhân viên'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={isMobile ? '95%' : 800}
        okText={modalMode === 'add' ? 'Thêm' : 'Cập nhật'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input 
                  placeholder="Nhập họ và tên đầy đủ" 
                  onChange={handleNameChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="position"
                label="Chức vụ"
                rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}
              >
                <Input placeholder="Nhập chức vụ" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="role"
                label="Phân quyền"
                rules={[{ required: true, message: 'Vui lòng chọn phân quyền!' }]}
              >
                <Select placeholder="Chọn phân quyền">
                  <Option value="Admin">
                    <Tag color="#ff4d4f" style={{ marginRight: '8px' }}>Admin</Tag>
                  </Option>
                  <Option value="Quản lý">
                    <Tag color="#faad14" style={{ marginRight: '8px' }}>Quản lý</Tag>
                  </Option>
                  <Option value="Nhân viên">
                    <Tag color="#1890ff" style={{ marginRight: '8px' }}>Nhân viên</Tag>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="department"
                label="Phòng ban"
                rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
              >
                <Select placeholder="Chọn phòng ban">
                  <Option value="Kỹ thuật">Kỹ thuật</Option>
                  <Option value="Thiết kế">Thiết kế</Option>
                  <Option value="Quản lý">Quản lý</Option>
                  <Option value="IT">IT</Option>
                  <Option value="Kinh doanh">Kinh doanh</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Option value="Đang làm việc">Đang làm việc</Option>
                  <Option value="Nghỉ phép">Nghỉ phép</Option>
                  <Option value="Nghỉ việc">Nghỉ việc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="salary"
                label="Lương cơ bản (VNĐ)"
                rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="Nhập lương cơ bản" 
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <TextArea rows={2} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="totalTasks"
                label="Tổng số task"
                rules={[{ required: true, message: 'Vui lòng nhập tổng task!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="Tổng task" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="tasksCompleted"
                label="Task đã hoàn thành"
                rules={[{ required: true, message: 'Vui lòng nhập task hoàn thành!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="Task hoàn thành" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="tasksInProgress"
                label="Task đang thực hiện"
                rules={[{ required: true, message: 'Vui lòng nhập task đang làm!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="Task đang làm" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="paidAmount"
                label="Số tiền đã thanh toán (VNĐ)"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền đã thanh toán!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="Tiền đã thanh toán" 
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="unpaidAmount"
                label="Số tiền chưa thanh toán (VNĐ)"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền chưa thanh toán!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="Tiền chưa thanh toán" 
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
              >
                <Input 
                  placeholder="Tên đăng nhập sẽ được tạo tự động"
                  disabled={modalMode === 'add'}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Group compact>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu sẽ được tạo tự động"
                    style={{ width: 'calc(100% - 80px)' }}
                    disabled={modalMode === 'add'}
                  />
                  <Tooltip title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                    <Button
                      icon={showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ width: '40px' }}
                    />
                  </Tooltip>
                  <Tooltip title="Tạo lại mật khẩu">
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={handleRegeneratePassword}
                      style={{ width: '40px' }}
                    />
                  </Tooltip>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="joinDate"
            label="Ngày vào làm"
          >
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="Chọn ngày vào làm"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Thông tin chi tiết nhân viên"
        visible={isViewModalVisible}
        onOk={() => setIsViewModalVisible(false)}
        onCancel={() => setIsViewModalVisible(false)}
        width={isMobile ? '95%' : 600}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Đóng
          </Button>
        ]}
      >
        {viewingEmployee && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Avatar 
                  size={80} 
                  style={{ backgroundColor: '#1890ff', marginBottom: '16px' }}
                >
                  {viewingEmployee.avatar}
                </Avatar>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{viewingEmployee.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{viewingEmployee.position}</div>
                <div style={{ marginTop: '8px' }}>
                  <Tag color={getRoleColor(viewingEmployee.role)} style={{ color: 'white' }}>
                    <KeyOutlined style={{ marginRight: '4px' }} />
                    {viewingEmployee.role}
                  </Tag>
                </div>
              </Col>
              
              <Col span={12}>
                <strong>Mã nhân viên:</strong>
                <div style={{ fontFamily: 'monospace', color: '#1890ff' }}>{viewingEmployee.employeeCode}</div>
              </Col>
              <Col span={12}>
                <strong>Phòng ban:</strong>
                <div>{viewingEmployee.department}</div>
              </Col>
              
              <Col span={12}>
                <strong>Email:</strong>
                <div>{viewingEmployee.email}</div>
              </Col>
              <Col span={12}>
                <strong>Điện thoại:</strong>
                <div>{viewingEmployee.phone}</div>
              </Col>
              
              <Col span={24}>
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  backgroundColor: '#fafafa', 
                  borderRadius: '6px',
                  border: '1px solid #d9d9d9'
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#1890ff', 
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <UserOutlined />
                    Thông tin đăng nhập
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Tên đăng nhập:</strong>
                      </div>
                      <div style={{ 
                        fontFamily: 'monospace', 
                        color: '#1890ff', 
                        fontWeight: 'bold',
                        fontSize: '14px',
                        padding: '8px 12px',
                        backgroundColor: '#f0f8ff',
                        borderRadius: '4px',
                        border: '1px solid #91d5ff',
                        textAlign: 'center'
                      }}>
                        {viewingEmployee.username}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Mật khẩu:</strong>
                      </div>
                      <div style={{ 
                        fontFamily: 'monospace', 
                        color: '#52c41a', 
                        fontWeight: 'bold',
                        fontSize: '14px',
                        padding: '8px 12px',
                        backgroundColor: '#f6ffed',
                        borderRadius: '4px',
                        border: '1px solid #b7eb8f',
                        textAlign: 'center'
                      }}>
                        {viewingEmployee.password}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              
              <Col span={24}>
                <strong>Địa chỉ:</strong>
                <div>{viewingEmployee.address}</div>
              </Col>
              
              <Col span={12}>
                <strong>Trạng thái:</strong>
                <div>
                  <Tag color={getStatusColor(viewingEmployee.status)}>
                    {viewingEmployee.status}
                  </Tag>
                </div>
              </Col>
              <Col span={12}>
                <strong>Ngày vào làm:</strong>
                <div>{new Date(viewingEmployee.joinDate).toLocaleDateString('vi-VN')}</div>
              </Col>
              
              <Col span={24}>
                <strong>Thống kê Task:</strong>
                <Row gutter={8} style={{ marginTop: '8px' }}>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '8px', background: '#f0f2f5', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#1890ff' }}>{viewingEmployee.totalTasks}</div>
                      <div style={{ fontSize: '12px' }}>Tổng</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '8px', background: '#f6ffed', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#52c41a' }}>{viewingEmployee.tasksCompleted}</div>
                      <div style={{ fontSize: '12px' }}>Hoàn thành</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '8px', background: '#fff7e6', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#fa8c16' }}>{viewingEmployee.tasksInProgress}</div>
                      <div style={{ fontSize: '12px' }}>Đang làm</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '8px', background: '#fff2f0', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#ff4d4f' }}>{viewingEmployee.tasksNotStarted}</div>
                      <div style={{ fontSize: '12px' }}>Chưa làm</div>
                    </div>
                  </Col>
                </Row>
              </Col>
              
              <Col span={24}>
                <strong>Thống kê Thanh toán:</strong>
                <Row gutter={16} style={{ marginTop: '8px' }}>
                  <Col span={8}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f6ffed', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#52c41a', fontSize: '14px' }}>
                        {formatCurrency(viewingEmployee.paidAmount)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Đã thanh toán</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#fff2f0', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#ff4d4f', fontSize: '14px' }}>
                        {formatCurrency(viewingEmployee.unpaidAmount)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Chưa thanh toán</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f0f2f5', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#1890ff', fontSize: '14px' }}>
                        {formatCurrency(viewingEmployee.salary)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Lương cơ bản</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Employee