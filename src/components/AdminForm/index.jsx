import React, { useContext, useEffect, useState } from "react";
import { StyledAdminForm } from "./styled";
import AppInput from "../UI/AppInput/AppInput";
import { StoreContext } from "../../context/store/StoreContext";
import { extraFields, initialFormState } from "./const";
import AppButton from "../UI/AppButton/AppButton";
import { useNavigate } from "react-router-dom";

const AdminForm = ({ isEdit, editedProduct }) => {
  const navigate = useNavigate()
  const { createProduct, createPending, editProduct } = useContext(StoreContext);

  const [form, setForm] = useState(initialFormState);

 
  useEffect(() => {
    if(isEdit) {
      setForm(editedProduct)
    }
  }, [editedProduct])

  const _createProduct = () => {
    const newProduct = {
      ...form,
      ...extraFields,
    };

    if(isEdit) {
      editProduct(newProduct, newProduct.id, () => {
        setForm(initialFormState);
        navigate('/')
      })
    } else {
      createProduct(newProduct, () => {
        setForm(initialFormState);
        navigate('/')
      });
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  return (
    <StyledAdminForm.Container>
      <StyledAdminForm.Title>{isEdit ? 'Изменить позицию' : 'Добавить новую позицию'}</StyledAdminForm.Title>
      <StyledAdminForm.Body>
        <select value={form?.type} name='type' onChange={handleChange}>
          <option>shoes</option>
          <option>bag</option>
          <option>dress</option>
          <option>blazer</option>
        </select>
        <AppInput
          placeholder="Title"
          variant="soft"
          name="title"
          onChange={handleChange}
          value={form?.title}
        />
        <AppInput
          placeholder="Description"
          variant="soft"
          name="description"
          onChange={handleChange}
          value={form?.description}
        />
        <AppInput
          placeholder="URL - Img"
          variant="soft"
          name="img"
          onChange={handleChange}
          value={form?.img}
        />
        <AppInput
          placeholder="Price"
          variant="soft"
          type="number"
          name="price"
          onChange={handleChange}
          value={form?.price}
        />
        <AppButton
          sx={{ display: "flex", justifyContent: "center" }}
          loading={createPending}
          size="lg"
          onClick={_createProduct}
          title={isEdit ? "Edit Product" : "Add Product"}
        />
      </StyledAdminForm.Body>
    </StyledAdminForm.Container>
  );
};

export default AdminForm;
