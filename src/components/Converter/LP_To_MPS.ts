/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BOUND, BOUND_TYPE, COL, LINPROB, PROB_TYPE, RHS, ROW, ROW_TYPE } from "./LINPROB";

const lp_to_mps = (lp: any): string => {
    let problem = new LINPROB("problem", (lp.dir == 2) ? PROB_TYPE.max : PROB_TYPE.min);  // name, min/max
    add_obj(problem, lp);
    add_rows(problem, lp);
    add_data_form_cols(problem, lp);
    
    return problem.get_mps_string();
}

var add_obj = (problem: LINPROB, lp: any) => {
    problem.add_row(new ROW(ROW_TYPE.N, lp.obj));  // Zielfunktion
}

var add_rows = (problem: LINPROB, lp: any) => {
    for (const row of lp.row) {
        if (row != null) {
            problem.add_row(new ROW((row.type == 2) ? ROW_TYPE.G :((row.type == 3) ? ROW_TYPE.L : ROW_TYPE.E), row.name));
            add_rhs(problem, row);
        }
    }
    return;
}

var add_rhs = (problem: LINPROB, row: any) => {
    problem.ad_rhs(new RHS(row.name, (row.type == 2) ? row.lb : row.ub));
}

var add_data_form_cols = (problem:LINPROB, lp: any) => {
    // fügt alle Daten der Spalten hinzu
    // gleiche Spalten müssen immer zusammen aufgeführt werden

    let obj_name = lp.obj;
    for (const col of lp.col) {
        if (col != null) {
            // Zielfunktionskoeffizienten 
            problem.add_col(new COL(col.name, obj_name, col.coef))

            // COLUMNS
            add_cols(problem, col.ptr, col.name);

            // Bounds
            let int_var: boolean = (col.kind == 2);
            // 0 ist Standard-Grenzwert
            if (int_var) {
                problem.add_bound(new BOUND(BOUND_TYPE.LI, col.name, col.lb))  // lb hinzufügen, damit Solver weiß, dass Variable INT 
            } else {
                if (col.lb != 0) problem.add_bound(new BOUND(BOUND_TYPE.LO, col.name, col.lb));  // wenn lb = 0, dann lb = 0
            }
            if (col.ub != 0) problem.add_bound(new BOUND(int_var ? BOUND_TYPE.UI : BOUND_TYPE.UP, col.name, col.ub));  // wenn ub = 0, dann ub = unendlich
        }
    }
    return;
}

var add_cols = (problem: LINPROB, ptr: any, col_name: string) => {  // rekursive Funktion
    if (ptr != null) {
        let row: any = ptr.row;
        problem.add_col(new COL(col_name, row.name, ptr.val));
        add_cols(problem, ptr.c_next, col_name);
    }
    return
}

export default lp_to_mps;
