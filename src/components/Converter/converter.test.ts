import convertLP from "./Converter";
import { FileFormat } from "./FileFormat";


describe("converter", () => {

    it("CPLEX LP to CPLEX LP conversion", () => {
        // do not touch the content
        const content = "CPLEX LP to CPLEX LP conversion";
        const result = convertLP(content, FileFormat.CPLEX_LP, FileFormat.CPLEX_LP);
        expect(result).toBe(content);
    });

    it("GMPL to GMPL conversion", () => {
        // do not touch the content
        const content = "GMPL to GMPL conversion";
        const result = convertLP(content, FileFormat.GMPL, FileFormat.GMPL);
        expect(result).toBe(content);
    });
})