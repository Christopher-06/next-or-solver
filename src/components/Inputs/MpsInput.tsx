import React from 'react';
import ModelEditor from '../File/ModelEditor';
import { FileFormat } from '../File/FileFormat';

const MpsInput: React.FC = () => {
    return (
        <div>
            <ModelEditor targetFormat={FileFormat.MPS} />
        </div>
    );
};

export default MpsInput;
