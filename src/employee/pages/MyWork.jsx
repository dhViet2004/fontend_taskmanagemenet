import { Row, Col, Card, Button, Table, Tag, Input, Select, Avatar, Space, Modal, Form, message, List, Typography } from 'antd'
import { PlusOutlined, SearchOutlined, UserOutlined, DollarOutlined, EditOutlined, EyeOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

const MyWork = () => {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [taskTypeFilter, setTaskTypeFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [viewingTask, setViewingTask] = useState(null)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sample tasks data for employee - only fields employee can see
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskCode: 'TSK00001',
      receiveDate: '2025-10-10',
      employeeName: 'Nguyễn Văn An',
      taskType: 'Tiểu luận',
      employeePayment: 2000000,
      employeePaymentStatus: 'Chưa thanh toán',
      description: 'Viết tiểu luận về marketing số',
      status: 'Đang thực hiện',
      comments: 'Cần hoàn thành trước ngày 20/10'
    },
    {
      id: 2,
      taskCode: 'TSK00004',
      receiveDate: '2025-10-09',
      employeeName: 'Nguyễn Văn An',
      taskType: 'Báo cáo thực tập',
      employeePayment: 1200000,
      employeePaymentStatus: 'Đã thanh toán',
      description: 'Báo cáo thực tập tại doanh nghiệp',
      status: 'Đang sửa lại',
      comments: 'Cần chỉnh sửa một số phần theo yêu cầu'
    },
    {
      id: 3,
      taskCode: 'TSK00006',
      receiveDate: '2025-10-12',
      employeeName: 'Nguyễn Văn An',
      taskType: 'PPT',
      employeePayment: 3000000,
      employeePaymentStatus: 'Chưa thanh toán',
      description: 'Thiết kế slide thuyết trình',
      status: 'Chưa thực hiện',
      comments: 'Chờ khách hàng cung cấp thông tin chi tiết'
    }
  ])

  // Status options
  const statusOptions = [
    'Chưa thực hiện',
    'Đang thực hiện', 
    'Đã hoàn thành',
    'Đang sửa lại',
    'Còn làm tiếp'
  ]

  // Task type options - enum for employee
  const taskTypeOptions = [
    'Căn chỉnh',
    'Tiểu luận', 
    'Khóa luận',
    'Đề cương',
    'PPT',
    'Báo cáo thực tập',
    'Luận văn',
    'Báo cáo',
    'Khác'
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
      case 'Luận văn':
        return '#13c2c2'
      case 'Báo cáo':
        return '#eb2f96'
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
  const handleEdit = (task) => {
    setEditingTask(task)
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
      const taskData = {
        ...values,
        receiveDate: values.receiveDate ? values.receiveDate.format('YYYY-MM-DD') : null,
        deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,
      }

      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { 
              ...task, 
              ...taskData,
              receiveDate: values.receiveDate ? values.receiveDate.format('YYYY-MM-DD') : task.receiveDate,
              deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : task.deadline,
              // Reset payment status to "Chưa thanh toán" when employee updates payment amount
              employeePaymentStatus: values.employeePayment !== task.employeePayment ? 'Chưa thanh toán' : task.employeePaymentStatus
            }
          : task
      ))
      message.success('Cập nhật thông tin công việc thành công!')
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.taskCode.toLowerCase().includes(searchText.toLowerCase()) ||
      task.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase())

    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesTaskType = taskTypeFilter === 'all' || task.taskType === taskTypeFilter

    return matchesSearch && matchesStatus && matchesTaskType
  })

  // Statistics for employee
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'Đã hoàn thành').length
  const inProgressTasks = tasks.filter(t => t.status === 'Đang thực hiện').length
  const totalEarnings = tasks.reduce((sum, t) => sum + t.employeePayment, 0)
  const paidEarnings = tasks.filter(t => t.employeePaymentStatus === 'Đã thanh toán').reduce((sum, t) => sum + t.employeePayment, 0)

  // Table columns - only fields employee can see
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
      title: 'Ngày nhận',
      dataIndex: 'receiveDate',
      key: 'receiveDate',
      render: (date) => (
        <div style={{ fontSize: '12px' }}>
          <CalendarOutlined style={{ marginRight: '4px', color: '#666' }} />
          {new Date(date).toLocaleDateString('vi-VN')}
        </div>
      ),
      width: 120,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (name) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <span style={{ fontWeight: 'bold' }}>{name}</span>
        </div>
      ),
      width: 150,
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
      width: 120,
    },
    {
      title: 'Số tiền trả NV',
      dataIndex: 'employeePayment',
      key: 'employeePayment',
      render: (amount) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#52c41a' }}>
            {formatCurrency(amount)}
          </div>
        </div>
      ),
      width: 120,
    },
    {
      title: 'TT thanh toán',
      dataIndex: 'employeePaymentStatus',
      key: 'employeePaymentStatus',
      render: (status) => (
        <Tag 
          color={getPaymentStatusColor(status)}
          style={{ fontSize: '11px', fontWeight: 'bold' }}
        >
          {status}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => (
        <div style={{ 
          maxWidth: '200px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          fontSize: '12px'
        }}>
          {desc}
        </div>
      ),
      width: 200,
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
      width: 120,
    },
    {
      title: 'Bình luận',
      dataIndex: 'comments',
      key: 'comments',
      render: (comments) => (
        <div style={{ 
          maxWidth: '150px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          fontSize: '11px',
          color: '#666'
        }}>
          {comments}
        </div>
      ),
      width: 150,
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
            Cập nhật
          </Button>
        </Space>
      ),
      width: 120,
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
          Công việc của tôi
        </h1>
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
              <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold', color: '#52c41a' }}>
                {formatCurrency(paidEarnings)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Đã nhận</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Earnings Statistics */}
      <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#1890ff' }}>
                {formatCurrency(totalEarnings)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng thu nhập</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#faad14' }}>
                {formatCurrency(totalEarnings - paidEarnings)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Chưa nhận</div>
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
            scroll={{ x: 1200 }}
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
                    <div>NV: {task.employeeName}</div>
                    <div>Ngày nhận: {new Date(task.receiveDate).toLocaleDateString('vi-VN')}</div>
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
                    <div>Thu nhập: {formatCurrency(task.employeePayment)}</div>
                    <div>Bình luận: {task.comments}</div>
                  </div>
                  <Space size="small">
                    <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => handleView(task)}>
                      Xem
                    </Button>
                    <Button size="small" type="link" icon={<EditOutlined />} onClick={() => handleEdit(task)}>
                      Cập nhật
                    </Button>
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

      {/* Edit Modal */}
      <Modal
        title="Cập nhật công việc"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={isMobile ? '95%' : 600}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
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

          <Form.Item
            name="employeePayment"
            label="Số tiền yêu cầu (VNĐ)"
            rules={[
              { required: true, message: 'Vui lòng nhập số tiền yêu cầu!' },
              { type: 'number', min: 0, message: 'Số tiền phải lớn hơn 0!' }
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập số tiền yêu cầu"
              addonAfter="VNĐ"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="comments"
            label="Bình luận"
          >
            <TextArea rows={3} placeholder="Bình luận về công việc" />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Chi tiết công việc"
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
                <strong>Tên nhân viên:</strong>
                <div style={{ color: '#1890ff', fontWeight: 'bold' }}>{viewingTask.employeeName}</div>
              </Col>
              
              <Col span={12}>
                <strong>Loại Task:</strong>
                <div>
                  <Tag color={getTaskTypeColor(viewingTask.taskType)} style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {viewingTask.taskType}
                  </Tag>
                </div>
              </Col>
              <Col span={12}>
                <strong>Số tiền trả NV:</strong>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#52c41a' }}>
                  {formatCurrency(viewingTask.employeePayment)}
                </div>
              </Col>
              
              <Col span={12}>
                <strong>Trạng thái thanh toán:</strong>
                <div style={{ marginTop: '8px' }}>
                  <Tag 
                    color={getPaymentStatusColor(viewingTask.employeePaymentStatus)} 
                    style={{ fontSize: '14px', padding: '4px 12px' }}
                  >
                    {viewingTask.employeePaymentStatus}
                  </Tag>
                </div>
              </Col>
              <Col span={12}>
                <strong>Trạng thái:</strong>
                <div style={{ marginTop: '8px' }}>
                  <Tag 
                    color={getStatusColor(viewingTask.status)} 
                    style={{ fontSize: '14px', padding: '4px 12px' }}
                  >
                    {viewingTask.status}
                  </Tag>
                </div>
              </Col>
              
              <Col span={24}>
                <strong>Mô tả:</strong>
                <div style={{ 
                  marginTop: '8px', 
                  padding: '12px', 
                  background: '#f5f5f5', 
                  borderRadius: '4px'
                }}>
                  {viewingTask.description}
                </div>
              </Col>
              
              {viewingTask.comments && (
                <Col span={24}>
                  <strong>Bình luận:</strong>
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

export default MyWork
