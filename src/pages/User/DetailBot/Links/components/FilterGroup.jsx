import { Select } from "antd"
import Search from "antd/es/input/Search"
import React from "react"
import { CustomButton } from "../../../../../components/Button"
import styles from "../styles.module.scss"

const FilterGroup = ({ onSearch, onStatusChange, onAddNew }) => {
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
            { value: "trained", label: "Đã huấn luyện" },
            { value: "open", label: "Chưa xử lý" },
          ]}
        />
        <CustomButton className={styles.btnAdd} variant="primary" onClick={() => onAddNew(true)}>
          Thêm mới
        </CustomButton>
      </div>
    </div>
  )
}

export default FilterGroup
