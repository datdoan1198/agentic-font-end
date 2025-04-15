import React, { useEffect, useState } from "react"
import BotLayout from "@/layouts/User/BotLayout"
import styles from "./styles.module.scss"
import TagCustom from "../../../../components/Tag"
import Search from "antd/es/input/Search"
import { Button, Select, Space, Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { deleteLink, getLinks } from "../../../../api/bot"

const handleChange = (value) => {
  console.log(`selected ${value}`)
}

export default function Links() {
  const dispatch = useDispatch()
  const params = useParams()
  const { botId } = params
  // ========== STATE FROM REDUX ========== //
  const { isLoadingGetLinks, links } = useSelector((state) => state.bot)

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

  // ========== FUNCTION ========== //
  const handleDeleteLink = (link) => {
    dispatch(deleteLink(link.bot_id, link._id))
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
          <button onClick={() => handleDeleteLink(record)}>Delete</button>
        </Space>
      ),
    },
  ]

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
