import { Container } from "@mui/material";
import SolutionContainer from "@/components/SolutionPaper/SolutionPaper";
import EasyInput from "@/components/EasyInput/EasyInput";
import ActionsBar from "@/components/ActionsBar/ActionsBar";

export default function Home() {
  return (
    <Container maxWidth={false}>
      <EasyInput />

      <ActionsBar />

      <SolutionContainer />
    </Container>
  );
}
