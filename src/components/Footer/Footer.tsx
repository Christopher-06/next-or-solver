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
  Typography,
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
      sx={{ top: "auto", bottom: 0 }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="body2" color="inherit">
            <Grid2
              container
              spacing={20}
              justifyContent="center"
              alignItems="center"
            >
              <Grid2>
                <Tooltip
                  title={
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
                  }
                >
                  <Link
                    color="inherit"
                    href="https://github.com/Christopher-06/next-or-solver"
                    target="_blank"
                  >
                    <GitHubIcon style={{ fontSize: 40, margin: "6px" }} />
                  </Link>
                </Tooltip>
              </Grid2>
              <Grid2>
                <AbourUsDialog />
              </Grid2>
              {/* 
                      TODO: Remove Impressum complete or create a real dialog
                    <Grid2>
                      <Link color="inherit" href="#" sx={{ fontSize: 15 }}>
                        {t("footer.footer.imprint")}
                      </Link>
                    </Grid2> */}
            </Grid2>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
