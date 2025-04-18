import React from "react"
import BotLayout from "@/layouts/User/BotLayout"
import styles from "./styles.module.scss"

import TagCustom from "../../../../components/Tag"

import LinkTable from "./components/LinkTable"
import FilterGroup from "./components/FilterGroup"
import { useLinks } from "./useLinks"
import ModalAdd from "./components/Modal/ModalAdd"
import ModalDelete from "./components/Modal/ModalDelete"
import ModalDetail from "./components/Modal/ModalDetail"

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
        <span>Links</span>
        <TagCustom color="blue">Tổng số {totalLinks || links?.length || 0}/1000 link</TagCustom>
      </div>
      <div className={styles.mainWrap}>
        <FilterGroup
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onAddNew={() => handleModalAdd(true)}
        />
        <div className="groupTable">
          <LinkTable
            isLoading={isLoading}
            isLoadingScan={isLoadingScan}
            data={links}
            handleOpenModalDelete={handleModalDelete}
            handleViewLink={handleViewLink}
            handleRescanLink={handleRescanLink}
            pagination={pagination}
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
