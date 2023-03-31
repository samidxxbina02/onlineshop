import React, { useContext, useState } from "react";
import { StyledAdminForm } from "./styled";
import AppInput from "../UI/AppInput/AppInput";
import { StoreContext } from "../../context/store/StoreContext";
import { extraFields, initialFormState } from "./const";
import AppButton from "../UI/AppButton/AppButton";

const AdminForm = () => {
  const { createProduct, createPending } = useContext(StoreContext);
  const [form, setForm] = useState(initialFormState);

  const _createProduct = () => {
    const newProduct = {
      ...form,
      ...extraFields,
    };

    createProduct(newProduct);

    setForm(initialFormState);
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
      <StyledAdminForm.Title>Добавить новую позицию</StyledAdminForm.Title>
      <StyledAdminForm.Body>
        <AppInput
          placeholder="Title"
          variant="soft"
          name="title"
          onChange={handleChange}
          value={form.title}
        />
        <AppInput
          placeholder="Description"
          variant="soft"
          name="description"
          onChange={handleChange}
          value={form.description}
        />
        <AppInput
          placeholder="URL - Img"
          variant="soft"
          name="img"
          onChange={handleChange}
          value={form.img}
        />
        <AppInput
          placeholder="Price"
          variant="soft"
          type="number"
          name="price"
          onChange={handleChange}
          value={form.price}
        />
        <AppButton
          sx={{ display: "flex", justifyContent: "center" }}
          loading={createPending}
          size="lg"
          onClick={_createProduct}
          title="Add Product"
        />
      </StyledAdminForm.Body>
    </StyledAdminForm.Container>
  );
};

export default AdminForm;
