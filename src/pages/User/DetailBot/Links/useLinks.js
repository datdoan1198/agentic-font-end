import { useState, useEffect } from "react";
import { getListLinks } from "../../../../api/user/link";

export function useLinks() {
  const [links, setLinks] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);

  useEffect(() => {
    setLoadingTable(true);
    getListLinks()
      .then((res) => {
        setLinks(res.data);
      })
      .catch(() => {
        setLinks([]);
      })
      .finally(() => setLoadingTable(false));
  }, []);

  const handleSearch = (value) => {
    // Logic tìm kiếm
  };

  const handleStatusChange = (value) => {
    // Logic lọc
  };

  const handleAddNew = () => {
    setOpenModalAdd(true);
  };

  const handleRefresh = (record) => {
    // Logic làm mới
  };

  const handleView = (record) => {
    // Logic xem
  };

  const handleDelete = (record) => {
    // Logic xóa
  };

  const handleModalAdd = (value) => {
    setOpenModalAdd(value);
  };

  const handleModalDelete = (value) => {
    setOpenModalDelete(value);
  };

  const handleModalDetail = (value) => {
    setOpenModalDetail(value);
  };

  return {
    links,
    loadingTable,
    openModalAdd,
    openModalDelete,
    openModalDetail,
    handleModalAdd,
    handleModalDelete,
    handleModalDetail,
    handleSearch,
    handleStatusChange,
    handleAddNew,
    handleRefresh,
    handleView,
    handleDelete,
  };
}
