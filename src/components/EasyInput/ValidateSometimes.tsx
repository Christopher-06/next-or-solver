import { ValidateEasyUI } from "@/lib/easy-ui/validation";
import { setInputError } from "@/store/slices/TextFieldInputs";
import { RootState } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ValidateSometimes() {
  const modell = useSelector((state: RootState) => state.modell);
  const variables = useSelector((state: RootState) => state.variables);
  const dispatch = useDispatch();

  const validateEasyUI = useCallback(() => {
    // Validate
    let error = null;
    try {
      ValidateEasyUI(modell, variables);
    } catch (err) {
      if (err instanceof Error) {
        error = err;
      }
    }

    // dispatch result
    dispatch(
      setInputError({
        key: "EASY_UI",
        error: error,
      })
    );
  }, [dispatch, modell, variables]);

  // call validateEasyUI every 500ms when modell or variables change
  useEffect(() => {
    if (modell.objective_formular !== "" && variables.length > 0) {
      const timeout = setTimeout(() => {
        validateEasyUI();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [modell, variables, validateEasyUI]);

  return <></>;
}
