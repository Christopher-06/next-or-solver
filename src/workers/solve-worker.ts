import { FileFormat } from "@/components/Converter/FileFormat";
import solveGLPK from "@/lib/glpk_solver";
import solveHighs from "@/lib/highs";
import { HighsSolution } from "highs";

export interface SolveWorkerMessage {
  solver: "GLPK" | "HIGHS";
  _id: string;
  problem: string;
  format: FileFormat;
}
export type SolverWorkerResponse = {
      _id: string | "output" | "log";
      solution?: HighsSolution;
      msg?: string;
    };

function solverOutputCallback(msg: string) {
  postMessage({ _id: "output", msg });
}

function solverLogCallback(msg: string) {
  postMessage({ _id: "log", msg });
}

addEventListener("message", (event) => {
  console.log("Solver Worker: Received message", event.data);
  // Solve Message
  switch (event.data.solver) {
    case "GLPK":
      postMessage({
        _id: event.data._id,
        solution: solveGLPK(
          event.data.problem,
          event.data.format,
          solverLogCallback,
          solverOutputCallback
        ),
      });
      break;
    case "HIGHS":
      console.log("Solver Worker: Solving with HIGHS");
      solveHighs(event.data.problem, event.data.format).then((solution) => {
        console.log("Solver Worker: HIGHS solution", solution);
        postMessage({ _id: event.data._id, solution });
      });
      break;
    default:
      console.error("Solver Worker: Unknown solver selected");
      break;
  }
});
