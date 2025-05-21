import React, { useState } from 'react'
import BotLayout from '@/layouts/User/BotLayout'
import { Card, Row, Col, Typography, Statistic, Divider, List, Avatar, Popover, Button, DatePicker, Space } from 'antd'
import {
  UserOutlined,
  CommentOutlined,
  MessageOutlined,
  FileOutlined,
  LinkOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
// import { Line } from '@ant-design/plots'

export default function DashBoard() {
  const { Title, Text } = Typography
  const { RangePicker } = DatePicker
  const [dateFilter, setDateFilter] = useState('Tháng này')
  const [selectedDateOption, setSelectedDateOption] = useState('Tháng này')
  const [isCustomDateSelected, setIsCustomDateSelected] = useState(false)

  // Sample data for recent messages
  const recentMessages = [
    {
      id: '001',
      avatar: <Avatar style={{ backgroundColor: '#7265e6' }}>G</Avatar>,
      name: 'Guest #001',
      message: 'bạn có chức năng gì',
      time: '1 tuần trước',
    },
    {
      id: '002',
      avatar: <Avatar style={{ backgroundColor: '#7265e6' }}>G</Avatar>,
      name: 'Guest #002',
      message: 'xin chào',
      time: '3 tuần trước',
    },
    {
      id: '003',
      avatar: <Avatar style={{ backgroundColor: '#7265e6' }}>G</Avatar>,
      name: 'Guest #003',
      message: 'chào bạn',
      time: '3 tuần trước',
    },
  ]

  // Sample data for the chart
  const chartData = Array.from({ length: 30 }).map((_, index) => {
    return {
      date: `2023-${Math.floor(index / 30) + 1}-${(index % 30) + 1}`,
      value: Math.floor(Math.random() * 100),
    }
  })

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'value',
    smooth: true,
    xAxis: {
      type: 'time',
    },
  }

  // Date filter popover content
  const dateFilterContent = (
    <div style={{ width: '360px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        {['Hôm nay', 'Hôm qua', 'Tuần trước', 'Tuần này', 'Tháng trước', 'Tháng này'].map((option) => (
          <Button
            className="border border-gray-300 rounded-md"
            key={option}
            type="default"
            style={{
              border: '1px solid #EBEBF0',
              height: '40px',
              borderRadius: '6px',
              ...(selectedDateOption === option
                ? {
                    backgroundColor: '#fff',
                    color: '#4ca1f5',
                    borderColor: '#4ca1f5',
                  }
                : {}),
            }}
            onClick={() => {
              setSelectedDateOption(option)
              setIsCustomDateSelected(false)
            }}
          >
            {option}
          </Button>
        ))}
      </div>
      <Button
        type="default"
        style={{
          border: '1px solid #EBEBF0',
          width: '100%',
          height: '40px',
          borderRadius: '4px',
          marginBottom: '10px',

          ...(isCustomDateSelected
            ? {
                backgroundColor: '#fff',
                color: '#4ca1f5',
                borderColor: '#4ca1f5',
              }
            : {}),
        }}
        onClick={() => {
          setIsCustomDateSelected(true)
          setSelectedDateOption('Tùy chọn')
        }}
      >
        Tùy chọn
      </Button>

      {isCustomDateSelected && (
        <div style={{ marginBottom: '10px' }}>
          <RangePicker
            style={{ width: '100%', marginBottom: '10px' }}
            placeholder={['DD/MM/YYYY', 'DD/MM/YYYY']}
            suffixIcon={<CalendarOutlined />}
          />
        </div>
      )}

      <Button
        type="primary"
        style={{
          width: '100%',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#4ca1f5',
        }}
        onClick={() => {
          setDateFilter(isCustomDateSelected ? 'Tùy chọn' : selectedDateOption)
        }}
      >
        Lọc
      </Button>
    </div>
  )

  return (
    <BotLayout>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={3} style={{ margin: 0 }}>
            Dashboard
          </Title>
          <Popover content={dateFilterContent} trigger="click" placement="bottom" overlayStyle={{ width: 'auto' }}>
            <div className="flex justify-center gap-2 px-4 py-2 text-sm align-middle border border-gray-200 rounded-md cursor-pointer">
              <span>Ngày tạo : {dateFilter} </span>
              <DownOutlined style={{ fontSize: '10px' }} />
            </div>
          </Popover>
        </div>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Người dùng truy cập" value={0} prefix={<UserOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số hội thoại" value={0} prefix={<CommentOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Trung bình tin nhắn/hội thoại" value={0} prefix={<MessageOutlined />} />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số tin nhắn" value={0} prefix={<MessageOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số link" value={610} prefix={<LinkOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số file" value={0} prefix={<FileOutlined />} />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Thời gian trung bình phản hồi" value="0s" prefix={<ClockCircleOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số đăng ký Đặt hàng" value={0} prefix={<ShoppingCartOutlined />} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} lg={14}>
            <Card title="Xu hướng tương tác">{/* <Line {...config} height={300} /> */}</Card>
          </Col>
          <Col xs={24} lg={10}>
            <Card title="Tin nhắn gần đây" extra={<a href="#">Xem tất cả</a>}>
              <div>Bạn nhận được 5 tin nhắn trong tháng này</div>
              <List
                itemLayout="horizontal"
                dataSource={recentMessages}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.avatar}
                      title={
                        <span>
                          {item.name}{' '}
                          <Text type="secondary" style={{ float: 'right' }}>
                            {item.time}
                          </Text>
                        </span>
                      }
                      description={item.message}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </BotLayout>
  )
}
