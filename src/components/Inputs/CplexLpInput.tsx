import React from 'react';
import FileUploadButton from '../File/FileUploadButton';
import { FileFormat } from '../File/FileFormat';
import { Button } from '@mui/material';

const CplexLpInput: React.FC = () => {

    return (
        <div>
            <FileUploadButton targetFormat={FileFormat.CPLEX_LP} />
        </div>
    );
};

export default CplexLpInput;
