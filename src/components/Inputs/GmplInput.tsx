import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';

const GmplInput: React.FC = () => {
    return (
        <div>
            <ModelEditor targetFormat={FileFormat.GMPL} />
        </div>
    );
};

export default GmplInput;
