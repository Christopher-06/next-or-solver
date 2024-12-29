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

import { Box, SxProps, Theme } from "@mui/material";
import Image from "next/image";

export default function NextORSolverIcon({ sx = {} }: { sx: SxProps<Theme> }) {
  return (
    <Box sx={{ ...sx, m: 0, p: 0 }}>
      <Image
        src="/next-or-solver-transparent.png"
        width={60}
        height={60}
        alt="Next OR Solver"
      />
    </Box>
  );
}
