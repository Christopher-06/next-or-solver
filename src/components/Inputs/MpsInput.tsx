import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';
import Textfield from '../Editor/Editor';

const MpsInput: React.FC = () => {
    return (
        <div>
            <ModelEditor format={FileFormat.MPS} />
            {/* <Textfield value={''} edit={() => {}} /> */}
        </div>
    );
};

export default MpsInput;
