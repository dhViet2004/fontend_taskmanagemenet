import { Row, Col, Card, Statistic, Typography, List, Avatar, Space } from 'antd'
import {
  ProjectOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Dashboard = () => {
  const recentActivities = [
    {
      id: 1,
      user: 'Nguyễn Văn An',
      avatar: 'NA',
      action: 'đã hoàn thành nhiệm vụ "Thiết kế trang chủ"',
      time: '2 giờ trước'
    },
    {
      id: 2,
      user: 'Trần Thị Bình',
      avatar: 'TB',
      action: 'đã tạo dự án mới "Ứng dụng di động"',
      time: '4 giờ trước'
    },
    {
      id: 3,
      user: 'Lê Văn Cường',
      avatar: 'LC',
      action: 'đã cập nhật trạng thái nhiệm vụ',
      time: '6 giờ trước'
    },
    {
      id: 4,
      user: 'Phạm Thị Dung',
      avatar: 'PD',
      action: 'đã bình luận trên nhiệm vụ "API Integration"',
      time: '8 giờ trước'
    },
    {
      id: 5,
      user: 'Hoàng Văn Em',
      avatar: 'HE',
      action: 'đã giao nhiệm vụ cho nhóm Frontend',
      time: '1 ngày trước'
    }
  ]

  return (
    <div>
      {/* Welcome Section */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ fontSize: window.innerWidth <= 768 ? '20px' : '32px' }}>
          Tổng quan
        </Title>
        <Paragraph style={{ 
          fontSize: window.innerWidth <= 768 ? '14px' : '18px', 
          color: '#666', 
          maxWidth: '600px', 
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '0 16px' : '0'
        }}>
          Chào mừng bạn đến với trang tổng quan! Đây là nơi bạn sẽ thấy tổng quan về tất cả các dự án, nhiệm vụ và phân tích của mình.
        </Paragraph>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={12} lg={6}>
          <Card size={window.innerWidth <= 768 ? 'small' : 'default'}>
            <Statistic
              title="Tổng dự án"
              value={12}
              prefix={<ProjectOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ 
                color: '#1890ff',
                fontSize: window.innerWidth <= 768 ? '20px' : '24px'
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card size={window.innerWidth <= 768 ? 'small' : 'default'}>
            <Statistic
              title="Nhiệm vụ hoàn thành"
              value={48}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ 
                color: '#52c41a',
                fontSize: window.innerWidth <= 768 ? '20px' : '24px'
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card size={window.innerWidth <= 768 ? 'small' : 'default'}>
            <Statistic
              title="Nhiệm vụ chờ xử lý"
              value={16}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ 
                color: '#faad14',
                fontSize: window.innerWidth <= 768 ? '20px' : '24px'
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card size={window.innerWidth <= 768 ? 'small' : 'default'}>
            <Statistic
              title="Thành viên nhóm"
              value={8}
              prefix={<TeamOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ 
                color: '#722ed1',
                fontSize: window.innerWidth <= 768 ? '20px' : '24px'
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card 
        title="Hoạt động gần đây" 
        size={window.innerWidth <= 768 ? 'small' : 'default'}
      >
        <List
          itemLayout="horizontal"
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar 
                    size={window.innerWidth <= 768 ? 32 : 40}
                    style={{ 
                      background: 'linear-gradient(135deg, #1890ff, #722ed1)' 
                    }}
                  >
                    {item.avatar}
                  </Avatar>
                }
                title={<span style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px' }}>{item.user}</span>}
                description={
                  <Space direction="vertical" size={0}>
                    <span style={{ fontSize: window.innerWidth <= 768 ? '12px' : '14px' }}>
                      {item.action}
                    </span>
                    <span style={{ 
                      color: '#8c8c8c', 
                      fontSize: window.innerWidth <= 768 ? '11px' : '12px' 
                    }}>
                      {item.time}
                    </span>
                  </Space>
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