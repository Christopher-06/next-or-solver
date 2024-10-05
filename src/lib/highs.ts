import highsLoader, { HighsSolution } from "highs";

const LOAD_CONFIG = {
  // In a browser, one can load the wasm file from github
  locateFile: (file: string) => "https://lovasoa.github.io/highs-js/" + file,
};

export default async function solve(problem: string) {
  const highs = await highsLoader(LOAD_CONFIG);
  const solution: HighsSolution = highs.solve(problem);
  await new Promise((resolve) => setTimeout(resolve, 30000));
  return solution;
}
