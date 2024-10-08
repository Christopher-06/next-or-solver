import { useTranslations } from "next-intl"; //Sprache
import NameInput from "./NameInput";
import { Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

export default function ArrayDimensionsInput({
  name,
  setName,
  dimList,
  setDimList,
}: {
  name: string;
  setName: (name: string) => void;
  dimList: string[];
  setDimList: (dimList: string[]) => void;
}) {
  const { isInside } = useMouseContext();
  const t = useTranslations(); //Sprache

  console.log(dimList)
  let dimInput = <></>;

  if (name !== "" && !isInside) {
    // Draw as Math Text
    dimInput = (
      <>
        <Typography variant="h4" sx={{ ml: 1 }} color="textDisabled">
          [&nbsp;
        </Typography>

        <Typography variant="h5" color="textPrimary">
          {dimList.map((dim, i) => {
            return (
              <>
                {" " + dim}
                {i < dimList.length - 1 ? ", " : ""}
              </>
            );
          })}
        </Typography>

        <Typography variant="h4" color="textDisabled">
          &nbsp;]
        </Typography>
      </>
    );
  } else {
    // Draw as Text Field Input
    dimInput = (
      <NameInput
        name={dimList.join(", ")}
        label={t("variable.arraydimension.label")}  //Sprache
        setName={(dimList: string) => {
          setDimList([dimList]);
        }}
      />
    );
  }

  return (
    <>
      <NameInput name={name} setName={setName} />

      {dimInput}
    </>
  );
}
