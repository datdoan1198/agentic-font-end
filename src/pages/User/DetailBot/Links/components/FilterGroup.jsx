import { Select } from "antd"
import Search from "antd/es/input/Search"
import React from "react"
import styles from "../styles.module.scss"

const FilterGroup = ({ onSearch, onStatusChange }) => {
  return (
    <div className={styles.groupFilter}>
      <Search placeholder="Tìm kiếm link" size="large" allowClear onSearch={onSearch} />
      <div className={styles.filterWrap}>
        <Select
          allowClear
          className={styles.buttonSelect}
          onChange={onStatusChange}
          placeholder="Lọc trạng thái các đường dẫn"
          options={[
            { value: "TRAINED", label: "Đã huấn luyện" },
            { value: "UNTRAINED", label: "Chưa xử lý" },
          ]}
        />
      </div>
    </div>
  )
}

export default FilterGroup
