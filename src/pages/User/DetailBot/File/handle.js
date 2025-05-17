import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {createKnowledgeFiles, deleteKnowledgeFiles, getListKnowledgeFiles} from "@/api/user/file/index.js";
import TagCustom from "@/components/Tag/index.jsx";
import _ from 'lodash'
import {getNotification, handleSetTimeOut, statusTrain} from "@/utils/helper.js";
import {message, Tooltip, Upload} from "antd";
import InlineSVG from "react-inlinesvg";
import View from "@/assets/images/icons/solid/eye.svg";
import Delete from "@/assets/images/icons/solid/trash.svg";
import styles from './styles.module.scss'

export default function Handle() {
    const bot = useSelector((state) => state.detailBot.bot);
    const [timeoutId, setTimeoutId] = useState(null)
    const columns = [
        {
            title: "Đường dẫn",
            dataIndex: "url",
            key: "url",
            render: (text, record) => (
                <a href={record.path} target="_blank" rel="noreferrer">
                    {record.title}
                </a>
            ),
        },
        {
            title: "Trạng thái tri thức",
            key: "status",
            dataIndex: "status",
            align: "center",
            width: 200,
            render: (status, record) => {
                const { text, color } = statusTrain(record.status)
                return (
                    <TagCustom bordered={false} color={color}>
                        {text}
                    </TagCustom>
                )
            },
        },
        {
            title: "Thao tác",
            key: "action",
            dataIndex: "action",
            align: "center",
            width: 200,
            render: (text, record) => (
                <div className={styles.actionWrap}>
                    <Tooltip placement='bottom' title={'Xem chi tiết'}>
                        <div className={styles.actionItemWrap} onClick={() => handleViewDetailFile(record)}>
                            <InlineSVG src={View} width={15}/>
                        </div>
                    </Tooltip>
                    <Tooltip placement='bottom' title={'Xóa'}>
                        <div className={styles.actionItemWrap} onClick={() => toggleVisibleModalDeleteFile(record)}>
                            <InlineSVG src={Delete} width={14}/>
                        </div>
                    </Tooltip>
                </div>

            )
        }
    ]
    const [knowledgeFiles, setKnowledgeFiles] = useState([])
    const [loadingTableFile, setLoadingTableFile] = useState(false)
    const initDataFilter = {
        keySearch: "",
        page: 1,
        perPage: 10,
    }
    const [pagination, setPagination] = useState({page: 1, perPage: 10})
    const [dataFilter, setDataFilter] = useState(initDataFilter)
    const propsCreateFile = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.xls,.xlsx,.doc,.docx',
        showUploadList: false,
        beforeUpload: (file) => {
            const isAccept = file.type === 'application/vnd.ms-excel' ||
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/msword' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            if (!isAccept) {
                message.error('Only Excel files (.xls, .xlsx) are allowed!');
                return Upload.LIST_IGNORE;
            }

            handleCreateKnowledgeFile(file)
            return false;
        }
    };
    const [fileSelect, setFileSelect] = useState(null)
    const [visibleModalDeleteFile, setVisibleModalDeleteFile] = useState(false)
    const [loadingBtnDeleteFile, setLoadingBtnDeleteFile] = useState(false)
    const [visibleDetailFile, setVisibleDetailFile] = useState(false)

    useEffect(() => {
        handleGetListKnowledgeFiles()
    }, [])

    const handleGetListKnowledgeFiles = (data = null) => {
        setLoadingTableFile(true)
        getListKnowledgeFiles(bot._id, data ? data : dataFilter).then((res) => {
            setKnowledgeFiles(res.data.data.files)
            setPagination({
                page: res.data.data.page || 1,
                perPage: res.data.data.perPage || 10
            });
        }).catch(() => {
            setKnowledgeFiles([])
            setDataFilter(initDataFilter)
        }).finally(() => setLoadingTableFile(false))
    }

    const handlePageChange = (page, pageSize) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.page = page;
        newDataFilter.perPage = pageSize;
        setDataFilter(newDataFilter);
        handleGetListKnowledgeFiles(newDataFilter)
    }

    const handleSearch = (e) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.keySearch = e.target.value;
        newDataFilter.page = 1;
        setDataFilter(newDataFilter);
        let newTimeoutId = handleSetTimeOut(() => {
            handleGetListKnowledgeFiles(newDataFilter)
        }, 500, timeoutId)
        setTimeoutId(newTimeoutId);
    }

    const handleCreateKnowledgeFile = (file) => {
        const formData = new FormData()
        formData.append("file", file)

        createKnowledgeFiles(bot._id, formData).then(() => {
            getNotification('success', 'Thêm file thành công')
            handleGetListKnowledgeFiles()
        }).catch(() => {
            getNotification('error', 'Thêm file không thành công')
        })
    }

    const handleViewDetailFile = (file) => {
        setFileSelect(file);
        setVisibleDetailFile(!visibleDetailFile);
    }

    const toggleVisibleModalDeleteFile = (file = null) => {
        setFileSelect(file);
        setVisibleModalDeleteFile(!visibleModalDeleteFile);
    }

    const handleConfirmDeleteFile = () => {
        setLoadingBtnDeleteFile(true)
        deleteKnowledgeFiles(bot._id, fileSelect._id).then(() => {
            handleGetListKnowledgeFiles()
            setVisibleModalDeleteFile(false)
            getNotification('success', 'Xóa file thành công.')
        }).catch(() => {
            getNotification('error', 'Xóa file thất bại')
        }).finally(() => {
            setLoadingBtnDeleteFile(false)
        });
    }

    return{
        columns, knowledgeFiles, loadingTableFile, dataFilter, pagination,
        propsCreateFile, fileSelect, visibleDetailFile, setVisibleDetailFile,
        loadingBtnDeleteFile, visibleModalDeleteFile,
        handlePageChange, handleSearch,
        handleConfirmDeleteFile, toggleVisibleModalDeleteFile
    }
}
