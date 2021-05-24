import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// Styles
import './adminEdit.scss';

// Components
import Loading from '../../components/Loading/Loading';
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import FormLabel from '../../components/Forms/FormLabel';
import Form from '../../components/Forms/Form';
import Option from '../../components/HtmlTags/Option';
import Button from '../../components/Buttons/Button';
import NotFound from '../../containers/NotFound/NotFound';

const AdminEdit = () => {
  const [loading, setLoading] = useState(true);
  const [currentCategories, setCurrentCategories] = useState([]);
  const { push } = useHistory();
  const [fetchedProduct, setFetchedProduct] = useState({
    productTitle: '',
    productPrice: '',
    productDescription: '',
    ssdCapacity: '',
    displaySize: '',
    resolution: '',
    productWidth: '',
    productOs: '',
    aspectRatio: '',
    productHeight: '',
    productWeight: '',
    batteryCapacity: '',
    productDiscount: '',
    cableType: '',
    productImgs: null,
    productCategory: '',
    productBrand: '',
  });
  const { product } = useParams();

  // Loading
  useEffect(() => {
    setLoading(true);

    const fetchProduct = async () => {
      const res = await axios.get(`/products/product/edit/${product}`);
      const {
        title,
        price,
        description,
        ssdCapacity,
        displaySize,
        resolution,
        width,
        os,
        aspectRatio,
        height,
        weight,
        batteryCapacity,
        discount,
        cableType,
        CategoryTitle,
        brand,
      } = res.data.product;

      if (res.data.status === 404) {
        <NotFound />;
        return;
      }

      setFetchedProduct({
        productTitle: title,
        productPrice: price,
        productDescription: description,
        ssdCapacity: ssdCapacity,
        displaySize: displaySize,
        resolution: resolution,
        productWidth: width,
        productOs: os,
        aspectRatio: aspectRatio,
        productHeight: height,
        productWeight: weight,
        batteryCapacity: batteryCapacity,
        productDiscount: discount,
        cableType: cableType,
        productImgs: null,
        productCategory: CategoryTitle,
        productBrand: brand,
      });
    };

    // Fetch all categories
    const fetchCategories = async () => {
      const fetchedCategories = await axios.get('/products/category');

      setCurrentCategories(fetchedCategories.data.categories);
    };

    fetchCategories();
    fetchProduct();
    setLoading(false);
  }, [product]);

  // Set input value
  const inputOnChange = (e) => {
    setFetchedProduct({ ...fetchedProduct, [e.target.name]: e.target.value });
  };

  // Edit product
  const submitChanges = async () => {
    const data = new FormData();

    // Check if all values are defined
    if (data) {
      // Append files
      if (!fetchedProduct.productImgs) {
        data.append('productImgs', null);
      }

      if (fetchedProduct.productImgs) {
        if (fetchedProduct.productImgs.length === 4) {
          for (let x = 0; x < fetchedProduct.productImgs.length; x++) {
            data.append('productImgs', fetchedProduct.productImgs[x]);
          }
        }
      }

      // Append proudct info
      data.append('productTitle', fetchedProduct.productTitle);
      data.append('productPrice', fetchedProduct.productPrice);
      data.append('productDescription', fetchedProduct.productDescription);
      data.append('ssdCapacity', fetchedProduct.ssdCapacity);
      data.append('displaySize', fetchedProduct.displaySize);
      data.append('resolution', fetchedProduct.resolution);
      data.append('productWidth', fetchedProduct.productWidth);
      data.append('productOs', fetchedProduct.productOs);
      data.append('aspectRatio', fetchedProduct.aspectRatio);
      data.append('productHeight', fetchedProduct.productHeight);
      data.append('productWeight', fetchedProduct.productWeight);
      data.append('batteryCapacity', fetchedProduct.batteryCapacity);
      data.append('productDiscount', fetchedProduct.productDiscount);
      data.append('cableType', fetchedProduct.cableType);
      data.append('productCategory', fetchedProduct.productCategory);
      data.append('productBrand', fetchedProduct.productBrand);

      const res = await axios.put(`/products/edit/product/${product}`, data);

      if (res.data.status === 201) {
        push(`/products/category/${fetchedProduct.productCategory}`);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Edit {fetchedProduct.productTitle}</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <main>
        <div className='editProduct'>
          <H2 title='ADMIN PANEL' />
          <h1>EDIT {fetchedProduct.productTitle.toUpperCase()}</h1>
          <div className='editProduct_main'>
            <div className='editProduct_overview'>
              <H3 title='Overview' />
              <Form
                formType='text'
                formName='productTitle'
                formPlaceholder='Product Title'
                formValue={fetchedProduct.productTitle}
                onChange={inputOnChange}
              />
              <Form
                formType='number'
                formName='productPrice'
                formPlaceholder='Product Price'
                formValue={fetchedProduct.productPrice}
                onChange={inputOnChange}
              />
              <textarea
                name='productDescription'
                cols='30'
                rows='10'
                placeholder='Product Description'
                value={fetchedProduct.productDescription}
                onChange={inputOnChange}
              ></textarea>
            </div>
            <div className='editProduct_specs'>
              <H3 title='Specification' />
              <div className='editProduct_specs_forms'>
                <Form
                  formType='text'
                  formName='ssdCapacity'
                  formPlaceholder='SSD Capacity'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.ssdCapacity}
                />
                <Form
                  formType='text'
                  formName='productOs'
                  formPlaceholder='OS'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.productOs}
                />
                <Form
                  formType='text'
                  formName='displaySize'
                  formPlaceholder='Display size'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.displaySize}
                />
                <Form
                  formType='text'
                  formName='aspectRatio'
                  formPlaceholder='Aspect Ratio'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.aspectRatio}
                />
                <Form
                  formType='text'
                  formName='resolution'
                  formPlaceholder='Resolution'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.resolution}
                />
                <Form
                  formType='text'
                  formName='productWidth'
                  formPlaceholder='Width'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.productWidth}
                />
                <Form
                  formType='text'
                  formName='productHeight'
                  formPlaceholder='Height'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.productHeight}
                />
                <Form
                  formType='text'
                  formName='productWeight'
                  formPlaceholder='Weight'
                  onChange={inputOnChange}
                  formValue={fetchedProduct.productWeight}
                />
              </div>
            </div>
            <div className='editProduct_battery'>
              <H3 title='Battery' />
              <Form
                formType='text'
                formName='batteryCapacity'
                formPlaceholder='Max Battery Capacity'
                onChange={inputOnChange}
                formValue={fetchedProduct.batteryCapacity}
              />
              <Form
                formValue={fetchedProduct.cableType}
                formType='text'
                formName='cableType'
                onChange={inputOnChange}
                formPlaceholder={fetchedProduct.cableType}
              />
              <Form
                formType='number'
                formName='productDiscount'
                formPlaceholder='Discount'
                onChange={inputOnChange}
                formValue={fetchedProduct.productDiscount}
              />
              <Form
                formType='text'
                formName='productBrand'
                formPlaceholder='Brand'
                onChange={inputOnChange}
                formValue={fetchedProduct.productBrand}
              />
            </div>
          </div>
          <div className='editProduct_secondary'>
            <div className='editProduct_images'>
              <H3 title='Product Images (4)' />
              <div className='editProduct_imgs_forms'>
                <FormLabel
                  formType='file'
                  formName='productImgs'
                  formPlaceholder='Upload Images'
                  formId='editProduct_img1'
                  formLabel='Upload Images'
                  onChange={(e) =>
                    setFetchedProduct({
                      ...fetchedProduct,
                      productImgs: e.target.files,
                    })
                  }
                  multiple={true}
                />
              </div>
            </div>
            <div className='editProduct_category'>
              <H3 title='Product Category' />
              <select
                value={fetchedProduct.productCategory}
                onChange={(e) =>
                  setFetchedProduct({
                    ...fetchedProduct,
                    productCategory: e.target.value,
                  })
                }
              >
                {currentCategories.map((category) => (
                  <Option
                    optionValue={category.title}
                    optionName={category.title}
                    key={uuid()}
                  />
                ))}
              </select>
            </div>
          </div>
          <Button buttonTitle='EDIT PRODUCT' onClick={submitChanges} />
        </div>
      </main>
    </>
  );
};

export default AdminEdit;
