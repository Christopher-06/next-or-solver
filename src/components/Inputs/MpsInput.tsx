import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';

const MpsInput: React.FC = () => {
    return (
        <div>
            <ModelEditor format={FileFormat.MPS} />
            {/* <Textfield value={''} edit={() => {}} /> */}
        </div>
    );
};

export default MpsInput;
