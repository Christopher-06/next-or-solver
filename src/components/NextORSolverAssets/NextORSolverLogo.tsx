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

export default function NextORSolverLogo({ sx }: { sx: SxProps<Theme> }) {
  return (
    <Box sx={{ m: 0, p: 0, ...sx }}>
      <Image
        src="/next-or-solver.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt="Next OR Solver"
      />
    </Box>
  );
}
