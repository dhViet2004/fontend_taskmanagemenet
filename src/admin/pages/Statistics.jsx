import { Row, Col, Card, Progress, Table, Tag, DatePicker, Select, Button, Statistic } from 'antd'
import { 
  TrophyOutlined, 
  RiseOutlined, 
  FallOutlined,
  UserOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { RangePicker } = DatePicker
const { Option } = Select

const Statistics = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [revenueTimeRange, setRevenueTimeRange] = useState('month') // day, week, month, year
  const [selectedDateRange, setSelectedDateRange] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sample data for admin revenue (Doanh thu Admin)
  const adminRevenueData = {
    day: [
      { date: '2025-10-01', deposit: 5000000, finalPayment: 8000000, employeePay: 3000000, netRevenue: 10000000 },
      { date: '2025-10-02', deposit: 3000000, finalPayment: 5000000, employeePay: 2000000, netRevenue: 6000000 },
      { date: '2025-10-03', deposit: 7000000, finalPayment: 10000000, employeePay: 4000000, netRevenue: 13000000 },
      { date: '2025-10-04', deposit: 4000000, finalPayment: 6000000, employeePay: 2500000, netRevenue: 7500000 },
      { date: '2025-10-05', deposit: 6000000, finalPayment: 9000000, employeePay: 3500000, netRevenue: 11500000 },
    ],
    week: [
      { period: 'Tuần 1 - T10', deposit: 25000000, finalPayment: 38000000, employeePay: 15000000, netRevenue: 48000000 },
      { period: 'Tuần 2 - T10', deposit: 30000000, finalPayment: 45000000, employeePay: 18000000, netRevenue: 57000000 },
      { period: 'Tuần 3 - T10', deposit: 28000000, finalPayment: 42000000, employeePay: 17000000, netRevenue: 53000000 },
      { period: 'Tuần 4 - T10', deposit: 32000000, finalPayment: 48000000, employeePay: 19000000, netRevenue: 61000000 },
    ],
    month: [
      { period: 'Tháng 8', deposit: 80000000, finalPayment: 120000000, employeePay: 50000000, netRevenue: 150000000 },
      { period: 'Tháng 9', deposit: 95000000, finalPayment: 140000000, employeePay: 60000000, netRevenue: 175000000 },
      { period: 'Tháng 10', deposit: 115000000, finalPayment: 173000000, employeePay: 69000000, netRevenue: 219000000 },
    ],
    year: [
      { period: '2023', deposit: 800000000, finalPayment: 1200000000, employeePay: 500000000, netRevenue: 1500000000 },
      { period: '2024', deposit: 1200000000, finalPayment: 1800000000, employeePay: 720000000, netRevenue: 2280000000 },
      { period: '2025', deposit: 1380000000, finalPayment: 2070000000, employeePay: 828000000, netRevenue: 2622000000 },
    ]
  }

  // Sample data for employee revenue (Doanh thu Nhân viên)
  const employeeRevenueData = [
    { id: 1, name: 'Nguyễn Văn An', totalEarned: 45000000, tasksCompleted: 24, avgTaskValue: 1875000, department: 'Frontend' },
    { id: 2, name: 'Trần Thị Bình', totalEarned: 38000000, tasksCompleted: 19, avgTaskValue: 2000000, department: 'Backend' },
    { id: 3, name: 'Lê Văn Cường', totalEarned: 52000000, tasksCompleted: 26, avgTaskValue: 2000000, department: 'Fullstack' },
    { id: 4, name: 'Phạm Thị Dung', totalEarned: 41000000, tasksCompleted: 22, avgTaskValue: 1863636, department: 'UI/UX' },
    { id: 5, name: 'Hoàng Văn Em', totalEarned: 35000000, tasksCompleted: 18, avgTaskValue: 1944444, department: 'Mobile' },
  ]

  // Sample data for employee performance (Hiệu suất nhân viên)
  const employeePerformanceData = [
    { 
      id: 1, 
      name: 'Nguyễn Văn An', 
      completedTasks: 24, 
      inProgressTasks: 3, 
      overdueTasks: 1, 
      totalTasks: 28,
      completionRate: 85.7,
      avgCompletionTime: 3.2, // days
      rating: 4.8,
      department: 'Frontend'
    },
    { 
      id: 2, 
      name: 'Trần Thị Bình', 
      completedTasks: 19, 
      inProgressTasks: 2, 
      overdueTasks: 0, 
      totalTasks: 21,
      completionRate: 90.5,
      avgCompletionTime: 2.8,
      rating: 4.9,
      department: 'Backend'
    },
    { 
      id: 3, 
      name: 'Lê Văn Cường', 
      completedTasks: 26, 
      inProgressTasks: 4, 
      overdueTasks: 2, 
      totalTasks: 32,
      completionRate: 81.2,
      avgCompletionTime: 3.5,
      rating: 4.6,
      department: 'Fullstack'
    },
    { 
      id: 4, 
      name: 'Phạm Thị Dung', 
      completedTasks: 22, 
      inProgressTasks: 2, 
      overdueTasks: 1, 
      totalTasks: 25,
      completionRate: 88.0,
      avgCompletionTime: 2.9,
      rating: 4.7,
      department: 'UI/UX'
    },
    { 
      id: 5, 
      name: 'Hoàng Văn Em', 
      completedTasks: 18, 
      inProgressTasks: 3, 
      overdueTasks: 2, 
      totalTasks: 23,
      completionRate: 78.3,
      avgCompletionTime: 4.1,
      rating: 4.3,
      department: 'Mobile'
    },
  ]

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const getPerformanceColor = (rate) => {
    if (rate >= 90) return '#52c41a'
    if (rate >= 80) return '#1890ff'
    if (rate >= 70) return '#faad14'
    return '#ff4d4f'
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#52c41a'
    if (rating >= 4.0) return '#1890ff'
    if (rating >= 3.5) return '#faad14'
    return '#ff4d4f'
  }

  // Current revenue data based on selected time range
  const currentRevenueData = adminRevenueData[revenueTimeRange]

  // Calculate totals for admin revenue
  const totalDeposit = currentRevenueData.reduce((sum, item) => sum + item.deposit, 0)
  const totalFinalPayment = currentRevenueData.reduce((sum, item) => sum + item.finalPayment, 0)
  const totalEmployeePay = currentRevenueData.reduce((sum, item) => sum + item.employeePay, 0)
  const totalNetRevenue = currentRevenueData.reduce((sum, item) => sum + item.netRevenue, 0)

  // Task overview data
  const taskOverviewData = {
    totalTasks: 156,
    completedTasks: 109,
    inProgressTasks: 31,
    overdueTasks: 16,
    completionRate: 69.9
  }

  // Columns for admin revenue table
  const adminRevenueColumns = [
    {
      title: revenueTimeRange === 'day' ? 'Ngày' : 'Kỳ',
      dataIndex: revenueTimeRange === 'day' ? 'date' : 'period',
      key: 'period',
      render: (text) => revenueTimeRange === 'day' ? new Date(text).toLocaleDateString('vi-VN') : text
    },
    {
      title: 'Tiền cọc',
      dataIndex: 'deposit',
      key: 'deposit',
      render: (amount) => formatCurrency(amount),
      align: 'right'
    },
    {
      title: 'Thanh toán cuối',
      dataIndex: 'finalPayment',
      key: 'finalPayment',
      render: (amount) => formatCurrency(amount),
      align: 'right'
    },
    {
      title: 'Trả nhân viên',
      dataIndex: 'employeePay',
      key: 'employeePay',
      render: (amount) => <span style={{ color: '#ff4d4f' }}>{formatCurrency(amount)}</span>,
      align: 'right'
    },
    {
      title: 'Doanh thu ròng',
      dataIndex: 'netRevenue',
      key: 'netRevenue',
      render: (amount) => <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{formatCurrency(amount)}</span>,
      align: 'right'
    }
  ]

  // Columns for employee revenue table
  const employeeRevenueColumns = [
    {
      title: 'Nhân viên',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.department}</div>
        </div>
      )
    },
    {
      title: 'Tổng thu nhập',
      dataIndex: 'totalEarned',
      key: 'totalEarned',
      render: (amount) => <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(amount)}</span>,
      align: 'right'
    },
    {
      title: 'Tasks hoàn thành',
      dataIndex: 'tasksCompleted',
      key: 'tasksCompleted',
      align: 'center'
    },
    {
      title: 'TB/Task',
      dataIndex: 'avgTaskValue',
      key: 'avgTaskValue',
      render: (amount) => formatCurrency(amount),
      align: 'right'
    }
  ]

  // Columns for employee performance table
  const performanceColumns = [
    {
      title: 'Nhân viên',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.department}</div>
        </div>
      )
    },
    {
      title: 'Hoàn thành',
      dataIndex: 'completedTasks',
      key: 'completedTasks',
      align: 'center',
      render: (completed, record) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
          {completed}/{record.totalTasks}
        </span>
      )
    },
    {
      title: 'Đang xử lý',
      dataIndex: 'inProgressTasks',
      key: 'inProgressTasks',
      align: 'center',
      render: (inProgress) => (
        <span style={{ color: '#1890ff' }}>{inProgress}</span>
      )
    },
    {
      title: 'Quá hạn',
      dataIndex: 'overdueTasks',
      key: 'overdueTasks',
      align: 'center',
      render: (overdue) => (
        <span style={{ color: '#ff4d4f' }}>{overdue}</span>
      )
    },
    {
      title: 'Tỷ lệ hoàn thành',
      dataIndex: 'completionRate',
      key: 'completionRate',
      render: (rate) => (
        <div>
          <Progress 
            percent={rate} 
            size="small"
            strokeColor={getPerformanceColor(rate)}
            format={() => `${rate}%`}
          />
        </div>
      )
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Tag color={getRatingColor(rating)}>
          {rating}/5.0
        </Tag>
      ),
      align: 'center'
    }
  ]

  return (
    <div>
      <h1 style={{ 
        fontSize: isMobile ? '20px' : '24px', 
        fontWeight: 'bold', 
        marginBottom: '24px',
        padding: isMobile ? '0 16px' : '0'
      }}>
        Báo cáo Thống kê & Doanh thu
      </h1>

      {/* ===== DOANH THU ADMIN ===== */}
      <Card title="📊 Doanh thu Admin" style={{ marginBottom: '24px' }} size={isMobile ? 'small' : 'default'}>
        {/* Time Range Selector */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={12} md={8}>
            <Select
              value={revenueTimeRange}
              onChange={setRevenueTimeRange}
              style={{ width: '100%' }}
              size={isMobile ? 'middle' : 'large'}
            >
              <Option value="day">Theo ngày</Option>
              <Option value="week">Theo tuần</Option>
              <Option value="month">Theo tháng</Option>
              <Option value="year">Theo năm</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker
              style={{ width: '100%' }}
              size={isMobile ? 'middle' : 'large'}
              onChange={setSelectedDateRange}
              placeholder={['Từ ngày', 'Đến ngày']}
            />
          </Col>
        </Row>

        {/* Revenue Summary */}
        <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Tổng tiền cọc"
                value={totalDeposit}
                formatter={(value) => formatCurrency(value)}
                valueStyle={{ color: '#1890ff', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Thanh toán cuối"
                value={totalFinalPayment}
                formatter={(value) => formatCurrency(value)}
                valueStyle={{ color: '#722ed1', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Trả nhân viên"
                value={totalEmployeePay}
                formatter={(value) => formatCurrency(value)}
                valueStyle={{ color: '#ff4d4f', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Doanh thu ròng"
                value={totalNetRevenue}
                formatter={(value) => formatCurrency(value)}
                valueStyle={{ color: '#52c41a', fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold' }}
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Revenue Detail Table */}
        <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#1890ff' }}>
          Công thức: Doanh thu = (Tiền cọc + Thanh toán cuối) - Tiền trả nhân viên
        </div>
        <Table
          columns={adminRevenueColumns}
          dataSource={currentRevenueData}
          pagination={false}
          scroll={{ x: isMobile ? 800 : undefined }}
          size={isMobile ? 'small' : 'middle'}
        />
      </Card>

      {/* ===== DOANH THU NHÂN VIÊN ===== */}
      <Card title="👥 Doanh thu Nhân viên" style={{ marginBottom: '24px' }} size={isMobile ? 'small' : 'default'}>
        <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#722ed1' }}>
          Doanh thu nhân viên = Tổng số tiền admin trả
        </div>
        <Table
          columns={employeeRevenueColumns}
          dataSource={employeeRevenueData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: isMobile ? 600 : undefined }}
          size={isMobile ? 'small' : 'middle'}
        />
      </Card>

      {/* ===== HIỆU SUẤT NHÂN VIÊN ===== */}
      <Card title="⭐ Hiệu suất Nhân viên" style={{ marginBottom: '24px' }} size={isMobile ? 'small' : 'default'}>
        {/* Performance Overview */}
        <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]} style={{ marginBottom: '24px' }}>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Hoàn thành"
                value={taskOverviewData.completedTasks}
                valueStyle={{ color: '#52c41a', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Đang xử lý"
                value={taskOverviewData.inProgressTasks}
                valueStyle={{ color: '#1890ff', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<ProjectOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Quá hạn"
                value={taskOverviewData.overdueTasks}
                valueStyle={{ color: '#ff4d4f', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Tỷ lệ hoàn thành"
                value={taskOverviewData.completionRate}
                suffix="%"
                valueStyle={{ color: '#722ed1', fontSize: isMobile ? '16px' : '20px' }}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Top Performers */}
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>🏆 Bảng xếp hạng nhân viên</h3>
        </div>
        <Table
          columns={performanceColumns}
          dataSource={employeePerformanceData.sort((a, b) => b.completionRate - a.completionRate)}
          pagination={false}
          scroll={{ x: isMobile ? 1000 : undefined }}
          size={isMobile ? 'small' : 'middle'}
        />
      </Card>

      {/* ===== TỔNG QUAN CÔNG VIỆC ===== */}
      <Card title="📈 Tổng quan Công việc" size={isMobile ? 'small' : 'default'}>
        <Row gutter={[isMobile ? 12 : 24, isMobile ? 12 : 24]}>
          <Col xs={24} lg={12}>
            <Card title="Task Status Overview" size="small">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }}>
                  <PieChartOutlined />
                </div>
                <Progress
                  type="circle"
                  percent={taskOverviewData.completionRate}
                  format={() => `${taskOverviewData.completionRate}%`}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  size={isMobile ? 100 : 120}
                />
                <div style={{ marginTop: '16px', fontSize: isMobile ? '14px' : '16px' }}>
                  Tỷ lệ hoàn thành tổng thể
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Biểu đồ Gantt/Timeline" size="small">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }}>
                  <LineChartOutlined />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Progress percent={85} strokeColor="#52c41a" />
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Q4 2025 Progress</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Progress percent={72} strokeColor="#1890ff" />
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Project Milestones</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Progress percent={91} strokeColor="#722ed1" />
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Team Productivity</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Statistics