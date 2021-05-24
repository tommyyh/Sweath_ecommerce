import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// Styles
import './admin.scss';

// Components
import Loading from '../../components/Loading/Loading';
import H2 from '../../components/HtmlTags/H2';
import H3 from '../../components/HtmlTags/H3';
import FormLabel from '../../components/Forms/FormLabel';
import Form from '../../components/Forms/Form';
import Option from '../../components/HtmlTags/Option';
import Button from '../../components/Buttons/Button';
import SubmitButton from '../../components/Buttons/SubmitButton';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
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
    productCategory: 'Smartphones',
    productBrand: '',
  });
  const [coupon, setCoupon] = useState({
    couponTitle: '',
    couponDiscount: '',
  });

  // Loading
  useEffect(() => {
    setLoading(true);

    // Fetch all categories
    const fetchCategories = async () => {
      const fetchedCategories = await axios.get('/products/category');

      setCurrentCategories(fetchedCategories.data.categories);
    };

    fetchCategories();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  // Set input value
  const inputOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add product
  const addProduct = async () => {
    const data = new FormData();

    // Check if all values are defined
    if (
      newProduct.productTitle &&
      newProduct.productPrice &&
      newProduct.productDescription &&
      newProduct.ssdCapacity &&
      newProduct.displaySize &&
      newProduct.resolution &&
      newProduct.productWidth &&
      newProduct.productOs &&
      newProduct.aspectRatio &&
      newProduct.productHeight &&
      newProduct.productWeight &&
      newProduct.batteryCapacity &&
      newProduct.productDiscount &&
      newProduct.cableType &&
      newProduct.productCategory &&
      newProduct.productBrand &&
      newProduct.productImgs
    ) {
      // Append files
      for (let x = 0; x < newProduct.productImgs.length; x++) {
        data.append('productImgs', newProduct.productImgs[x]);
      }

      // Append proudct info
      data.append('productTitle', newProduct.productTitle);
      data.append('productPrice', newProduct.productPrice);
      data.append('productDescription', newProduct.productDescription);
      data.append('ssdCapacity', newProduct.ssdCapacity);
      data.append('displaySize', newProduct.displaySize);
      data.append('resolution', newProduct.resolution);
      data.append('productWidth', newProduct.productWidth);
      data.append('productOs', newProduct.productOs);
      data.append('aspectRatio', newProduct.aspectRatio);
      data.append('productHeight', newProduct.productHeight);
      data.append('productWeight', newProduct.productWeight);
      data.append('batteryCapacity', newProduct.batteryCapacity);
      data.append('productDiscount', newProduct.productDiscount);
      data.append('cableType', newProduct.cableType);
      data.append('productCategory', newProduct.productCategory);
      data.append('productBrand', newProduct.productBrand);

      const res = await axios.post('/products/new', data);

      if (res.data.status === 201) {
        setNewProduct({
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
          productCategory: 'Smartphones',
          productBrand: '',
        });
      }
    }
  };

  // Add product category
  const addNewCategory = async (e) => {
    e.preventDefault();

    if (newCategory !== '') {
      await axios.post('/products/category', {
        category: newCategory,
      });

      setCurrentCategories([...currentCategories, { title: newCategory }]);
      setNewCategory('');
    }
  };

  // Add coupon
  const addCoupon = async () => {
    const res = await axios.post('/products/add-coupon', {
      couponTitle: coupon.couponTitle,
      couponDiscount: coupon.couponDiscount,
    });

    if (res.data.status === 201) {
      setCoupon({ couponTitle: '', couponDiscount: '' });
    }
  };

  return (
    <>
      <HelmetProvider>
        {/* Head */}
        <Helmet>
          <title>Sweath: Admin</title>
        </Helmet>
      </HelmetProvider>
      {/* Body */}
      <main>
        <div className='newProduct'>
          <H2 title='ADMIN PANEL' />
          <h1>ADD A PRODUCT</h1>
          <div className='newProduct_main'>
            <div className='newProduct_overview'>
              <H3 title='Overview' />
              <Form
                formType='text'
                formName='productTitle'
                formPlaceholder='Product Title'
                onChange={inputOnChange}
                formValue={newProduct.productTitle}
              />
              <Form
                formType='number'
                formName='productPrice'
                formPlaceholder='Product Price'
                onChange={inputOnChange}
                formValue={newProduct.productPrice}
              />
              <textarea
                name='productDescription'
                cols='30'
                rows='10'
                placeholder='Product Description'
                onChange={inputOnChange}
                value={newProduct.productDescription}
              ></textarea>
            </div>
            <div className='newProduct_specs'>
              <H3 title='Specification' />
              <div className='newProduct_specs_forms'>
                <Form
                  formType='text'
                  formName='ssdCapacity'
                  formPlaceholder='SSD Capacity'
                  onChange={inputOnChange}
                  formValue={newProduct.ssdCapacity}
                />
                <Form
                  formType='text'
                  formName='productOs'
                  formPlaceholder='OS'
                  onChange={inputOnChange}
                  formValue={newProduct.productOs}
                />
                <Form
                  formType='text'
                  formName='displaySize'
                  formPlaceholder='Display size'
                  onChange={inputOnChange}
                  formValue={newProduct.displaySize}
                />
                <Form
                  formType='text'
                  formName='aspectRatio'
                  formPlaceholder='Aspect Ratio'
                  onChange={inputOnChange}
                  formValue={newProduct.aspectRatio}
                />
                <Form
                  formType='text'
                  formName='resolution'
                  formPlaceholder='Resolution'
                  onChange={inputOnChange}
                  formValue={newProduct.resolution}
                />
                <Form
                  formType='text'
                  formName='productWidth'
                  formPlaceholder='Width'
                  onChange={inputOnChange}
                  formValue={newProduct.productWidth}
                />
                <Form
                  formType='text'
                  formName='productHeight'
                  formPlaceholder='Height'
                  onChange={inputOnChange}
                  formValue={newProduct.productHeight}
                />
                <Form
                  formType='text'
                  formName='productWeight'
                  formPlaceholder='Weight'
                  onChange={inputOnChange}
                  formValue={newProduct.productWeight}
                />
              </div>
            </div>
            <div className='newProduct_battery'>
              <H3 title='Additional' />
              <Form
                formType='text'
                formName='batteryCapacity'
                formPlaceholder='Max Battery Capacity'
                onChange={inputOnChange}
                formValue={newProduct.batteryCapacity}
              />
              <Form
                formType='text'
                formName='cableType'
                formPlaceholder='Charging Cable Type'
                onChange={inputOnChange}
                formValue={newProduct.cableType}
              />
              <Form
                formType='number'
                formName='productDiscount'
                formPlaceholder='Discount'
                onChange={inputOnChange}
                formValue={newProduct.productDiscount}
              />
              <Form
                formType='text'
                formName='productBrand'
                formPlaceholder='Brand'
                onChange={inputOnChange}
                formValue={newProduct.productBrand}
              />
            </div>
          </div>
          <div className='newProduct_secondary'>
            <div className='newProduct_images'>
              <H3 title='Product Images (4)' />
              <div className='newProduct_imgs_forms'>
                <FormLabel
                  formType='file'
                  formName='productImgs'
                  formPlaceholder='Upload Images'
                  formId='newProduct_img1'
                  formLabel='Upload Images'
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productImgs: e.target.files,
                    })
                  }
                  multiple={true}
                />
              </div>
            </div>
            <div className='newProduct_category'>
              <H3 title='Product Category' />
              <select
                value={newProduct.productCategory}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
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
          <Button buttonTitle='ADD PRODUCT' onClick={addProduct} />
        </div>
      </main>
      <div className='newCategory'>
        <section>
          <div className='addCoupon'>
            <H2 title='ADD A COUPON' />
            <div className='addCoupon_forms'>
              <Form
                formType='text'
                formName='couponName'
                formPlaceholder='Coupon Name'
                formValue={coupon.couponTitle}
                onChange={(e) =>
                  setCoupon({ ...coupon, couponTitle: e.target.value })
                }
              />
              <Form
                formType='number'
                formName='couponDiscount'
                formPlaceholder='Discount'
                formValue={coupon.couponDiscount}
                onChange={(e) =>
                  setCoupon({ ...coupon, couponDiscount: e.target.value })
                }
              />
              <Button buttonTitle='ADD COUPON' onClick={addCoupon} />
            </div>
          </div>
        </section>
        <section>
          <div className='addCategory'>
            <H2 title='ADD A CATEGORY' />
            <div className='addCategory_form'>
              <form onSubmit={addNewCategory}>
                <Form
                  formType='text'
                  formName='categoryTitle'
                  formPlaceholder='Category Title'
                  formValue={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <SubmitButton buttonTitle='ADD CATEGORY' />
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admin;
