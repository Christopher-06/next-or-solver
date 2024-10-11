import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';

const CplexLpInput: React.FC = () => {

    return (
        <div>
            <ModelEditor format={FileFormat.CPLEX_LP} />
        </div>
    );
};

export default CplexLpInput;
