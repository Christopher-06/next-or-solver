import React from 'react';
import ModelEditor from '../File/ModelEditor';
import { FileFormat } from '../File/FileFormat';

const GmplInput: React.FC = () => {
    return (
        <div>
            <ModelEditor targetFormat={FileFormat.GMPL} />
        </div>
    );
};

export default GmplInput;
