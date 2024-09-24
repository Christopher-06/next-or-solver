import React from 'react';
import ModelEditor from '../File/ModelEditor';
import { FileFormat } from '../File/FileFormat';

const CplexLpInput: React.FC = () => {

    return (
        <div>
            <ModelEditor targetFormat={FileFormat.CPLEX_LP} />
        </div>
    );
};

export default CplexLpInput;
