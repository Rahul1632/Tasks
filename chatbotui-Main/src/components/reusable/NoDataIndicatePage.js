import React from 'react';

const NoDataIndicatePage = (props) => {
  const { icon, content } = props || {};
  const IconElement = React.createElement(icon, {
    className: 'no-data-indicate-icon',
  });
  return (
    <div className='no-data-indicate-content' style={{ '--height': props?.height }}>
      {IconElement}
      <h5>{content}</h5>
    </div>
  );
};

export default NoDataIndicatePage;
