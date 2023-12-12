import React, { useEffect, useState } from "react";
import "../style/admin.css"
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiAction } from "../action/commonUiAction";
import { productAction } from "../action/productAction";
import ProductTable from "../component/ProductTable";
import NewItemDialog from "../component/NewItemDialog";
import SearchBox from "../component/SearchBox";

const AdminPage = () => {

  const navigate = useNavigate();
  const { productList, totalPageNum } = useSelector(state => state.product)
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const user = useSelector((state) => (state.user.user));
  console.log("user", user)

  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "Delete / Edit",
  ];

  const deleteItem = (id) => {
    dispatch(productAction.deleteProduct(id))
  };

  const openEditForm = (product) => {
    setMode("edit")
    dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product })
    setShowDialog(true)
  };

  const handleClickNewItem = () => {
    setMode("new")
    setShowDialog(true)
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 })
  };
  
  useEffect(() => {
    dispatch(productAction.getProductList({ ...searchQuery }))
  }, [query]);

  useEffect(() => {
    if (searchQuery.name === "") {
      delete searchQuery.name
    }
    const params = new URLSearchParams(searchQuery)
    const query = params.toString();
    navigate("?" + query)
  }, [searchQuery]);

  return (
    <div className="setting-area">
      <Container>
        <div className="admin-search-area">
          <Button onClick={handleClickNewItem}>
            상품 추가하기
          </Button>

          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </div>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="paginate"
        />
    
      
      </Container>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />

    </div>
  )
}

export default AdminPage