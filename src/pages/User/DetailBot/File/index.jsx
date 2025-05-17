import React from "react"
import BotLayout from "@/layouts/User/BotLayout"
import styles from "./styles.module.scss"
import {Input, Modal, Table, Tooltip, Upload} from "antd";
import Handle from './handle.js'
import IconSearch from "@/assets/images/icons/duotone/magnifying-glass.svg";
import {InboxOutlined} from "@ant-design/icons";
import ModalDeleteDefault from "@/components/ModalDelete/index.jsx";
import InlineSVG from "react-inlinesvg";
import RoTate from "@/assets/images/icons/solid/right-left.svg";
import InputForm from "@/components/InputForm/index.jsx";

const { Dragger } = Upload;

export default function File() {
    const {
        columns, knowledgeFiles, loadingTableFile, dataFilter, pagination,
        propsCreateFile, fileSelect, visibleDetailFile, setVisibleDetailFile,
        loadingBtnDeleteFile, visibleModalDeleteFile,
        handlePageChange, handleSearch,
        handleConfirmDeleteFile, toggleVisibleModalDeleteFile
    } = Handle()

    return (
        <BotLayout>
            <div className={styles.headerWrap}>
                <span className={styles.title}>Tài liệu</span>
            </div>
            <div className={styles.mainWrap}>
                <div className={styles.btnAddFile}>
                    <Dragger {...propsCreateFile}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Vui lòng tải lên tệp định dạng .xls, .xlsx, .doc, .docx (tối đa 10MB/tệp)</p>
                    </Dragger>
                </div>
                <div className={styles.filterWrap}>
                    <Input
                        prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
                        className="main-input"
                        size={"large"}
                        placeholder={'Tìm kiếm theo tên file'}
                        value={dataFilter.keySearch}
                        onChange={(e) => handleSearch(e)}
                    />
                </div>

                <div>
                    <Table
                        loading={loadingTableFile}
                        bordered
                        columns={columns}
                        dataSource={knowledgeFiles}
                        size="large"
                        scroll={{ x: "max-content" }}
                        pagination={pagination}
                        onChange={handlePageChange}
                        rowKey="_id"
                    />
                </div>
            </div>

            <ModalDeleteDefault
                content={<span>Bạn có chắc chắn muốn xóa dữ liệu tri thức trong file <b>{fileSelect?.title}</b> không?</span>}
                contentBtn={'Xóa File'}
                isModalOpen={visibleModalDeleteFile}
                handleOk={() => toggleVisibleModalDeleteFile()}
                handleCancel={() => toggleVisibleModalDeleteFile()}
                handleConfirm={() => handleConfirmDeleteFile()}
                loading={loadingBtnDeleteFile}
            />

            <Modal
                className={`general-dialog-wrap`}
                open={visibleDetailFile}
                onOk={() => setVisibleDetailFile(!visibleDetailFile)}
                onCancel={() => setVisibleDetailFile(!visibleDetailFile)}
                footer={false}
                closable={false}
                width={500}
                centered
            >
                <div className={styles.formViewDetailFile}>
                    <div className={styles.headerForm}>
                        <div className={styles.title}>
                            Chi tiết file {fileSelect?.title}
                        </div>
                    </div>

                    <div>
                        <InputForm
                            label={'Tên'}
                            value={fileSelect?.title}
                            isDisabled={true}
                        />

                        <InputForm
                            label={'Nội dung'}
                            isTextArea={true}
                            value={fileSelect?.content}
                            isDisabled={true}
                            rows={8}
                        />
                    </div>
                </div>
            </Modal>
        </BotLayout>
    )
}
