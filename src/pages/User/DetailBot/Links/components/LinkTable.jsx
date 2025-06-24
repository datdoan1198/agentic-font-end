import {Table} from 'antd'
import React, {useEffect, useState} from 'react'
import styles from '../styles.module.scss'
import TagCustom from '@/components/Tag'
import moment from 'moment'
import LinkActions from './LinkActions'
import _ from 'lodash'
import {useDispatch, useSelector} from "react-redux";
import {setLoadingRowIds} from "@/states/modules/link/index.js";

const RenderStatusText = (link) => {
    const status = link.status
    if (status === 'TRAINED') {
        return {
            text: 'Đã huấn luyện',
            color: 'green',
        }
    } else {
        return {
            text: 'Đang huấn luyện',
            color: 'blue',
        }
    }
}

const LinkTable = ({
                       data,
                       isLoading,
                       isLoadingScan,
                       handleOpenModalDelete,
                       handleViewLink,
                       handleRescanLink,
                       pagination,
                       handlePageChange,
                       total,
                   }) => {
    const [loadingRowId, setLoadingRowId] = useState(null)
    const dispatch = useDispatch()
    const loadingRowIds = useSelector(state => state.link.loadingRowIds)

    useEffect(() => {
        if (!isLoadingScan) {
            setLoadingRowId(null)
        }
    }, [isLoadingScan])

    const handleRescan = async (record) => {
        const newData = _.cloneDeep(loadingRowIds)
        newData.push(record._id)
        dispatch(setLoadingRowIds(newData))

        await handleRescanLink(record)
    }

    const columns = [
        {
            title: 'Đường dẫn',
            dataIndex: 'url',
            key: 'url',
            width: 360,
            render: (url) => (
                <a href={url} target="_blank" rel="noreferrer">
                    {url}
                </a>
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 280,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 380,
            render: (description) => {
                return <span className={styles.descriptionTable}>{description}</span>
            },
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (status, record) => {
                const {text, color} = RenderStatusText(record)
                return (
                    <TagCustom bordered={false} color={color}>
                        {text}
                    </TagCustom>
                )
            },
        },
        {
            title: 'Ngày cập nhật',
            key: 'updated_at',
            dataIndex: 'updated_at',
            render: (updated_at) => {
                return moment(updated_at).format('DD/MM/YYYY HH:mm')
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <LinkActions
                    linkId={record._id}
                    loadingRowIds={loadingRowIds}
                    isLoading={loadingRowId === record._id}
                    onRefresh={() => handleRescan(record)}
                    onView={() => handleViewLink(record)}
                    onDelete={() => handleOpenModalDelete(record)}
                />
            ),
        },
    ]

    // HANDLE CHANGE PAGE SIZE
    const handleTableChange = (pagination) => {
        handlePageChange(pagination.current, pagination.pageSize)
    }

    // CONFIG PAGINATION
    const paginationConfig = {
        current: pagination.page,
        pageSize: pagination.perPage,
        total: total || data?.length || 0,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} links`,
        pageSizeOptions: ['10', '20', '50', '100'],
    }

    return (
        <Table
            loading={isLoading}
            className={styles.table}
            bordered
            columns={columns}
            dataSource={data}
            size="large"
            scroll={{x: 'max-content'}}
            pagination={paginationConfig}
            onChange={handleTableChange}
            rowKey="_id"
        />
    )
}

export default LinkTable
