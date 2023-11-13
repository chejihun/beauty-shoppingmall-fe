import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidge";
import { productAction } from "../action/productAction";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import * as types from "../constants/product.constants";
import { commonUiAction } from "../action/commonUiAction";
import { RiDeleteBin6Line } from "react-icons/ri";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { edit } from "@cloudinary/url-gen/actions/animated";

const InitialFormData = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {

  const { selectedProduct } = useSelector((state) => state.product);

  const { error } = useSelector((state) => state.product);
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedProduct
  );
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const [stockError, setStockError] = useState(false);

  const handleClose = () => {
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (stock.length === 0) return setStockError(true)
    const totalStock = stock.reduce((total, item) => {
      return { ...total, [item[0]]: parseInt([item[1]]) }
    }, {})
    if (mode === "new") {
      dispatch(productAction.createProduct({ ...formData, stock: totalStock }));
      setShowDialog(false)
    } else {
      dispatch(productAction.editProduct(
        { ...formData, stock: totalStock },
        selectedProduct._id
      ));
      setShowDialog(false)
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
  };

  const addStock = () => {
    setStock([...stock, []])
  };

  const deleteStock = (idx) => {
    const newStock = stock.filter((item, index) => index !== idx)
    setStock(newStock)
  };

  const handleSizeChange = (value, index) => {
    const newStock = [...stock]
    newStock[index][0] = value
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    const newStock = [...stock]
    newStock[index][1] = value
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    } else {
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    setFormData({ ...formData, image: url });
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        setFormData(selectedProduct)
        //객체에서 어레이로 변경해야함(키값을 어레이로 수정)
        const stockArray = Object.keys(selectedProduct.stock)
          .map((size) => [size, selectedProduct.stock[size]])
          setStock(stockArray)
      } else {
        setFormData({...InitialFormData})
        setStock([]);
      }
    }
  }, [showDialog]);

  return (
    <Modal
      show={showDialog}
      onHide={handleClose}
      size='lg'
      dialogClassName="modal-area"
    >
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>신규 상품 등록</Modal.Title>
        ) : (
          <Modal.Title>상품 수정 정보</Modal.Title>
        )}
      </Modal.Header>

      <Form className="dialog-form-area" onSubmit={handleSubmit} >
        <Row>
          <Form.Group as={Col} controlId="sku">
            <Form.Label>Sku</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Sku"
              required
              value={formData.sku}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Name"
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className="description" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group className="stock" controlId="stock">
          <Form.Label className="mr-1">Stock</Form.Label>
          {stockError && (
            <span className="error-message">재고를 추가해주세요</span>
          )}
          <Button size="sm" onClick={addStock} className="stock-add-btn">
            추가하기
          </Button>

          <div className="stock-mt">
            {stock.map((item, index) => (
              <Row key={index} className="stock-mb">
                <Col sm={4}>
                  <Form.Select
                    onChange={(event) =>
                      handleSizeChange(event.target.value, index)
                    }
                    required
                    defaultValue={item[0] ? item[0].toLowerCase() : ""}
                  >
                    <option value="" disabled selected hidden>
                      Please Choose...
                    </option>
                    {SIZE.map((item, index) => (
                      <option
                        inValid={true}
                        value={item.toLowerCase()}
                        disabled={stock.some(
                          (size) => size[0] === item.toLowerCase()
                        )}
                        key={index}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control
                    onChange={(event) =>
                      handleStockChange(event.target.value, index)
                    }
                    type="number"
                    placeholder="number of stock"
                    value={item[1]}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="danger"
                    className="delete-btn"
                    onClick={() => deleteStock(index)}
                  >
                    <RiDeleteBin6Line className="delete-btn-icon" />
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} className="Cloudinary" />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="uploadedimage"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            상품등록
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            상품수정
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default NewItemDialog;
