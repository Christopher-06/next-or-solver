import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';

const MpsInput: React.FC = () => {
    return (
        <div>
            <ModelEditor targetFormat={FileFormat.MPS} />
        </div>
    );
};

export default MpsInput;
