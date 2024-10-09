import React from 'react';
import ModelEditor from '../Editor/ModelEditor';
import { FileFormat } from '../Converter/FileFormat';
import { Button } from '@mui/material';
import test from '@/Test/Test';

const GmplInput: React.FC = () => {
    return (
        <div>
            <ModelEditor targetFormat={FileFormat.GMPL} />
            <Button 
                variant="contained"
                color="primary"
                onClick={test}
            >
                Test
            </Button>
        </div>
    );
};

export default GmplInput;
