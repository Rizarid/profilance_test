import React from 'react';

import './Button.sass';

export const Button = (props) => {
  const {
    contentType = 'text',
    type = 'button',
    text,
    image,
    alt,
    onClick,
  } = props;

  return (
    <button className={`button button_${contentType}`} type={type} onClick={onClick}>
      {image && <img src={image} alt={alt} className="button__image" />}
      {text && text}
    </button>
  );
};
