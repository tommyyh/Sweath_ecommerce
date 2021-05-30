import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

// Components
import H3 from '../../../components/HtmlTags/H3';
import Img from '../../../components/HtmlTags/Img';
import P from '../../../components/HtmlTags/P';

const Whyus = ({
  whyusClass,
  whyusTitle,
  whyusText,
  whyusImg,
  whyusLink,
  whyusPath,
  scrollDown,
  scrollFunction,
  scrollId,
}) => {
  return (
    <div className={whyusClass}>
      <Img imageSrc={whyusImg} imageAlt={whyusTitle} />
      <H3 title={whyusTitle} />
      <P text={whyusText} />
      <div className={whyusClass + '_link'}>
        {!scrollDown ? (
          <Link to={whyusPath}>{whyusLink}</Link>
        ) : (
          <a href={scrollId} onClick={scrollFunction}>
            {whyusLink}
          </a>
        )}
        <FaChevronRight />
      </div>
    </div>
  );
};

export default Whyus;
