import React from "react"
import BotLayout from "@/layouts/User/BotLayout"
import styles from "./styles.module.scss"

import TagCustom from "../../../../components/Tag"

import LinkTable from "./components/LinkTable"
import FilterGroup from "./components/FilterGroup"
import { useLinks } from "./useLinks"
import ModalAdd from "./components/modal/ModalAdd"
import ModalDelete from "./components/modal/ModalDelete"
import ModalDetail from "./components/modal/ModalDetail"
import { useSelector } from "react-redux"

export default function Links() {
  const {
    links,
    openModalAdd,
    openModalDetail,
    handleModalDelete,
    handleModalAdd,
    handleModalDetail,
    handleSearch,
    handleStatusChange,
  } = useLinks()

  const { openModalDelete, handleOpenModalDelete } = useSelector((state) => state.link)

  const dispatch = useDispatch()
  const params = useParams()
  const { botId } = params
  // ========== STATE FROM REDUX ========== //
  const { isLoadingGetLinks, links } = useSelector((state) => state.bot)

  // ========== STATE ========== //
  const [pagination, setPagination] = useState({
    keySearch: "",
    page: 1,
    perPage: 10,
  })

  // ========== USE EFFECT ========== //
  useEffect(() => {
    dispatch(getLinks(botId, pagination))
  }, [dispatch])

  // ========== FUNCTION ========== //
  const handleDeleteLink = (link) => {
    dispatch(deleteLink(link.bot_id, link._id))
  }
  return (
    <BotLayout>
      <div className={styles.headerWrap}>
        <span>Links</span>
        <TagCustom color="blue">Tổng số 9/1000 link</TagCustom>
      </div>
      <div className={styles.mainWrap}>
        <FilterGroup onSearch={handleSearch} onStatusChange={handleStatusChange} onAddNew={handleModalAdd} />
        <div className="groupTable">
          <LinkTable data={links} handleOpenModalDelete={handleOpenModalDelete} handleModalDetail={handleModalDetail} />
        </div>
      </div>
      <ModalAdd open={openModalAdd} onClose={handleModalAdd} />
      <ModalDelete open={openModalDelete} onClose={handleModalDelete} />
      <ModalDetail open={openModalDetail} onClose={() => handleModalDetail(false)} />
    </BotLayout>
  )
}
