import React from 'react'
import BotLayout from '@/layouts/User/BotLayout'
import styles from './styles.module.scss'
import TagCustom from '../../../../components/Tag'
import LinkTable from './components/LinkTable'
import { useLinks } from './useLinks'
import ModalAdd from './components/Modal/ModalAdd'
import ModalDelete from './components/Modal/ModalDelete'
import ModalDetail from './components/Modal/ModalDetail'
import { Button, Input, Select } from 'antd'
import IconSearch from '@/assets/images/icons/duotone/magnifying-glass.svg'

export default function Links() {
  const {
    links,
    isLoading,
    linkContent,
    isLoadingCreate,
    isLoadingScan,
    pagination,
    openModalAdd,
    openModalDetail,
    openModalDelete,
    selectedLink,
    totalLinks,
    paginationLinks,
    handleModalAdd,
    handleModalDetail,
    handleModalDelete,
    handleSearch,
    handleStatusChange,
    handlePageChange,
    handleAddLink,
    handleViewLink,
    handleDeleteLink,
    handleRescanLink,
  } = useLinks()

  return (
    <BotLayout>
      <div className={styles.headerWrap}>
        <span className={styles.title}>Links</span>
        <TagCustom color="blue">Tổng số {totalLinks || links?.length || 0}/1000 link</TagCustom>
      </div>
      <div className={styles.mainWrap}>
        <div className={styles.filterWrap}>
          <Input
            prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
            className="main-input"
            size={'large'}
            placeholder={'Tìm kiếm theo tên link'}
            value={pagination.keySearch}
            onChange={(e) => handleSearch(e)}
          />

          <Select
            allowClear
            className={styles.buttonSelect}
            onChange={handleStatusChange}
            placeholder="Lọc trạng thái các đường dẫn"
            options={[
              { value: 'TRAINED', label: 'Đã huấn luyện' },
              { value: 'UNTRAINED', label: 'Chưa xử lý' },
            ]}
          />

          <Button className={styles.btnAdd} onClick={() => handleModalAdd()}>
            Thêm Link
          </Button>
        </div>
        <div className="groupTable">
          <LinkTable
            isLoading={isLoading}
            isLoadingScan={isLoadingScan}
            data={links}
            handleOpenModalDelete={handleModalDelete}
            handleViewLink={handleViewLink}
            handleRescanLink={handleRescanLink}
            pagination={paginationLinks}
            handlePageChange={handlePageChange}
            total={totalLinks}
          />
        </div>
      </div>
      <ModalAdd
        open={openModalAdd}
        onClose={() => handleModalAdd(false)}
        onAddLink={handleAddLink}
        isLoading={isLoadingCreate}
      />
      <ModalDelete
        open={openModalDelete}
        onClose={() => handleModalDelete(false)}
        onDeleteLink={handleDeleteLink}
        link={openModalDelete ? openModalDelete : null}
      />
      <ModalDetail
        open={openModalDetail}
        onClose={() => handleModalDetail(false)}
        link={selectedLink}
        linkContent={linkContent}
      />
    </BotLayout>
  )
}
