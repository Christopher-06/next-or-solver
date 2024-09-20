"use client"
import Variable from '@/components/Variable/Variable';
import { Stack } from '@mui/material';
import { useState } from 'react';

export default function VariableContainer() {

    const [varCount, setVarCount] = useState(1);

  return <Stack spacing={2} direction="column">
    {
        Array.from({ length: varCount }).map((_, index) => (
            <Variable key={index} />
        ))
    }

    <button onClick={() => setVarCount(varCount + 1)}>Add Variable</button>
  </Stack>
}