"use client";

export class LINPROB {
    prob_name : string;
    prob_type : PROB_TYPE;
    obj_name : string;
    rows : ROW[] = [];
    cols : COL[] = [];
    rhss : RHS[] = [];
    bounds : BOUND[] = [];
    name_string : string;
    rows_string : string = "ROWS";
    cols_string : string = "COLUMNS"
    rhss_string : string = "RHS";
    bounds_string : string = "BOUNDS";

    constructor(prob_name: string, prob_type : PROB_TYPE, obj_name: string) {
        this.prob_name = prob_name;
        this.prob_type = prob_type;
        this.obj_name = obj_name;
        this.name_string = "NAME\t" + this.prob_name;
    }

    add_row(row: ROW) {
        this.rows.push(row);
        this.rows_string += "\n" + row.get_row_string();
    }

    add_col(col: COL) {
        this.cols.push(col);
        this.cols_string += "\n" + col.get_col_string();
    }

    ad_rhs(rhs: RHS) {
        this.rhss.push(rhs);
        this.rhss_string += "\n" + rhs.get_rhs_string();
    }

    add_bound(bound: BOUND) {
        this.bounds.push(bound);
        this.bounds_string += "\n" + bound.get_bound_string();
    }

    get_mps_string(): string {
        let mps_string: string = this.name_string;
        mps_string += "\n" + this.rows_string;
        mps_string += "\n" + this.cols_string;
        mps_string += "\n" + this.rhss_string;
        mps_string += "\n" + this.bounds_string;
        mps_string += "\n" + "ENDDATA";
        return mps_string;
    }
}

export class ROW {
    row_type : ROW_TYPE;
    row_name : string;

    constructor(row_type: ROW_TYPE, row_name: string) {
        this.row_type = row_type;
        this.row_name = row_name;
    }

    get_row_string(): string {
        return " " + this.row_type + "\t" + this.row_name;
    }
}

export class COL {
    col_name : string;
    row_name : string;
    value : number;

    constructor(col_name: string, row_name: string, value: number) {
        this.col_name = col_name;
        this.row_name = row_name;
        this.value = value;
    }

    get_col_string(): string {
        return " \t" + this.col_name + "\t" + this.row_name + "\t" + this.value;
    }
}

export class RHS {
    row_name : string;
    value : number;

    constructor(row_name: string, value: number) {
        this.row_name = row_name;
        this.value = value;
    }

    get_rhs_string(): string {
        return " \tRHS\t" + this.row_name + "\t" + this.value;
    }
}

export class BOUND {
    bound_type : BOUND_TYPE;
    col_name : string;
    value : number;

    constructor(bound_type: BOUND_TYPE, col_name: string, value: number) {
        this.bound_type = bound_type;
        this. col_name = col_name;
        this.value = value;
    }

    get_bound_string(): string {
        return " " + this.bound_type + "\tBND\t" + this.col_name + "\t" + this.value;
    }
}

export enum PROB_TYPE {
    min = "min",
    max = "max"
}

export enum ROW_TYPE {
    N = "N",
    G = "G",
    L = "L",
    E = "E"
}

export enum BOUND_TYPE {
    LO = "LO",
    LI = "LI",
    UP = "UP",
    UI = "UI",
    FX = "FX",
    FR = "FR",
    MI = "MI",
    PL = "PL",
    BV = "BV",
    SC = "SC"
}
