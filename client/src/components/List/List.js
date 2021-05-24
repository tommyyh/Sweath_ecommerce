import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ listTitle, listLink }) => {
  return (
    <li>{listLink ? <Link to={listLink}>{listTitle}</Link> : listTitle}</li>
  );
};

export default List;
