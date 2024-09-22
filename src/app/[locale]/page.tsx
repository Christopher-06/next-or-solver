"use client";

import React, { useState } from "react";
import CustomInput from "@/components/Inputs/CustomInput";
import { Container, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import GmplInput from "@/components/Inputs/GmplInput";
import CplexLpInput from "@/components/Inputs/CplexLpInput";
import MpsInput from "@/components/Inputs/MpsInput";
// import { useTranslations } from "next-intl";

export default function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={false}>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="UI" value="1" />
          <Tab label="GMPL" value="2" />
          <Tab label="CPLEX LP" value="3" />
          <Tab label="MPS" value="4" />
        </Tabs>
        <TabPanel value="1">
          <CustomInput />
        </TabPanel>
        <TabPanel value="2">
          <GmplInput />
        </TabPanel>
        <TabPanel value="3">
          <CplexLpInput />
        </TabPanel>
        <TabPanel value="4">
          <MpsInput />
        </TabPanel>
      </TabContext>
    </Container>
  );
}
