import React, { useEffect, useState } from "react"
import BotLayout from "@/layouts/User/BotLayout"
import styles from "./styles.module.scss"
import TagCustom from "../../../../components/Tag"
import Search from "antd/es/input/Search"
import { Button, Select, Space, Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getLinks } from "../../../../api/bot"

const handleChange = (value) => {
  console.log(`selected ${value}`)
}

const columns = [
  {
    title: "Đường dẫn",
    dataIndex: "url",
    key: "url",
    render: (url) => (
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    ),
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Thể loại",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "Ngày cập nhật",
    key: "updated_at",
    dataIndex: "updated_at",
  },
  {
    title: "Thao tác",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
]
const data = [
  {
    _id: 1,
    url: "https://example.com/article-1",
    title: "How to Learn JavaScript Fast",
    description: "Tips and resources to quickly master JavaScript.",
    content:
      "JavaScript is a versatile language used for web development. In this article, we will explore resources, techniques, and exercises that help you learn JavaScript efficiently...",
    status: "trained",
    type: "full",
    updated_at: "2025-04-15T10:30:00Z",
  },
  {
    _id: 2,
    url: "https://example.com/news-2025",
    title: "Tech Trends in 2025",
    description: "A deep dive into the emerging tech trends of 2025.",
    content:
      "From AI advancements to quantum computing, 2025 is shaping up to be a landmark year for technology. Let's take a look at what's ahead...",
    status: "open",
    type: "once",
    updated_at: "2025-04-10T15:45:00Z",
  },
  {
    _id: 3,
    url: "https://example.com/guide-react",
    title: "Ultimate ReactJS Guide",
    description: "A comprehensive guide to mastering ReactJS.",
    content:
      "ReactJS is one of the most popular frontend frameworks. This guide will walk you through components, hooks, state management, and best practices...",
    status: "trained",
    type: "full",
    updated_at: "2025-04-13T08:00:00Z",
  },
]

export default function Links() {
  const dispatch = useDispatch()
  const params = useParams()
  const { botId } = params
  // ========== STATE FROM REDUX ========== //
  const { botChats, isLoadingGetLinks, links } = useSelector((state) => state.bot)

  console.log("links", links)

  // ========== STATE ========== //
  const [pagination, setPagination] = useState({
    keySearch: "",
    page: 1,
    perPage: 10,
  })

  // ========== USE EFFECT ========== //
  useEffect(() => {
    dispatch(getLinks(botId, pagination))
  }, [dispatch])

  return (
    <BotLayout>
      <div className={styles.headerWrap}>
        <span>Links</span>
        <TagCustom color="blue">Tổng số 9/1000 link</TagCustom>
      </div>
      <div className={styles.mainWrap}>
        <div className={styles.groupFilter}>
          <Search placeholder="Tìm kiếm link" size="large" allowClear />
          <Select
            allowClear
            className={styles.buttonSelect}
            onChange={handleChange}
            placeholder="Lọc trạng thái các đường dẫn"
            options={[
              { value: "jack", label: "Đã huấn luyện" },
              { value: "lucy", label: "Chưa xử lý" },
            ]}
          />
          <Button className={styles.buttonAdd}>Thêm mới</Button>
        </div>
        <div className="groupTable">
          <Table bordered columns={columns} dataSource={links} />
        </div>
      </div>
    </BotLayout>
  )
}
