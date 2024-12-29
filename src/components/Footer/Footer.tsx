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

import {
  AppBar,
  Toolbar,
  Link,
  Container,
  Grid2,
  Tooltip,
  Box,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AbourUsDialog from "./AboutUsDialog";

export default function Footer() {
  return (
    <AppBar
      position="static"
      component="footer"
      color="primary"
      sx={{ top: "auto", bottom: 0, mt: 3 }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Grid2
            container
            spacing={20}
            justifyContent="center"
            alignItems="center"
          >
            <Grid2>
              <Tooltip
                title={
                  <Link
                    color="inherit"
                    href="https://github.com/Christopher-06/next-or-solver"
                    target="_blank"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      alignContent="center"
                      textAlign="center"
                      justifyContent="center"
                      justifyItems="center"
                    >
                      Source Code <OpenInNewIcon sx={{ ml: 1 }} />
                    </Box>
                  </Link>
                }
              >
                <GitHubIcon style={{ fontSize: 40, margin: "6px" }} />
              </Tooltip>
            </Grid2>
            <Grid2>
              <AbourUsDialog />
            </Grid2>
          </Grid2>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
