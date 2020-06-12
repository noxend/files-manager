import React from 'react';
import { ReactComponent as Docx } from '../../../assets/docx.svg';
import { ReactComponent as Pptx } from '../../../assets/pptx.svg';
import { ReactComponent as Doc } from '../../../assets/doc.svg';
import { ReactComponent as Psd } from '../../../assets/psd.svg';
import { ReactComponent as Ppt } from '../../../assets/ppt.svg';
import { ReactComponent as Jpg } from '../../../assets/jpg.svg';
import { ReactComponent as Pdf } from '../../../assets/pdf.svg';
import { ReactComponent as Png } from '../../../assets/png.svg';
import { ReactComponent as Txt } from '../../../assets/txt.svg';

const CustomIcon = props => {
  switch (props.type) {
    case 'docx':
      return <Docx {...props} />;
    case 'doc':
      return <Doc {...props} />;
    case 'psd':
      return <Psd {...props} />;
    case 'pptx':
      return <Pptx {...props} />;
    case 'ppt':
      return <Ppt {...props} />;
    case 'pdf':
      return <Pdf {...props} />;
    case 'jpg':
      return <Jpg {...props} />;
    case 'png':
      return <Png {...props} />;
    case 'txt':
      return <Txt {...props} />;
    default:
      return <Png {...props} />;
  }
};

export default CustomIcon;
