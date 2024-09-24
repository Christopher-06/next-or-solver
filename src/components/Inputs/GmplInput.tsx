import React from 'react';
import FileUploadButton from '../File/FileUploadButton';
import { FileFormat } from '../File/FileFormat';
// import SolverPage from '../File/TestHighs'

const GmplInput: React.FC = () => {
    return (
        <div>
            <FileUploadButton targetFormat={FileFormat.GMPL} />
            {/* <SolverPage /> */}
        </div>
    );
};

export default GmplInput;
