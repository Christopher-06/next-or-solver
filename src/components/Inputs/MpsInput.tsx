import React from 'react';
import FileUploadButton from '../File/FileUploadButton';
import { FileFormat } from '../File/FileFormat';

const MpsInput: React.FC = () => {
    return (
        <div>
            <FileUploadButton targetFormat={FileFormat.MPS} />
        </div>
    );
};

export default MpsInput;
