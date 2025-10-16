import { Row, Col, Card, Button, Table, Tag, Input, Select, Avatar, Space, Modal, Form, DatePicker, message, Popconfirm, Drawer, List, InputNumber, Typography, Tabs } from 'antd'
import { PlusOutlined, SearchOutlined, UserOutlined, DollarOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CalendarOutlined, FileTextOutlined, TeamOutlined, BankOutlined, LinkOutlined, CopyOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography
const { TabPane } = Tabs

const MyTask = () => {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [taskTypeFilter, setTaskTypeFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [editingTask, setEditingTask] = useState(null)
  const [viewingTask, setViewingTask] = useState(null)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [isTaskTypeModalVisible, setIsTaskTypeModalVisible] = useState(false)
  const [taskType, setTaskType] = useState('') // 'personal' or 'employee'
  const [isAddTaskTypeModalVisible, setIsAddTaskTypeModalVisible] = useState(false)
  const [newTaskType, setNewTaskType] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sample customers data (linked from Customer management)
  const customers = [
    { customerCode: 'KH00001', name: 'Công ty ABC' },
    { customerCode: 'KH00002', name: 'Công ty XYZ' },
    { customerCode: 'KH00003', name: 'Công ty DEF' },
  ]

  // Sample employees data (linked from Employee management)
  const employees = [
    { employeeCode: 'NV00001', name: 'Nguyễn Văn An' },
    { employeeCode: 'NV00002', name: 'Trần Thị Bình' },
    { employeeCode: 'NV00003', name: 'Lê Văn Cường' },
  ]

  // Sample tasks data with enhanced fields
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskCode: 'TSK00001',
      receiveDate: '2025-10-10',
      customerCode: 'KH00001',
      customerName: 'Công ty ABC',
      employeeCode: 'NV00001',
      employeeName: 'Nguyễn Văn An',
      taskType: 'Tiểu luận',
      totalAmount: 5000000,
      depositAmount: 2000000,
      remainingAmount: 3000000,
      employeePayment: 2000000,
      employeePaymentStatus: 'Chưa thanh toán',
      description: 'Viết tiểu luận về marketing số',
      status: 'Đang thực hiện',
      comments: 'Cần hoàn thành trước ngày 20/10',
      deadline: '2025-10-20',
      taskLink: 'https://docs.google.com/document/d/1abc123/edit'
    },
    {
      id: 2,
      taskCode: 'TSK00002',
      receiveDate: '2025-10-08',
      customerCode: 'KH00002',
      customerName: 'Công ty XYZ',
      employeeCode: 'NV00002',
      employeeName: 'Trần Thị Bình',
      taskType: 'Khóa luận',
      totalAmount: 15000000,
      depositAmount: 7000000,
      remainingAmount: 8000000,
      employeePayment: 8000000,
      employeePaymentStatus: 'Đã thanh toán',
      description: 'Khóa luận tốt nghiệp về AI',
      status: 'Đã hoàn thành',
      comments: 'Hoàn thành tốt, khách hàng hài lòng',
      deadline: '2025-10-15',
      taskLink: 'https://docs.google.com/document/d/2def456/edit'
    },
    {
      id: 3,
      taskCode: 'TSK00003',
      receiveDate: '2025-10-12',
      customerCode: 'KH00003',
      customerName: 'Công ty DEF',
      employeeCode: 'NV00003',
      employeeName: 'Lê Văn Cường',
      taskType: 'PPT',
      totalAmount: 2000000,
      depositAmount: 1000000,
      remainingAmount: 1000000,
      employeePayment: 800000,
      employeePaymentStatus: 'Chưa thanh toán',
      description: 'Thiết kế slide thuyết trình',
      status: 'Chưa thực hiện',
      comments: 'Chờ khách hàng cung cấp thông tin chi tiết',
      deadline: '2025-10-25',
      taskLink: 'https://docs.google.com/presentation/d/3ghi789/edit'
    },
    {
      id: 4,
      taskCode: 'TSK00004',
      receiveDate: '2025-10-09',
      customerCode: 'KH00001',
      customerName: 'Công ty ABC',
      employeeCode: 'NV00001',
      employeeName: 'Nguyễn Văn An',
      taskType: 'Báo cáo thực tập',
      totalAmount: 3000000,
      depositAmount: 1500000,
      remainingAmount: 1500000,
      employeePayment: 1200000,
      employeePaymentStatus: 'Đã thanh toán',
      description: 'Báo cáo thực tập tại doanh nghiệp',
      status: 'Đang sửa lại',
      comments: 'Cần chỉnh sửa một số phần theo yêu cầu',
      deadline: '2025-10-18',
      taskLink: 'https://docs.google.com/document/d/4jkl012/edit'
    },
    {
      id: 5,
      taskCode: 'TSK00005',
      receiveDate: '2025-10-11',
      customerCode: 'KH00002',
      customerName: 'Công ty XYZ',
      employeeCode: 'NV00002',
      employeeName: 'Trần Thị Bình',
      taskType: 'Đề cương',
      totalAmount: 4000000,
      depositAmount: 2000000,
      remainingAmount: 2000000,
      employeePayment: 1600000,
      employeePaymentStatus: 'Chưa thanh toán',
      description: 'Đề cương nghiên cứu khoa học',
      status: 'Còn làm tiếp',
      comments: 'Đang trong giai đoạn hoàn thiện',
      deadline: '2025-10-30',
      taskLink: 'https://docs.google.com/document/d/5mno345/edit'
    }
  ])

  // Auto-generate task code
  const generateTaskCode = () => {
    const maxId = Math.max(...tasks.map(task => parseInt(task.taskCode.substring(3))))
    const nextId = maxId + 1
    return `TSK${nextId.toString().padStart(5, '0')}`
  }

  // Task type options - now state to allow dynamic updates
  const [taskTypeOptions, setTaskTypeOptions] = useState([
    'Căn chỉnh',
    'Tiểu luận', 
    'Khóa luận',
    'Đề cương',
    'PPT',
    'Báo cáo thực tập',
    'Luận văn',
    'Báo cáo',
    'Khác'
  ])

  // Status options
  const statusOptions = [
    'Chưa thực hiện',
    'Đang thực hiện', 
    'Đã hoàn thành',
    'Đang sửa lại',
    'Còn làm tiếp'
  ]

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Chưa thực hiện':
        return '#d9d9d9'
      case 'Đang thực hiện':
        return '#1890ff'
      case 'Đã hoàn thành':
        return '#52c41a'
      case 'Đang sửa lại':
        return '#faad14'
      case 'Còn làm tiếp':
        return '#722ed1'
      default:
        return '#d9d9d9'
    }
  }

  // Task type color mapping
  const getTaskTypeColor = (type) => {
    switch (type) {
      case 'Khóa luận':
        return '#ff4d4f'
      case 'Tiểu luận':
        return '#1890ff'
      case 'Đề cương':
        return '#52c41a'
      case 'PPT':
        return '#faad14'
      case 'Báo cáo thực tập':
        return '#722ed1'
      case 'Căn chỉnh':
        return '#fa8c16'
      default:
        return '#8c8c8c'
    }
  }

  // Employee payment status color
  const getPaymentStatusColor = (status) => {
    return status === 'Đã thanh toán' ? '#52c41a' : '#ff4d4f'
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  // Modal handlers
  const handleAdd = () => {
    setIsTaskTypeModalVisible(true)
  }

  const handleTaskTypeSelect = (type) => {
    setTaskType(type)
    setIsTaskTypeModalVisible(false)
    setModalMode('add')
    setEditingTask(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (task) => {
    setModalMode('edit')
    setEditingTask(task)
    setTaskType(task.employeeCode ? 'employee' : 'personal')
    form.setFieldsValue({
      ...task,
      receiveDate: task.receiveDate ? new Date(task.receiveDate) : null,
      deadline: task.deadline ? new Date(task.deadline) : null,
    })
    setIsModalVisible(true)
  }

  const handleView = (task) => {
    setViewingTask(task)
    setIsViewModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const customerData = customers.find(c => c.customerCode === values.customerCode)
      const employeeData = employees.find(e => e.employeeCode === values.employeeCode)
      
      const taskData = {
        ...values,
        taskCode: modalMode === 'add' ? generateTaskCode() : editingTask.taskCode,
        id: modalMode === 'add' ? Date.now() : editingTask.id,
        customerName: customerData?.name || '',
        employeeName: employeeData?.name || '',
        receiveDate: values.receiveDate ? values.receiveDate.format('YYYY-MM-DD') : null,
        deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,
        remainingAmount: values.totalAmount - values.depositAmount
      }

      if (modalMode === 'add') {
        setTasks([...tasks, taskData])
        message.success('Thêm task thành công!')
      } else {
        setTasks(tasks.map(task => 
          task.id === editingTask.id 
            ? { 
                ...task, 
                ...taskData,
                receiveDate: values.receiveDate ? values.receiveDate.format('YYYY-MM-DD') : task.receiveDate,
                deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : task.deadline
              }
            : task
        ))
        message.success('Cập nhật task thành công!')
      }
      
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
    message.success('Xóa task thành công!')
  }

  // Task type management functions
  const handleAddTaskType = () => {
    if (newTaskType.trim()) {
      if (taskTypeOptions.includes(newTaskType.trim())) {
        message.warning('Loại task này đã tồn tại!')
        return
      }
      setTaskTypeOptions([...taskTypeOptions, newTaskType.trim()])
      setNewTaskType('')
      setIsAddTaskTypeModalVisible(false)
      message.success('Đã thêm loại task mới!')
    } else {
      message.warning('Vui lòng nhập tên loại task!')
    }
  }

  const handleDeleteTaskType = (taskTypeToDelete) => {
    // Check if any tasks are using this task type
    const tasksUsingType = tasks.filter(task => task.taskType === taskTypeToDelete)
    if (tasksUsingType.length > 0) {
      message.error(`Không thể xóa loại task này vì có ${tasksUsingType.length} task đang sử dụng!`)
      return
    }
    
    setTaskTypeOptions(taskTypeOptions.filter(type => type !== taskTypeToDelete))
    message.success('Đã xóa loại task!')
  }

  // Copy link function
  const handleCopyLink = async (taskLink) => {
    try {
      await navigator.clipboard.writeText(taskLink)
      message.success('Đã copy link vào clipboard!')
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = taskLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      message.success('Đã copy link vào clipboard!')
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.taskCode.toLowerCase().includes(searchText.toLowerCase()) ||
      task.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      task.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase())

    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesTaskType = taskTypeFilter === 'all' || task.taskType === taskTypeFilter

    return matchesSearch && matchesStatus && matchesTaskType
  })

  // Statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'Đã hoàn thành').length
  const inProgressTasks = tasks.filter(t => t.status === 'Đang thực hiện').length
  const totalRevenue = tasks.reduce((sum, t) => sum + t.totalAmount, 0)
  const totalDeposit = tasks.reduce((sum, t) => sum + t.depositAmount, 0)
  const unpaidEmployees = tasks.filter(t => t.employeePaymentStatus === 'Chưa thanh toán').length

  // Table columns
  const columns = [
    {
      title: 'Mã Task',
      dataIndex: 'taskCode',
      key: 'taskCode',
      render: (code) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1890ff' }}>
          {code}
        </span>
      ),
      width: 100,
    },
    {
      title: 'Thông tin',
      key: 'info',
      render: (record) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
            {record.description}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            <CalendarOutlined style={{ marginRight: '4px' }} />
            Nhận: {new Date(record.receiveDate).toLocaleDateString('vi-VN')}
            {record.deadline && (
              <span style={{ marginLeft: '12px' }}>
                Hạn: {new Date(record.deadline).toLocaleDateString('vi-VN')}
              </span>
            )}
          </div>
          {record.taskLink && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LinkOutlined style={{ fontSize: '12px', color: '#1890ff' }} />
              <span style={{ fontSize: '11px', color: '#1890ff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {record.taskLink}
              </span>
              <Button 
                type="text" 
                size="small" 
                icon={<CopyOutlined />}
                onClick={() => handleCopyLink(record.taskLink)}
                style={{ padding: '0 4px', minWidth: 'auto' }}
                title="Copy link"
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (record) => (
        <div>
          <div style={{ fontWeight: 'bold', color: '#1890ff' }}>{record.customerCode}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.customerName}</div>
        </div>
      ),
    },
    {
      title: 'Nhân viên',
      key: 'employee',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{record.employeeCode}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>{record.employeeName}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Loại Task',
      dataIndex: 'taskType',
      key: 'taskType',
      render: (type) => (
        <Tag color={getTaskTypeColor(type)} style={{ fontWeight: 'bold' }}>
          <FileTextOutlined style={{ marginRight: '4px' }} />
          {type}
        </Tag>
      ),
    },
    {
      title: 'Tài chính',
      key: 'finance',
      render: (record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#52c41a', marginBottom: '2px' }}>
            Tổng: {formatCurrency(record.totalAmount)}
          </div>
          <div style={{ fontSize: '11px', color: '#1890ff', marginBottom: '2px' }}>
            Cọc: {formatCurrency(record.depositAmount)}
          </div>
          <div style={{ fontSize: '11px', color: '#ff4d4f' }}>
            Còn lại: {formatCurrency(record.remainingAmount)}
          </div>
        </div>
      ),
    },
    {
      title: 'TT Nhân viên',
      key: 'employeePayment',
      render: (record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
            {formatCurrency(record.employeePayment)}
          </div>
          <Tag 
            color={getPaymentStatusColor(record.employeePaymentStatus)}
            style={{ fontSize: '10px' }}
          >
            <BankOutlined style={{ marginRight: '2px' }} />
            {record.employeePaymentStatus}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)} style={{ fontWeight: 'bold' }}>
          {status}
        </Tag>
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
            title="Bạn có chắc chắn muốn xóa task này?"
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
          Quản lý Task
        </h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size={isMobile ? 'middle' : 'large'}
          onClick={handleAdd}
        >
          Tạo Task mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {totalTasks}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng Task</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {completedTasks}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Hoàn thành</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#faad14' }}>
                {inProgressTasks}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Đang làm</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {unpaidEmployees}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Chưa TT NV</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Revenue Statistics */}
      <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#52c41a' }}>
                {formatCurrency(totalRevenue)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng doanh thu</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#1890ff' }}>
                {formatCurrency(totalDeposit)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng tiền cọc</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#faad14' }}>
                {formatCurrency(totalRevenue - totalDeposit)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Còn thu</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search and Filter */}
      <Card style={{ marginBottom: '24px' }} size={isMobile ? 'small' : 'default'}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm task..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size={isMobile ? 'middle' : 'large'}
            />
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
              {statusOptions.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Loại Task"
              value={taskTypeFilter}
              onChange={setTaskTypeFilter}
              size={isMobile ? 'middle' : 'large'}
            >
              <Option value="all">Tất cả loại</Option>
              {taskTypeOptions.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={4}>
            <div style={{ fontSize: '14px', color: '#666', textAlign: isMobile ? 'left' : 'center' }}>
              Hiển thị {filteredTasks.length} / {totalTasks} task
            </div>
          </Col>
        </Row>
      </Card>

      {/* Task Table */}
      <Card>
        {!isMobile ? (
          <Table
            columns={columns}
            dataSource={filteredTasks}
            rowKey="id"
            scroll={{ x: 1400 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} task`,
            }}
          />
        ) : (
          <List
            dataSource={filteredTasks}
            renderItem={(task) => (
              <List.Item style={{ padding: '12px 0' }}>
                <Card size="small" style={{ width: '100%' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1890ff' }}>
                      {task.taskCode}
                    </span>
                    <Tag 
                      color={getStatusColor(task.status)} 
                      style={{ float: 'right', fontWeight: 'bold' }}
                    >
                      {task.status}
                    </Tag>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {task.description}
                  </div>
                  <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                    <div>KH: {task.customerCode} - {task.customerName}</div>
                    <div>NV: {task.employeeCode} - {task.employeeName}</div>
                    {task.taskLink && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <LinkOutlined style={{ fontSize: '10px', color: '#1890ff' }} />
                        <span style={{ fontSize: '10px', color: '#1890ff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {task.taskLink}
                        </span>
                        <Button 
                          type="text" 
                          size="small" 
                          icon={<CopyOutlined />}
                          onClick={() => handleCopyLink(task.taskLink)}
                          style={{ padding: '0 2px', minWidth: 'auto', fontSize: '10px' }}
                          title="Copy link"
                        />
                      </div>
                    )}
                  </div>
                  <Space size="small" wrap style={{ marginBottom: '8px' }}>
                    <Tag color={getTaskTypeColor(task.taskType)}>
                      {task.taskType}
                    </Tag>
                    <Tag color={getPaymentStatusColor(task.employeePaymentStatus)}>
                      {task.employeePaymentStatus}
                    </Tag>
                  </Space>
                  <div style={{ fontSize: '11px', marginBottom: '8px' }}>
                    <div>Tổng: {formatCurrency(task.totalAmount)} | Cọc: {formatCurrency(task.depositAmount)}</div>
                    <div>TT NV: {formatCurrency(task.employeePayment)}</div>
                  </div>
                  <Space size="small">
                    <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => handleView(task)}>
                      Xem
                    </Button>
                    <Button size="small" type="link" icon={<EditOutlined />} onClick={() => handleEdit(task)}>
                      Sửa
                    </Button>
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa?"
                      onConfirm={() => handleDelete(task.id)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button size="small" type="link" danger icon={<DeleteOutlined />}>
                        Xóa
                      </Button>
                    </Popconfirm>
                  </Space>
                </Card>
              </List.Item>
            )}
            pagination={{
              pageSize: 6,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} task`,
            }}
          />
        )}
      </Card>

      {/* Task Type Selection Modal */}
      <Modal
        title="Chọn loại Task"
        visible={isTaskTypeModalVisible}
        onCancel={() => setIsTaskTypeModalVisible(false)}
        footer={null}
        width={400}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ marginBottom: '24px', fontSize: '16px' }}>
            Bạn muốn tạo task cho ai?
          </p>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Button 
              type="primary" 
              size="large" 
              icon={<UserOutlined />}
              onClick={() => handleTaskTypeSelect('personal')}
              style={{ width: '100%', height: '60px', fontSize: '16px' }}
            >
              Tạo cho cá nhân
            </Button>
            <Button 
              type="default" 
              size="large" 
              icon={<TeamOutlined />}
              onClick={() => handleTaskTypeSelect('employee')}
              style={{ width: '100%', height: '60px', fontSize: '16px' }}
            >
              Tạo cho nhân viên
            </Button>
          </Space>
        </div>
      </Modal>

      {/* Add Task Type Modal */}
      <Modal
        title="Thêm loại Task mới"
        visible={isAddTaskTypeModalVisible}
        onOk={handleAddTaskType}
        onCancel={() => {
          setIsAddTaskTypeModalVisible(false)
          setNewTaskType('')
        }}
        okText="Thêm"
        cancelText="Hủy"
        width={400}
        centered
      >
        <Form layout="vertical">
          <Form.Item
            label="Tên loại Task"
            required
          >
            <Input
              placeholder="Nhập tên loại task mới"
              value={newTaskType}
              onChange={(e) => setNewTaskType(e.target.value)}
              onPressEnter={handleAddTaskType}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        title={modalMode === 'add' ? `Tạo Task mới - ${taskType === 'personal' ? 'Cá nhân' : 'Nhân viên'}` : 'Chỉnh sửa Task'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={isMobile ? '95%' : 900}
        okText={modalMode === 'add' ? 'Tạo' : 'Cập nhật'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Tabs defaultActiveKey="basic" type="card">
            <TabPane tab="Thông tin cơ bản" key="basic">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="customerCode"
                    label="Khách hàng"
                    rules={[{ required: true, message: 'Vui lòng chọn khách hàng!' }]}
                  >
                    <Select placeholder="Chọn khách hàng">
                      {customers.map(customer => (
                        <Option key={customer.customerCode} value={customer.customerCode}>
                          {customer.customerCode} - {customer.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {taskType === 'employee' && (
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="employeeCode"
                      label="Nhân viên"
                      rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
                    >
                      <Select placeholder="Chọn nhân viên">
                        {employees.map(employee => (
                          <Option key={employee.employeeCode} value={employee.employeeCode}>
                            {employee.employeeCode} - {employee.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="taskType"
                    label="Loại Task"
                    rules={[{ required: true, message: 'Vui lòng chọn loại task!' }]}
                  >
                    <Select 
                      placeholder="Chọn loại task"
                      dropdownRender={(menu) => (
                        <div>
                          {menu}
                          <div style={{ padding: '8px', borderTop: '1px solid #f0f0f0' }}>
                            <Button 
                              type="dashed" 
                              icon={<PlusOutlined />} 
                              onClick={() => setIsAddTaskTypeModalVisible(true)}
                              style={{ width: '100%' }}
                            >
                              Thêm loại task mới
                            </Button>
                          </div>
                        </div>
                      )}
                    >
                      {taskTypeOptions.map(type => (
                        <Option key={type} value={type}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Tag color={getTaskTypeColor(type)} style={{ marginRight: '8px' }}>
                              {type}
                            </Tag>
                            <Button 
                              type="text" 
                              size="small" 
                              icon={<DeleteOutlined />}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteTaskType(type)
                              }}
                              style={{ color: '#ff4d4f', padding: '0 4px' }}
                            />
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                  >
                    <Select placeholder="Chọn trạng thái">
                      {statusOptions.map(status => (
                        <Option key={status} value={status}>
                          <Tag color={getStatusColor(status)} style={{ marginRight: '8px' }}>
                            {status}
                          </Tag>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="receiveDate"
                    label="Ngày nhận Task"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày nhận!' }]}
                  >
                    <DatePicker 
                      style={{ width: '100%' }} 
                      placeholder="Chọn ngày nhận"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="deadline"
                    label="Hạn hoàn thành"
                  >
                    <DatePicker 
                      style={{ width: '100%' }} 
                      placeholder="Chọn hạn hoàn thành"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label="Mô tả Task"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <TextArea rows={3} placeholder="Mô tả chi tiết về task" />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="totalAmount"
                    label="Tổng số tiền (VNĐ)"
                    rules={[{ required: true, message: 'Vui lòng nhập tổng tiền!' }]}
                  >
                    <InputNumber 
                      min={0} 
                      placeholder="Tổng tiền" 
                      style={{ width: '100%' }}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="depositAmount"
                    label="Số tiền đã cọc (VNĐ)"
                    rules={[{ required: true, message: 'Vui lòng nhập tiền cọc!' }]}
                  >
                    <InputNumber 
                      min={0} 
                      placeholder="Tiền cọc" 
                      style={{ width: '100%' }}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="taskLink"
                label="Link Task"
              >
                <Input 
                  placeholder="Nhập link Google Docs, Google Sheets, hoặc link khác"
                  prefix={<LinkOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="comments"
                label="Bình luận/Ghi chú"
              >
                <TextArea rows={3} placeholder="Bình luận hoặc ghi chú về task" />
              </Form.Item>
            </TabPane>

            {taskType === 'employee' && (
              <TabPane tab="Thông tin nhân viên" key="employee">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="employeeCode"
                      label="Nhân viên"
                      rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
                    >
                      <Select placeholder="Chọn nhân viên">
                        {employees.map(employee => (
                          <Option key={employee.employeeCode} value={employee.employeeCode}>
                            {employee.employeeCode} - {employee.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="employeePayment"
                      label="Số tiền trả NV (VNĐ)"
                      rules={[{ required: true, message: 'Vui lòng nhập tiền trả NV!' }]}
                    >
                      <InputNumber 
                        min={0} 
                        placeholder="Tiền trả NV" 
                        style={{ width: '100%' }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="employeePaymentStatus"
                  label="Trạng thái thanh toán nhân viên"
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái thanh toán!' }]}
                >
                  <Select placeholder="Chọn trạng thái thanh toán">
                    <Option value="Đã thanh toán">
                      <Tag color="#52c41a" style={{ marginRight: '8px' }}>Đã thanh toán</Tag>
                    </Option>
                    <Option value="Chưa thanh toán">
                      <Tag color="#ff4d4f" style={{ marginRight: '8px' }}>Chưa thanh toán</Tag>
                    </Option>
                  </Select>
                </Form.Item>
              </TabPane>
            )}
          </Tabs>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Chi tiết Task"
        visible={isViewModalVisible}
        onOk={() => setIsViewModalVisible(false)}
        onCancel={() => setIsViewModalVisible(false)}
        width={isMobile ? '95%' : 700}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Đóng
          </Button>
        ]}
      >
        {viewingTask && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                  {viewingTask.taskCode}
                </div>
                <div style={{ fontSize: '16px', color: '#666', marginTop: '8px' }}>
                  {viewingTask.description}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <Tag color={getStatusColor(viewingTask.status)} style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {viewingTask.status}
                  </Tag>
                  <Tag color={getTaskTypeColor(viewingTask.taskType)} style={{ fontSize: '14px', padding: '4px 12px', marginLeft: '8px' }}>
                    {viewingTask.taskType}
                  </Tag>
                </div>
              </Col>
              
              <Col span={12}>
                <strong>Ngày nhận:</strong>
                <div>{new Date(viewingTask.receiveDate).toLocaleDateString('vi-VN')}</div>
              </Col>
              <Col span={12}>
                <strong>Hạn hoàn thành:</strong>
                <div>{viewingTask.deadline ? new Date(viewingTask.deadline).toLocaleDateString('vi-VN') : 'Chưa có'}</div>
              </Col>
              
              <Col span={12}>
                <strong>Khách hàng:</strong>
                <div style={{ color: '#1890ff', fontWeight: 'bold' }}>{viewingTask.customerCode}</div>
                <div>{viewingTask.customerName}</div>
              </Col>
              <Col span={12}>
                <strong>Nhân viên:</strong>
                <div style={{ color: '#1890ff', fontWeight: 'bold' }}>{viewingTask.employeeCode}</div>
                <div>{viewingTask.employeeName}</div>
              </Col>
              
              <Col span={24}>
                <strong>Thống kê Tài chính:</strong>
                <Row gutter={16} style={{ marginTop: '8px' }}>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f6ffed', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#52c41a', fontSize: '14px' }}>
                        {formatCurrency(viewingTask.totalAmount)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Tổng tiền</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#e6f7ff', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#1890ff', fontSize: '14px' }}>
                        {formatCurrency(viewingTask.depositAmount)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Đã cọc</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#fff2f0', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#ff4d4f', fontSize: '14px' }}>
                        {formatCurrency(viewingTask.remainingAmount)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Còn lại</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ textAlign: 'center', padding: '12px', background: '#f9f0ff', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', color: '#722ed1', fontSize: '14px' }}>
                        {formatCurrency(viewingTask.employeePayment)}
                      </div>
                      <div style={{ fontSize: '12px' }}>Trả NV</div>
                    </div>
                  </Col>
                </Row>
              </Col>
              
              <Col span={24}>
                <strong>Trạng thái thanh toán NV:</strong>
                <div style={{ marginTop: '8px' }}>
                  <Tag 
                    color={getPaymentStatusColor(viewingTask.employeePaymentStatus)} 
                    style={{ fontSize: '14px', padding: '4px 12px' }}
                  >
                    <BankOutlined style={{ marginRight: '4px' }} />
                    {viewingTask.employeePaymentStatus}
                  </Tag>
                </div>
              </Col>
              
              {viewingTask.taskLink && (
                <Col span={24}>
                  <strong>Link Task:</strong>
                  <div style={{ 
                    marginTop: '8px', 
                    padding: '12px', 
                    background: '#e6f7ff', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <LinkOutlined style={{ color: '#1890ff' }} />
                    <span style={{ flex: 1, color: '#1890ff', wordBreak: 'break-all' }}>
                      {viewingTask.taskLink}
                    </span>
                    <Button 
                      type="primary" 
                      size="small" 
                      icon={<CopyOutlined />}
                      onClick={() => handleCopyLink(viewingTask.taskLink)}
                    >
                      Copy
                    </Button>
                  </div>
                </Col>
              )}
              
              {viewingTask.comments && (
                <Col span={24}>
                  <strong>Bình luận/Ghi chú:</strong>
                  <div style={{ 
                    marginTop: '8px', 
                    padding: '12px', 
                    background: '#f5f5f5', 
                    borderRadius: '4px',
                    fontStyle: 'italic'
                  }}>
                    {viewingTask.comments}
                  </div>
                </Col>
              )}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MyTask