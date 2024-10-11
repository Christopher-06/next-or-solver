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

import { FileFormat } from "@/components/Converter/FileFormat";
import highsLoader, { HighsSolution } from "highs";
import convertLP from "@/components/Converter/Converter";

const LOAD_CONFIG = {
  // In a browser, one can load the wasm file from github
  locateFile: (file: string) => "https://lovasoa.github.io/highs-js/" + file,
};

export default async function solve(problem: string, currentFormat: FileFormat) {
  // console.log("solver: " + currentFormat);
  let problem_lp = convertLP(problem, currentFormat, FileFormat.CPLEX_LP)
  // console.log("LP: " + problem_lp);
  if (problem_lp == null) problem_lp = "";
  const highs = await highsLoader(LOAD_CONFIG);
  const solution: HighsSolution = highs.solve(problem_lp);
  return solution;
}
