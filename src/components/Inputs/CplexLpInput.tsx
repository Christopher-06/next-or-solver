/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 2 of the License.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*/

import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';

const CplexLpInput: React.FC = () => {

    return (
        <>
            <ModelEditor format={FileFormat.CPLEX_LP} />
        </>
    );
};

export default CplexLpInput;
