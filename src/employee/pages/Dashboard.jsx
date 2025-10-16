import { Row, Col, Card, Statistic, Progress, List, Avatar, Tag, Typography } from 'antd'
import { 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  UserOutlined,
  DollarOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography

const Dashboard = () => {
  // Mock data for employee dashboard
  const myTasks = [
    {
      id: 1,
      taskCode: 'TSK00001',
      description: 'Viết tiểu luận về marketing số',
      customerName: 'Công ty ABC',
      taskType: 'Tiểu luận',
      status: 'Đang thực hiện',
      deadline: '2025-10-20',
      progress: 65,
      amount: 2000000
    },
    {
      id: 2,
      taskCode: 'TSK00004',
      description: 'Báo cáo thực tập tại doanh nghiệp',
      customerName: 'Công ty ABC',
      taskType: 'Báo cáo thực tập',
      status: 'Đang sửa lại',
      deadline: '2025-10-18',
      progress: 80,
      amount: 1200000
    },
    {
      id: 3,
      taskCode: 'TSK00006',
      description: 'Thiết kế website responsive',
      customerName: 'Công ty XYZ',
      taskType: 'Website',
      status: 'Chưa thực hiện',
      deadline: '2025-10-25',
      progress: 0,
      amount: 3000000
    }
  ]

  const totalTasks = myTasks.length
  const completedTasks = myTasks.filter(t => t.status === 'Đã hoàn thành').length
  const inProgressTasks = myTasks.filter(t => t.status === 'Đang thực hiện').length
  const pendingTasks = myTasks.filter(t => t.status === 'Chưa thực hiện').length
  const totalEarnings = myTasks.reduce((sum, t) => sum + t.amount, 0)

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
      default:
        return '#d9d9d9'
    }
  }

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
      case 'Website':
        return '#13c2c2'
      default:
        return '#8c8c8c'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          Tổng quan công việc
        </Title>
        <Text type="secondary">
          Chào mừng bạn đến với hệ thống quản lý công việc
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Tổng công việc"
              value={totalTasks}
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Đang thực hiện"
              value={inProgressTasks}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Đã hoàn thành"
              value={completedTasks}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Chưa bắt đầu"
              value={pendingTasks}
              prefix={<ExclamationCircleOutlined style={{ color: '#d9d9d9' }} />}
              valueStyle={{ color: '#d9d9d9' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Earnings Card */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Card>
            <Row gutter={16} align="middle">
              <Col flex="auto">
                <Statistic
                  title="Tổng thu nhập dự kiến"
                  value={totalEarnings}
                  formatter={(value) => formatCurrency(value)}
                  prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                  valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                />
              </Col>
              <Col>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                    Tỷ lệ hoàn thành
                  </div>
                  <Progress
                    type="circle"
                    percent={Math.round((completedTasks / totalTasks) * 100) || 0}
                    size={80}
                    strokeColor="#52c41a"
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Recent Tasks */}
      <Card title="Công việc gần đây" extra={<Text type="secondary">{myTasks.length} công việc</Text>}>
        <List
          dataSource={myTasks}
          renderItem={(task) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={<UserOutlined />} 
                    style={{ backgroundColor: getTaskTypeColor(task.taskType) }}
                  />
                }
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text strong>{task.taskCode}</Text>
                    <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
                    <Tag color={getTaskTypeColor(task.taskType)}>{task.taskType}</Tag>
                  </div>
                }
                description={
                  <div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text>{task.description}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text type="secondary">Khách hàng: {task.customerName}</Text>
                        <br />
                        <Text type="secondary">Hạn: {new Date(task.deadline).toLocaleDateString('vi-VN')}</Text>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <Text strong style={{ color: '#52c41a' }}>
                            {formatCurrency(task.amount)}
                          </Text>
                        </div>
                        <Progress 
                          percent={task.progress} 
                          size="small" 
                          strokeColor={task.progress > 80 ? '#52c41a' : task.progress > 50 ? '#1890ff' : '#faad14'}
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default Dashboard
