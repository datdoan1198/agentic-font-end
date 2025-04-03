import React from "react";
import { Empty, Pagination, Select, Table } from "antd";
import styles from './styles.module.scss'
import './styles.scss'
import PropTypes from "prop-types";
import _ from "lodash";
import { handleGetTextSelectPage } from "../../utils/helper";
import { OPTION_SELECT_LIMIT } from "../../utils/constants";

TableDefault.prototype = {
  isPagination: PropTypes.bool
}

TableDefault.defaultProps = {
  isPagination: true
}

function TableDefault(props) {
  let {
    dataSource, columns, pagination, loading, rowSelection,
    onChange, handleSelectPagination, isPagination,
    isFixed, rowKey, rowClassName, extraClassName,
    scroll, limitTable, handleSelectLimitTable
  } = props;

  return (
    <div className={`${styles.tableDefaultWrap}`}>
      <Table
        loading={loading}
        className={`main-table mb-[15px] 
            ${!isPagination ? 'no-pagination' : ''} 
            ${isFixed ? 'fixed-cell' : ''} 
            ${extraClassName ? extraClassName : ''} `}
        rowClassName={(record) => {
          if (rowClassName && _.isFunction(rowClassName)) {
            return rowClassName(record) ? 'active-row-table-default' : ''
          }
          return ''
        }}
        bordered
        rowSelection={rowSelection || null}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={rowKey ? rowKey : 'id'}
        onChange={onChange}
        locale={{
          emptyText: <Empty description={<i className="text-gray-65">Không có dữ liệu</i>} />
        }}
        scroll={scroll ? scroll : { y: isPagination ? 475 : 550, x: 1000 }}
      />
      {isPagination ? (
        <div className={styles.paginationContainer}>
          <div className={styles.selectPerPageWrap}>
            <Select
              className={`main-select w-30`}
              placeholder="Chọn trạng thái"
              optionLabelProp="label"
              value={limitTable}
              onChange={(e) => handleSelectLimitTable(e)}
            >
              {
                OPTION_SELECT_LIMIT.map(option => {
                  return (
                    <Select.Option key={option.value} value={option.value} label={option.label}>{option.label}</Select.Option>
                  );
                })
              }
            </Select>

            <div className={styles.textShowPage}>{handleGetTextSelectPage(pagination.totalRecord, pagination.currentPage, pagination.perPage)}</div>
          </div>

          <Pagination
            className={'flex justify-end'}
            current={pagination.currentPage}
            total={pagination.totalRecord}
            pageSize={pagination.perPage}
            onChange={(e) => handleSelectPagination(e)}
            showSizeChanger={false}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default TableDefault

