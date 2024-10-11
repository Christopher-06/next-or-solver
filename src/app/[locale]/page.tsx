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

"use client";

import React from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import GmplInput from "@/components/Inputs/GmplInput";
import CplexLpInput from "@/components/Inputs/CplexLpInput";
import MpsInput from "@/components/Inputs/MpsInput";
import SolutionContainer from "@/components/SolutionPaper/SolutionPaper";
import EasyInput from "@/components/EasyInput/EasyInput";
import ActionsBar from "@/components/ActionsBar/ActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { changeInputType, InputType } from "@/store/slices/InputType";

export default function Home() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<object>, newValue: string) => {
    dispatch(changeInputType(newValue as InputType));
  };

  return (
    <Container sx={{minHeight:"100vh"}} maxWidth={false}>
      <TabContext  value={inputType}>
        <Tabs value={inputType} onChange={handleChange}>
          <Tab label="Easy UI" value="EASY_UI" />
          <Tab label="GMPL" value="GMPL" />
          <Tab label="CPLEX LP" value="CPLEX_LP" />
          <Tab label="MPS" value="MPS" />
        </Tabs>
        <TabPanel value="EASY_UI">
          <EasyInput />
        </TabPanel>
        <TabPanel value="GMPL">
          <GmplInput />
        </TabPanel>
        <TabPanel value="CPLEX_LP">
          <CplexLpInput />
        </TabPanel>
        <TabPanel value="MPS">
          <MpsInput />
        </TabPanel>
      </TabContext>

      <ActionsBar />

      <SolutionContainer />
    </Container>
  );
}
