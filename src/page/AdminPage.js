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
  const { productList } = useSelector(state => state.product)
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });

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

  const deleteItem = (id) => {
  };

  const openEditForm = (product) => {
<<<<<<< HEAD
    setMode("edit")
    dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product })
    setShowDialog(true)
=======
>>>>>>> bb20e1efd59628653ca77e05471b601abfdf39d2
  };

  const handleClickNewItem = () => {
    setMode("new")
    setShowDialog(true)
  };

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