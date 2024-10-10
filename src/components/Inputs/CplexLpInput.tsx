import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';

const CplexLpInput: React.FC = () => {

    return (
        <div>
            <ModelEditor targetFormat={FileFormat.CPLEX_LP} />
        </div>
    );
};

export default CplexLpInput;
