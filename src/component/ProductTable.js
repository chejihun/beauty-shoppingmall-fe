import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                    className="mr-btn"
                  >
                    <RiDeleteBin6Line className="delete-btn-icon" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openEditForm(item)}
                    className="edit-btn"
                  >
                    <FiEdit className="edit-btn-icon"/>
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>등록된 제품이 없습니다</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;