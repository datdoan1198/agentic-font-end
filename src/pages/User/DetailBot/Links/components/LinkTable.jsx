import { Table } from "antd";
import React from "react";
import styles from "../styles.module.scss";
import TagCustom from "@/components/Tag";
import moment from "moment";

import LinkActions from "./LinkActions";
import { useDispatch } from "react-redux";

const RenderStatusText = (order) => {
  const status = order.status;
  if (status === "trained") {
    return {
      text: "Đã huấn luyện",
      color: "green",
    };
  } else {
    return {
      text: "Chưa xử lý",
      color: "blue",
    };
  }
};

const LinkTable = ({ data, handleOpenModalDelete, handleModalDetail }) => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Đường dẫn",
      dataIndex: "url",
      key: "url",
      width: 360,
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
      width: 280,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 380,
      render: (description) => {
        return <span className={styles.descriptionTable}>{description}</span>;
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status, record) => {
        const { text, color } = RenderStatusText(record);
        return (
          <TagCustom bordered={false} color={color}>
            {text}
          </TagCustom>
        );
      },
    },
    {
      title: "Thể loại",
      key: "type",
      dataIndex: "type",
      render: (type) => {
        return <TagCustom>{type === "full" ? "Quét toàn bộ" : "Quét một trang"}</TagCustom>;
      },
    },
    {
      title: "Ngày cập nhật",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (updated_at) => {
        return moment(updated_at).format("DD/MM/YYYY h:mm");
      },
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <LinkActions
          onRefresh={() => handleModalDetail(true)}
          onView={() => handleModalDetail(true)}
          onDelete={() => dispatch(handleOpenModalDelete(record))}
        />
      ),
    },
  ];

  return (
    <Table
      className={styles.table}
      bordered
      columns={columns}
      dataSource={data}
      size="large"
      scroll={{ x: "max-content" }}
      pagination={false}
    />
  );
};

export default LinkTable;
