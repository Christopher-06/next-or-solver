import React from 'react';
import FileUploadButton from '../File/FileUploadButton';
import { FileFormat } from '../File/FileFormat';

const CplexLpInput: React.FC = () => {

    return (
        <div>
            <FileUploadButton targetFormat={FileFormat.CPLEX_LP} />
        </div>
    );
};

export default CplexLpInput;
