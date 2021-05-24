import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

// Components
import Form from '../../Forms/Form';
import List from '../../List/List';
import SearchResult from './SearchResult';
import Ul from '../../HtmlTags/Ul';

const SearchMenu = ({ searchMenuClass, setSearchOpen, searchOpen }) => {
  const [searchedProducts, setSearchedProducts] = useState([]);

  // Search products
  const searchProducts = async (searchField) => {
    const res = await axios.post('/products/search', { searchField });

    setSearchedProducts(res.data.searchedProductsArray);
  };

  return (
    <div className={searchMenuClass}>
      <div className='search_form'>
        <div
          className='search_arrow_back'
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <FaChevronLeft />
        </div>
        <Form
          formType='text'
          formId='search_input'
          formName='searchInput'
          formPlaceholder='Search...'
          onChange={(e) => searchProducts(e.target.value)}
          autocompleteOff={true}
        />
      </div>
      <div className='search_suggested'>
        <Ul
          listChildren={
            <>
              <List
                listTitle='School laptops'
                listLink='/products/category/school-laptops'
              />
              <List
                listTitle='Smartphones'
                listLink='/products/category/smartphones'
              />
              <List listTitle='Macbook 13 Pro' listLink='/' />
              <List listTitle='iPad Pro' listLink='/' />
              <List listTitle='iPhone 7 Max' listLink='/' />
            </>
          }
        />
      </div>
      <div className='search_results'>
        {searchedProducts.map((searchedProduct) => (
          <SearchResult
            productImg={searchedProduct.image1}
            productTitle={searchedProduct.title}
            productPrice={searchedProduct.totalPrice}
            productLink={searchedProduct.slug}
            key={searchedProduct.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
