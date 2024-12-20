import { FileFormat } from "@/components/Converter/FileFormat";
import {
  SolverWorkerResponse,
  SolveWorkerMessage,
} from "@/workers/solve-worker";
import { HighsSolution } from "highs";
import { useEffect, useRef } from "react";
import { createUniqueID } from "../helper";

function workerResponseWaiter(
  workerRef: React.MutableRefObject<Worker | undefined>,
  _id?: string
) {
  return new Promise<HighsSolution>((resolve, reject) => {
    // Listen on message event
    workerRef.current?.addEventListener("message", (event) => {
      if (_id && event.data._id === _id) {
        // filter
        resolve(event.data.solution as HighsSolution);
      }
    });

    // Listen on error event
    workerRef.current?.addEventListener("error", (event) => {
      reject(new Error(event.message));
    });
  });
}

async function sendAndWaitWorker(
  msg: SolveWorkerMessage,
  workerRef: React.MutableRefObject<Worker | undefined>
) {
  const wait_task = workerResponseWaiter(workerRef, msg._id);
  workerRef.current?.postMessage(msg);
  return await wait_task;
}

export default function useSolveWorker(
  solverLogCallback: (msg: string) => void,
  solverOutputCallback: (msg: string) => void
) {
  const workerRef = useRef<Worker>();

  // Solver Functions
  const withGLPK = async (problem: string, format: FileFormat) => {
    return await sendAndWaitWorker(
      {
        solver: "GLPK",
        problem,
        format,
        _id: createUniqueID(),
      },
      workerRef
    );
  };
  const withHIGHS = async (problem: string, format: FileFormat) => {
    return await sendAndWaitWorker(
      {
        solver: "HIGHS",
        problem,
        format,
        _id: createUniqueID(),
      },
      workerRef
    );
  };

  // Worker Control
  const startWorker = () => {
    console.log("Starting Worker");
    workerRef.current = new Worker(
      new URL("../../workers/solve-worker.ts", import.meta.url)
    );

    // TODO: Wait for worker to be ready
  };
  const terminateWorker = () => {
    console.log("Terminating Worker");
    workerRef.current?.terminate();
  };
  const restartWorker = () => {
    terminateWorker();
    startWorker();
  };

  // Start and Terminate WebWorker on mount and unmount
  useEffect(() => {
    startWorker();
    return terminateWorker;
  }, []);

  // register solver log / output
  useEffect(() => {
    const eventHandler = (event: MessageEvent<SolverWorkerResponse>) => {
      if (event.data._id === "log" && event.data.msg) {
        solverLogCallback(event.data.msg);
      } else if (event.data._id === "output" && event.data.msg) {
        solverOutputCallback(event.data.msg);
      }
    };

    workerRef.current?.addEventListener("message", eventHandler);
    return () => {
      workerRef.current?.removeEventListener("message", eventHandler);
    };
  }, [workerRef, solverLogCallback, solverOutputCallback]);

  return {
    withGLPK,
    withHIGHS,
    worker: {
      terminate: terminateWorker,
      restart: restartWorker,
    },
  };
}
