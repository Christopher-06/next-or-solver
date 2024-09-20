export interface SystemSkalar {
    name?: string;
    data?: number;
}

export interface SystemTensor {
    
}

export type SystemVariable = SystemSkalar;


export interface Objective {
    sense: "Maximize" | "Minimize";
    expression: string;
}

export interface Model {
    variables: Variable[];
    objective: Objective;
    constraints: string[];
}

