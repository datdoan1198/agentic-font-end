import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getLinks, createLink, deleteLink, viewLinkContent, rescanLink} from "@/api/bot/index.js"
import {useParams} from "react-router-dom"
import _ from "lodash";
import {handleSetTimeOut} from "@/utils/helper.js";

export function useLinks() {
    const [timeoutId, setTimeoutId] = useState(null)
    const dispatch = useDispatch()
    const {botId} = useParams()
    const {
        links,
        isLoadingGetLinks,
        isLoadingCreateLink,
        isLoadingDeleteLink,
        isLoadingViewLinkContent,
        isLoadingRescanLink,
        linkContent,
        paginationLinks,
    } = useSelector((state) => state.bot)

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [selectedLink, setSelectedLink] = useState(null)
    const [pagination, setPagination] = useState({
        keySearch: "",
        page: 1,
        perPage: 10,
        status: "",
    })

    useEffect(() => {
        dispatch(getLinks(botId, pagination))
    }, [])

    useEffect(() => {
        setOpenModalAdd(false)
    }, [links])

    const totalLinks = paginationLinks?.total || links?.length || 0

    const handleSearch = (e) => {
        let newDataFilter = _.cloneDeep(pagination);
        newDataFilter.keySearch = e.target.value;
        newDataFilter.page = 1;
        setPagination(newDataFilter);
        let newTimeoutId = handleSetTimeOut(() => {
            dispatch(getLinks(botId, newDataFilter))
        }, 500, timeoutId)
        setTimeoutId(newTimeoutId);
    }

    const handleStatusChange = (value) => {
        let newDataFilter = _.cloneDeep(pagination);
        newDataFilter.status = value;
        newDataFilter.page = 1;
        setPagination(newDataFilter);
        dispatch(getLinks(botId, newDataFilter))
    }

    const handlePageChange = (page, pageSize) => {
        let newDataFilter = _.cloneDeep(pagination);
        newDataFilter.page = page;
        newDataFilter.perPage = pageSize;
        setPagination(newDataFilter);
        dispatch(getLinks(botId, newDataFilter))
    }

    const handleAddLink = (url, scan_type = "ALL") => {
        dispatch(createLink(botId, {url, scan_type}))
    }

    const handleViewLink = (link) => {
        setSelectedLink(link)
        dispatch(viewLinkContent(link))
        setOpenModalDetail(true)
    }

    const handleDeleteLink = (link) => {
        dispatch(deleteLink(link))
    }

    const handleRescanLink = (link) => {
        dispatch(rescanLink(link))
    }

    const handleModalAdd = () => {
        setOpenModalAdd(!openModalAdd)
    }

    const handleModalDelete = (value, link = null) => {
        setOpenModalDelete(value)
        if (link && value) {
            selectedLink(link)
            dispatch(deleteLink(link))
        }
    }

    const handleModalDetail = (value, link = null) => {
        setOpenModalDetail(value)
        if (link && value) {
            setSelectedLink(link)
            dispatch(viewLinkContent(link))
        }
    }

    return {
        links,
        isLoading: isLoadingGetLinks,
        isLoadingCreate: isLoadingCreateLink,
        isLoadingDelete: isLoadingDeleteLink,
        isLoadingView: isLoadingViewLinkContent,
        isLoadingScan: isLoadingRescanLink,
        linkContent,
        pagination,
        totalLinks,
        openModalAdd,
        openModalDetail,
        openModalDelete,
        selectedLink,
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
    }
}
