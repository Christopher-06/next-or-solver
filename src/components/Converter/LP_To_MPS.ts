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

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BOUND, BOUND_TYPE, COL, LINPROB, PROB_TYPE, RHS, ROW, ROW_TYPE } from "./LINPROB";

const lp_to_mps = (lp: any): string => {
    const problem = new LINPROB("problem", (lp.dir == 2) ? PROB_TYPE.max : PROB_TYPE.min, lp.obj);  // name, min/max
    add_obj(problem, lp);
    add_rows(problem, lp);
    add_data_form_cols(problem, lp);
    
    return problem.get_mps_string();
}

const add_obj = (problem: LINPROB, lp: any) => {
    problem.add_row(new ROW(ROW_TYPE.N, lp.obj));  // Zielfunktion
}

const add_rows = (problem: LINPROB, lp: any) => {
    for (const row of lp.row) {
        if (row != null) {
            if (row.name != problem.obj_name) {
                problem.add_row(new ROW((row.type == 2) ? ROW_TYPE.G :((row.type == 3) ? ROW_TYPE.L : ROW_TYPE.E), row.name));
                add_rhs(problem, row);
            }
        }
    }
    return;
}

const add_rhs = (problem: LINPROB, row: any) => {
    problem.ad_rhs(new RHS(row.name, (row.type == 2) ? row.lb : row.ub));
}

const add_data_form_cols = (problem:LINPROB, lp: any) => {
    // fügt alle Daten der Spalten hinzu
    // gleiche Spalten müssen immer zusammen aufgeführt werden

    const obj_name = lp.obj;
    for (const col of lp.col) {
        if (col != null) {
            // Zielfunktionskoeffizienten 
            // Zielfunktion ist standardmäßig Minimierungs-Problem, daher Koeffizienten bei Maximierung negieren 
            if (problem.prob_type == PROB_TYPE.max) {
                problem.add_col(new COL(col.name, obj_name, -col.coef))
            } else {
                problem.add_col(new COL(col.name, obj_name, col.coef))
            }

            // COLUMNS
            add_cols(problem, col.ptr, col.name);

            // Bounds
            const int_var: boolean = (col.kind == 2);
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

const add_cols = (problem: LINPROB, ptr: any, col_name: string) => {  // rekursive Funktion
    if (ptr != null) {  // TODO: ungleich obj_name
        if (ptr.row.name != problem.obj_name) {
            problem.add_col(new COL(col_name, ptr.row.name, ptr.val));
            add_cols(problem, ptr.c_next, col_name);
        }
    }
    return
}

export default lp_to_mps;
