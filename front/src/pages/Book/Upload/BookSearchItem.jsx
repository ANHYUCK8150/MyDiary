import React from 'react';
import style from './BookUploadPage.style';
import { useNavigate } from 'react-router-dom';

const BookSearchItem = ({ item }) => {
  const { title, author, imageUrl } = item;
  const navigate = useNavigate();

  return (
    <li onClick={() => navigate('/book/upload', { state: { data: item } })}>
      <img src={imageUrl} alt="도서이미지" />
      <h2>{title}</h2>
      <p>{author}</p>
    </li>
  );
};

export default BookSearchItem;
