import React from 'react';

function ImageNode(props) {
  const { attributes, node, isFocused } = props;
  const src = node.data.get('src');
  return (
    <img src={src} selected={isFocused}  {...attributes} />
  )
}

export default ImageNode;