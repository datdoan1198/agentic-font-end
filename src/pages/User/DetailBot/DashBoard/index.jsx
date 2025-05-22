import React, {useEffect, useState} from "react";
import BotLayout from "@/layouts/User/BotLayout";
import {Card, Row, Col, Statistic, Divider, List, Avatar, Popover, Button, DatePicker, Space} from "antd";
import {
  UserOutlined,
  CommentOutlined,
  MessageOutlined,
  FileOutlined,
  LinkOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {Line} from "@ant-design/plots";
import Handle from "./handle";
import moment from "moment";

export default function DashBoard() {
  const {
    Title,
    Text,
    RangePicker,
    dateFilter,
    selectedDateOption,
    isCustomDateSelected,
    customDateRange,
    latestMessageStats,
    messageStatsByDay,
    generalStats,
    setDateFilter,
    setSelectedDateOption,
    setIsCustomDateSelected,
    setCustomDateRange,
    updateDateFilter,
    handleNavigateToConversation,
  } = Handle();
  const [recentMessages, setRecentMessages] = useState([]);
  const [datePopoverVisible, setDatePopoverVisible] = useState(false);

  useEffect(() => {
    const gradients = [
      "linear-gradient(135deg, #4ca1f5 0%, #fbc2eb 100%)", // xanh tới hồng nhạt
      "linear-gradient(135deg, #4ca1f5 0%, #a1ffce 100%)", // xanh tới xanh lá nhạt
      "linear-gradient(135deg, #4ca1f5 0%, #fcb69f 100%)", // xanh tới cam đào
      "linear-gradient(135deg, #4ca1f5 0%, #ffe29f 100%)", // xanh tới vàng nhạt
      "linear-gradient(135deg, #4ca1f5 0%, #fda085 100%)", // xanh tới cam
      "linear-gradient(135deg, #4ca1f5 0%, #d4fc79 100%)", // xanh tới xanh lá chanh
      "linear-gradient(135deg, #4ca1f5 0%, #c2e9fb 100%)", // xanh tới xanh baby
      "linear-gradient(135deg, #4ca1f5 0%, #fff6b7 100%)", // xanh tới vàng pastel
      "linear-gradient(135deg, #4ca1f5 0%, #f7797d 100%)", // xanh tới đỏ cam
      "linear-gradient(135deg, #4ca1f5 0%, #fdfbfb 100%)", // xanh tới trắng ngọc trai
      "linear-gradient(135deg, #4ca1f5 0%, #e0c3fc 100%)", // xanh tới tím violet nhạt
      "linear-gradient(135deg, #4ca1f5 0%, #f9d423 100%)", // xanh tới vàng cam
      "linear-gradient(135deg, #4ca1f5 0%, #a8edea 100%)", // xanh tới xanh ngọc
      "linear-gradient(135deg, #4ca1f5 0%, #ff9a9e 100%)", // xanh tới hồng đào
      "linear-gradient(135deg, #4ca1f5 0%, #b2fefa 100%)", // xanh tới xanh ngọc sáng
      "linear-gradient(135deg, #4ca1f5 0%, #fceabb 100%)", // xanh tới vàng kem
      "linear-gradient(135deg, #4ca1f5 0%, #eecda3 100%)", // xanh tới cam nhạt
      "linear-gradient(135deg, #4ca1f5 0%, #ffdde1 100%)", // xanh tới hồng baby
      "linear-gradient(135deg, #4ca1f5 0%, #b5fffc 100%)", // xanh tới xanh băng
      "linear-gradient(135deg, #4ca1f5 0%, #e0eafc 100%)", // xanh tới xanh pastel nhạt
    ];

    const randomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

    if (latestMessageStats && latestMessageStats.length > 0) {
      const recentMessages = latestMessageStats?.map((item, index) => ({
        id: item.conversation_id,
        avatar: (
          <Avatar
            style={{
              background: randomGradient(),
              color: "#fff",
            }}
          />
        ),
        name: `Guest #${latestMessageStats.length - index}`,
        message: item.content,
        time: moment(item.created_at).local().fromNow(),
      }));

      setRecentMessages(recentMessages.slice(0, 5));
    }
  }, [latestMessageStats]);

  // Handle date filter change and API call
  const handleFilterClick = () => {
    updateDateFilter(isCustomDateSelected ? "Tùy chọn" : selectedDateOption);
    setDatePopoverVisible(false); // Close popover after filtering
  };

  // Handle RangePicker change
  const handleRangePickerChange = (dates) => {
    setCustomDateRange(dates);
  };

  // Date filter popover content
  const dateFilterContent = (
    <div style={{width: "360px"}}>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px"}}>
        {["Hôm nay", "Hôm qua", "Tuần trước", "Tuần này", "Tháng trước", "Tháng này"].map((option) => (
          <Button
            className="border border-gray-300 rounded-md"
            key={option}
            type="default"
            style={{
              border: "1px solid #EBEBF0",
              height: "40px",
              borderRadius: "6px",
              ...(selectedDateOption === option
                ? {
                    backgroundColor: "#fff",
                    color: "#4ca1f5",
                    borderColor: "#4ca1f5",
                  }
                : {}),
            }}
            onClick={() => {
              setSelectedDateOption(option);
              setIsCustomDateSelected(false);
            }}
          >
            {option}
          </Button>
        ))}
      </div>
      <Button
        type="default"
        style={{
          border: "1px solid #EBEBF0",
          width: "100%",
          height: "40px",
          borderRadius: "4px",
          marginBottom: "10px",

          ...(isCustomDateSelected
            ? {
                backgroundColor: "#fff",
                color: "#4ca1f5",
                borderColor: "#4ca1f5",
              }
            : {}),
        }}
        onClick={() => {
          setIsCustomDateSelected(true);
          setSelectedDateOption("Tùy chọn");
        }}
      >
        Tùy chọn
      </Button>

      {isCustomDateSelected && (
        <div style={{marginBottom: "10px"}}>
          <RangePicker
            style={{width: "100%", marginBottom: "10px"}}
            placeholder={["DD/MM/YYYY", "DD/MM/YYYY"]}
            suffixIcon={<CalendarOutlined />}
            value={customDateRange}
            onChange={handleRangePickerChange}
            format="DD/MM/YYYY"
          />
        </div>
      )}

      <Button
        type="primary"
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "4px",
          backgroundColor: "#4ca1f5",
        }}
        onClick={handleFilterClick}
      >
        Lọc
      </Button>
    </div>
  );

  // Format the display date string
  const getDisplayDateText = () => {
    if (isCustomDateSelected && dateFilter.start_day && dateFilter.end_day) {
      return `${dateFilter.start_day} - ${dateFilter.end_day}`;
    }
    return selectedDateOption;
  };

  return (
    <BotLayout>
      <div style={{padding: "20px"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Title level={3} style={{margin: 0}}>
            Tổng quan
          </Title>
          <Popover
            content={dateFilterContent}
            trigger="click"
            placement="bottom"
            overlayStyle={{width: "auto"}}
            open={datePopoverVisible}
            onOpenChange={(visible) => setDatePopoverVisible(visible)}
          >
            <div className="flex justify-center gap-2 px-4 py-2 text-sm align-middle border border-gray-200 rounded-md cursor-pointer">
              <span>Ngày tạo: {getDisplayDateText()} </span>
              <DownOutlined style={{fontSize: "10px"}} />
            </div>
          </Popover>
        </div>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Người dùng truy cập"
                value={generalStats.number_user_access}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Tổng số hội thoại"
                value={generalStats.total_conversation}
                prefix={<CommentOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Trung bình tin nhắn/hội thoại"
                value={generalStats.average_number_messages}
                prefix={<MessageOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số tin nhắn" value={generalStats.total_messages} prefix={<MessageOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số link" value={generalStats.total_link} prefix={<LinkOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic title="Tổng số file" value={generalStats.total_file} prefix={<FileOutlined />} />
            </Card>
          </Col>

          {/* <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Thời gian trung bình phản hồi"
                value={generalStats.average_response_time}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Tổng số đăng ký Đặt hàng"
                value={generalStats.total_order}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col> */}
        </Row>

        <Row gutter={[16, 16]} style={{marginTop: "20px"}}>
          <Col xs={24} lg={24}>
            <div
              title="Tin nhắn gần đây"
              extra={
                <a onClick={() => handleNavigateToConversation()} href="#">
                  Xem tất cả
                </a>
              }
            >
              {/* <div>Bạn nhận được {latestMessageStats?.length} tin nhắn trong tháng này</div> */}
              <List
                itemLayout="horizontal"
                dataSource={recentMessages}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => handleNavigateToConversation(item.id)}
                    className="duration-100 rounded-md cursor-pointer  transition-easy hover:bg-gray-200 !p-4 "
                  >
                    <List.Item.Meta
                      className="flex !items-center"
                      avatar={item.avatar}
                      title={
                        <span>
                          {item.name}{" "}
                          <Text type="secondary" style={{float: "right"}}>
                            {item.time}
                          </Text>
                        </span>
                      }
                      description={item.message}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{marginTop: "20px"}}>
          <Col xs={24} lg={24}>
            <Card title="Xu hướng tương tác">
              <Line {...messageStatsByDay} height={300} />
            </Card>
          </Col>
        </Row>
      </div>
    </BotLayout>
  );
}
