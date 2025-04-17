import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLinks, createLink, deleteLink, viewLinkContent, rescanLink } from "../../../../api/bot"
import { useParams } from "react-router-dom"
import { getNotification } from "../../../../utils/helper"

export function useLinks() {
  const dispatch = useDispatch()
  const { botId } = useParams()
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

  // STATE
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

  // GET LINKS
  useEffect(() => {
    dispatch(getLinks(botId, pagination))
  }, [dispatch, botId, pagination])

  const totalLinks = paginationLinks?.total || links?.length || 0

  // HANDLE SEARCH
  const handleSearch = (value) => {
    setPagination({
      ...pagination,
      keySearch: value,
      page: 1,
    })
  }

  // HANDLE FILTER STATUS
  const handleStatusChange = (value) => {
    setPagination({
      ...pagination,
      status: value,
      page: 1, // Reset về trang đầu tiên khi lọc
    })
  }

  // HANDLE PAGE
  const handlePageChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      page: page,
      perPage: pageSize,
    })
  }

  // HANDLE ADD
  const handleAddLink = (url, scan_type = "ALL") => {
    dispatch(createLink(botId, { url, scan_type }))
      .then((response) => {
        if (response.success) {
          getNotification("success", "Tạo và quét link thành công.")
          setOpenModalAdd(false)
          dispatch(getLinks(botId, pagination))
        }
      })
      .catch((error) => {
        getNotification("error", error.message || "Có lỗi xảy ra khi tạo và quét link.")
      })
  }

  // HANDLE VIEW DETAIL
  const handleViewLink = (link) => {
    setSelectedLink(link)
    dispatch(viewLinkContent(link))
    setOpenModalDetail(true)
  }

  // HANDLE DELETE
  const handleDeleteLink = (link) => {
    dispatch(deleteLink(link))
      .then((response) => {
        if (response.success) {
          getNotification("success", "Xóa link thành công.")
          dispatch(getLinks(botId, pagination))
        }
      })
      .catch((error) => {
        getNotification("error", error.message || "Có lỗi xảy ra khi xóa link.")
      })
  }

  // HANDLE RE-SCAN
  const handleRescanLink = (link) => {
    dispatch(rescanLink(link))
      .then((response) => {
        if (response.success) {
          getNotification("success", "Quét link thành công.")
        }
      })
      .catch((error) => {
        getNotification("error", error.message || "Có lỗi xảy ra khi quét link.")
      })
  }

  // OPEN/CLOSE MODAL ADD
  const handleModalAdd = (value) => {
    setOpenModalAdd(value)
  }
  // OPEN/CLOSE MODAL DELETE
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
