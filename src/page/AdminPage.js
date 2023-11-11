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

const AdminPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  
  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];

  useEffect(() => {
   
  }, []);

  const deleteItem = (id) => {
    //나중에 상품 삭제할키
  };

  const openEditForm = (product) => {
    //나중에 상품 수정할키
  };

  const handleClickNewItem = () => {
    setMode("new")
    setShowDialog(true)
  };
  
  return (
    <div className="setting-area">
      <Container>
        <Button className="add-btn" onClick={handleClickNewItem}>
          상품 추가하기
        </Button>

        <ProductTable
          header={tableHeader}
          data=""
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