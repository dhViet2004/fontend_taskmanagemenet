import { Row, Col, Card, Button, Table, Tag, Input, Select, Avatar, Space, Modal, Form, DatePicker, message, Popconfirm, Drawer, List, InputNumber, Spin } from 'antd'
import { PlusOutlined, SearchOutlined, UserOutlined, PhoneOutlined, MailOutlined, EditOutlined, DeleteOutlined, EyeOutlined, HomeOutlined, DollarOutlined, CalendarOutlined, ExportOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { Option } = Select
const { TextArea } = Input

const Customer = () => {
  const [searchText, setSearchText] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [stats, setStats] = useState({
    total: 0,
    sourceStats: []
  })

  // Mock data mẫu
  const mockCustomers = [
    {
      id: 1,
      customer_code: 'KH001',
      name: 'Nguyễn Văn An',
      source: 'Facebook',
      times_used: 5,
      total_amount: 2500000,
      created_at: '2024-01-15T08:30:00Z',
      updated_at: '2024-01-20T14:15:00Z'
    },
    {
      id: 2,
      customer_code: 'KH002',
      name: 'Trần Thị Bình',
      source: 'Zalo',
      times_used: 3,
      total_amount: 1800000,
      created_at: '2024-01-18T10:45:00Z',
      updated_at: '2024-01-22T09:30:00Z'
    },
    {
      id: 3,
      customer_code: 'KH003',
      name: 'Lê Văn Cường',
      source: 'TikTok',
      times_used: 7,
      total_amount: 3200000,
      created_at: '2024-01-20T16:20:00Z',
      updated_at: '2024-01-25T11:45:00Z'
    }
  ]

  const mockStats = {
    total: 3,
    sourceStats: [
      { source: 'Facebook', count: 1, total_amount: 2500000 },
      { source: 'Zalo', count: 1, total_amount: 1800000 },
      { source: 'TikTok', count: 1, total_amount: 3200000 }
    ]
  }
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [form] = Form.useForm()

  // Debug modal state
  console.log('Modal state:', { isModalVisible, modalMode, selectedCustomer })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load data from API
  useEffect(() => {
    loadCustomers()
    loadStats()
  }, [pagination.current, pagination.pageSize, searchText, sourceFilter])

  // API Functions
  const loadCustomers = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...(searchText && { search: searchText }),
        ...(sourceFilter !== 'all' && { source: sourceFilter })
      }
      
      const response = await customerService.getAllCustomers(params)
      
      if (response.success) {
        setCustomers(response.data)
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total
        }))
      }
    } catch (error) {
      console.log('API không khả dụng, sử dụng mock data')
      // Sử dụng mock data khi API không khả dụng
      let filteredCustomers = mockCustomers
      
      // Áp dụng filter theo search text
      if (searchText) {
        filteredCustomers = filteredCustomers.filter(customer => 
          customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          customer.customer_code.toLowerCase().includes(searchText.toLowerCase())
        )
      }
      
      // Áp dụng filter theo source
      if (sourceFilter !== 'all') {
        filteredCustomers = filteredCustomers.filter(customer => 
          customer.source === sourceFilter
        )
      }
      
      setCustomers(filteredCustomers)
      setPagination(prev => ({
        ...prev,
        total: filteredCustomers.length
      }))
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await customerService.getCustomerStats()
      
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.log('API stats không khả dụng, sử dụng mock data')
      // Sử dụng mock stats khi API không khả dụng
      setStats(mockStats)
    }
  }

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }


  const getSourceColor = (source) => {
    switch (source) {
      case 'Facebook':
        return '#1877f2'
      case 'Zalo':
        return '#0068ff'
      case 'TikTok':
        return '#fe2c55'
      case 'Giới thiệu':
        return '#52c41a'
      case 'Google':
        return '#4285f4'
      case 'Website':
        return '#722ed1'
      case 'Khác':
        return '#8c8c8c'
      default:
        return '#1890ff'
    }
  }


  // CRUD Functions
  const handleAdd = () => {
    console.log('handleAdd called')
    setModalMode('add')
    setSelectedCustomer(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (customer) => {
    setModalMode('edit')
    setSelectedCustomer(customer)
    form.setFieldsValue({
      name: customer.name,
      source: customer.source,
      times_used: customer.times_used,
      total_amount: customer.total_amount
    })
    setIsModalVisible(true)
  }

  const handleView = (customer) => {
    setSelectedCustomer(customer)
    setIsViewModalVisible(true)
  }

  const handleDelete = async (customerId) => {
    try {
      setLoading(true)
      const response = await customerService.deleteCustomer(customerId)
      
      if (response.success) {
        message.success('Đã xóa khách hàng thành công!')
        loadCustomers()
        loadStats()
      }
    } catch (error) {
      message.error('Lỗi khi xóa khách hàng: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleModalOk = async () => {
    try {
      console.log('Starting form validation...')
      const values = await form.validateFields()
      console.log('Form values:', values)
      
      setLoading(true)
      
      if (modalMode === 'add') {
        console.log('Creating customer with data:', values)
        const response = await customerService.createCustomer(values)
        console.log('Create response:', response)
        
        if (response.success) {
          message.success('Đã thêm khách hàng thành công!')
          loadCustomers()
          loadStats()
          setIsModalVisible(false)
          form.resetFields()
        } else {
          message.error(response.message || 'Lỗi khi tạo khách hàng')
        }
      } else {
        console.log('Updating customer with data:', values)
        const response = await customerService.updateCustomer(selectedCustomer.id, values)
        console.log('Update response:', response)
        
        if (response.success) {
          message.success('Đã cập nhật khách hàng thành công!')
          loadCustomers()
          loadStats()
          setIsModalVisible(false)
          form.resetFields()
        } else {
          message.error(response.message || 'Lỗi khi cập nhật khách hàng')
        }
      }
    } catch (error) {
      console.error('Error in handleModalOk:', error)
      if (error.errorFields) {
        // Form validation errors
        message.error('Vui lòng kiểm tra lại thông tin nhập vào')
      } else {
        // API errors
        message.error('Lỗi: ' + error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleModalCancel = () => {
    console.log('handleModalCancel called')
    setIsModalVisible(false)
    form.resetFields()
  }

  // Statistics from API
  const totalCustomers = stats.total || 0
  const sourceStats = stats.sourceStats || []

  // Table columns
  const columns = [
    {
      title: 'Mã KH',
      dataIndex: 'customer_code',
      key: 'customer_code',
      render: (code) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1890ff' }}>
          {code}
        </span>
      ),
      width: 100,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size="large" 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#1890ff' }}
          />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Nguồn',
      dataIndex: 'source',
      key: 'source',
      render: (source) => (
        <Tag 
          color={getSourceColor(source)}
          style={{ 
            color: 'white', 
            fontWeight: 'bold',
            border: 'none'
          }}
        >
          {source}
        </Tag>
      ),
    },
    {
      title: 'Số lần sử dụng',
      dataIndex: 'times_used',
      key: 'times_used',
      align: 'center',
      render: (timesUsed) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', color: '#52c41a' }}>{timesUsed}</div>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (value) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
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
            title="Bạn có chắc chắn muốn xóa khách hàng này?"
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
        padding: isMobile ? '0 16px' : '0'
      }}>
        <h1 style={{ 
          fontSize: isMobile ? '20px' : '24px', 
          fontWeight: 'bold', 
          margin: 0 
        }}>
          Quản lý Khách hàng
        </h1>
        <Space>
          <Button icon={<ExportOutlined />}>
            Xuất Excel
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              console.log('Button clicked!')
              handleAdd()
            }}
            size={isMobile ? 'middle' : 'large'}
            disabled={loading}
          >
            {isMobile ? 'Thêm' : 'Thêm khách hàng'}
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {totalCustomers}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng khách hàng</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {stats.sourceStats?.reduce((sum, stat) => sum + stat.count, 0) || 0}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng theo nguồn</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#722ed1' }}>
                {stats.sourceStats?.length || 0}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Nguồn khác nhau</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold', color: '#fa8c16' }}>
                {formatCurrency(stats.sourceStats?.reduce((sum, stat) => sum + parseFloat(stat.total_amount || 0), 0) || 0)}
              </div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666' }}>Tổng giá trị</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Source Statistics */}
      <Card 
        title="Thống kê theo nguồn khách hàng" 
        style={{ marginBottom: '24px' }} 
        size={isMobile ? 'small' : 'default'}
      >
        <Row gutter={[12, 12]}>
          {sourceStats.map((stat) => (
            <Col xs={12} sm={8} md={4} key={stat.source}>
              <div style={{ 
                textAlign: 'center', 
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #d9d9d9'
              }}>
                <Tag 
                  color={getSourceColor(stat.source)} 
                  style={{ 
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}
                >
                  {stat.source}
                </Tag>
                <div style={{ 
                  fontSize: isMobile ? '16px' : '18px', 
                  fontWeight: 'bold',
                  color: getSourceColor(stat.source)
                }}>
                  {stat.count}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#666',
                  marginTop: '4px'
                }}>
                  khách hàng
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: '#999',
                  marginTop: '2px'
                }}>
                  {formatCurrency(parseFloat(stat.total_amount || 0))}
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
              placeholder="Tìm kiếm khách hàng..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size={isMobile ? 'middle' : 'large'}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Nguồn"
              value={sourceFilter}
              onChange={setSourceFilter}
              size={isMobile ? 'middle' : 'large'}
            >
              <Option value="all">Tất cả nguồn</Option>
              <Option value="Zalo">Zalo</Option>
              <Option value="Facebook">Facebook</Option>
              <Option value="TikTok">TikTok</Option>
              <Option value="Giới thiệu">Giới thiệu</Option>
              <Option value="Website">Website</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <div style={{ fontSize: '14px', color: '#666', lineHeight: isMobile ? '32px' : '40px' }}>
              Hiển thị {customers.length} / {totalCustomers} khách hàng
            </div>
          </Col>
        </Row>
      </Card>

      {/* Customer Table */}
      <Card>
        <Spin spinning={loading}>
          {!isMobile ? (
            <Table
              columns={columns}
              dataSource={customers}
              rowKey="id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} của ${total} khách hàng`,
                onChange: (page, pageSize) => {
                  setPagination(prev => ({
                    ...prev,
                    current: page,
                    pageSize: pageSize || prev.pageSize
                  }))
                }
              }}
              scroll={{ x: 1200 }}
            />
          ) : (
          <List
            dataSource={customers}
            renderItem={(customer) => (
              <List.Item>
                <Card size="small" style={{ width: '100%' }}>
                  <Row gutter={[8, 8]}>
                    <Col span={4}>
                      <Avatar 
                        size="large" 
                        icon={<UserOutlined />} 
                        style={{ backgroundColor: '#1890ff' }}
                      />
                    </Col>
                    <Col span={20}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {customer.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
                        <Tag color={getSourceColor(customer.source)}>
                          {customer.source}
                        </Tag>
                      </div>
                      <Space size="small" wrap>
                        <span style={{ fontSize: '12px', color: '#999' }}>
                          {customer.times_used} lần sử dụng
                        </span>
                        <span style={{ fontSize: '12px', color: '#1890ff', fontWeight: 'bold' }}>
                          {formatCurrency(customer.total_amount)}
                        </span>
                      </Space>
                      <div style={{ marginTop: '8px' }}>
                        <Space size="small">
                          <Button size="small" icon={<EyeOutlined />} onClick={() => handleView(customer)}>
                            Xem
                          </Button>
                          <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => handleEdit(customer)}>
                            Sửa
                          </Button>
                          <Popconfirm
                            title="Xóa khách hàng?"
                            onConfirm={() => handleDelete(customer.id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button size="small" danger icon={<DeleteOutlined />}>
                              Xóa
                            </Button>
                          </Popconfirm>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} khách hàng`,
              onChange: (page, pageSize) => {
                setPagination(prev => ({
                  ...prev,
                  current: page,
                  pageSize: pageSize || prev.pageSize
                }))
              }
            }}
          />
          )}
        </Spin>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={modalMode === 'add' ? 'Thêm khách hàng mới' : 'Chỉnh sửa khách hàng'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={isMobile ? '95%' : 600}
        okText={modalMode === 'add' ? 'Thêm' : 'Cập nhật'}
        cancelText="Hủy"
        confirmLoading={loading}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="source"
                label="Nguồn khách hàng"
                rules={[{ required: true, message: 'Vui lòng chọn nguồn khách hàng!' }]}
              >
                <Select placeholder="Chọn nguồn khách hàng">
                  <Option value="Zalo">Zalo</Option>
                  <Option value="FB">Facebook</Option>
                  <Option value="Tiktok">TikTok</Option>
                  <Option value="Giới thiệu">Giới thiệu</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="times_used"
                label="Số lần sử dụng"
              >
                <InputNumber 
                  min={0} 
                  placeholder="Nhập số lần sử dụng" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="total_amount"
            label="Tổng số tiền (VNĐ)"
          >
            <InputNumber 
              min={0} 
              placeholder="Nhập tổng số tiền" 
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Thông tin khách hàng"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="edit" type="primary" onClick={() => {
            setIsViewModalVisible(false)
            handleEdit(selectedCustomer)
          }}>
            Chỉnh sửa
          </Button>,
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={isMobile ? '95%' : 600}
      >
        {selectedCustomer && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card size="small">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Avatar 
                      size={64} 
                      icon={<UserOutlined />} 
                      style={{ backgroundColor: '#1890ff' }}
                    />
                    <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '8px' }}>
                      {selectedCustomer.name}
                    </div>
                    <Tag color={getSourceColor(selectedCustomer.source)} style={{ marginTop: '4px' }}>
                      {selectedCustomer.source}
                    </Tag>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24} sm={12}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Mã khách hàng:</strong>
                  <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1890ff' }}>
                    {selectedCustomer.customer_code}
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Nguồn:</strong>
                  <div>
                    <Tag color={getSourceColor(selectedCustomer.source)}>
                      {selectedCustomer.source}
                    </Tag>
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Số lần sử dụng:</strong>
                  <div style={{ color: '#52c41a', fontWeight: 'bold' }}>
                    {selectedCustomer.times_used}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Tổng số tiền:</strong>
                  <div style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    {formatCurrency(selectedCustomer.total_amount)}
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Ngày tạo:</strong>
                  <div>
                    <CalendarOutlined style={{ marginRight: '6px', color: '#faad14' }} />
                    {new Date(selectedCustomer.created_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Cập nhật lần cuối:</strong>
                  <div>
                    <CalendarOutlined style={{ marginRight: '6px', color: '#faad14' }} />
                    {new Date(selectedCustomer.updated_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Customer