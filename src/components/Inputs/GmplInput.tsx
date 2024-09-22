import React from 'react';
import FileUploadButton from '../File/FileUploadButton';
import { FileFormat } from '../File/FileFormat';

const GmplInput: React.FC = () => {
    return (
        <div>
            <FileUploadButton targetFormat={FileFormat.GMPL} />
        </div>
    );
};

export default GmplInput;
