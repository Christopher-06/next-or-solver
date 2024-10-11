import { RootState } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileFormat } from "../Converter/FileFormat";
import { readGMPLintoGLPK } from "@/lib/easy-ui/validation";
import glpk from "glpk.js";
import { setInputError } from "@/store/slices/TextFieldInputs";

export default function ValidateEditor({setMarker, deleteMarker, format}: {setMarker: ((error: Error) => void), deleteMarker: (() => void), format: FileFormat}) {
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector(
    (state: RootState) => state.textFieldInputs
  );
  const dispatch = useDispatch();
  const value = textFieldInputs[inputType].textFieldValue;

  const validateEditor = useCallback(() => {
    console.log("validate");
    try {
        validateInput(value, format);
    } catch (err) {
      if (err instanceof Error) {
        ;
      }
    }
  }, [value, inputType]);

  function validateInput(value: string, format: FileFormat) {
    try {
        if (format == FileFormat.GMPL) {
            readGMPLintoGLPK(value);
            deleteMarker();
            dispatch(
                setInputError({
                    key: inputType,
                    error: null
                })
            )
            return;
        } else if (format == FileFormat.CPLEX_LP) {
            const lp = glpk.glp_create_prob();
            let pos = 0;
            glpk.glp_read_lp(lp, null, () => {
                if (pos < value.length){
                    return value[pos++];
                }
                    return -1;
            }, false);
            deleteMarker();
            dispatch(
                setInputError({
                    key: inputType,
                    error: null
                })
            )
            return;
        } 
    } catch (error) {
        if (error instanceof Error) {
            const err_msg = error.toString();
            let line = parseInt(err_msg.split(":")[2]);
            console.log(line);
            setMarker(error);
        } else {
            deleteMarker();
            dispatch(
                setInputError({
                    key: inputType,
                    error: null
                })
            )
        }
    }
}

  useEffect(() => {
    if (value !== "") {
      const timeout = setTimeout(() => {
        validateEditor();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [value, inputType]);

  return <></>
}
