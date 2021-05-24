import React from 'react';

// Components
import H3 from '../../../components/HtmlTags/H3';
import H4 from '../../../components/HtmlTags/H4';

const ShowSpecs = ({ specsTitle, specsLine1, specsLine2, specsLine3 }) => {
  return (
    <div className='show_specs_details'>
      <H3 title={specsTitle} />
      <H4 title={specsLine1} />
      <H4 title={specsLine2} />
      <H4 title={specsLine3} />
    </div>
  );
};

export default ShowSpecs;
