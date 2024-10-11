/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function correct_var_name(lp: any) {
    fix_names(lp.col);
    fix_names(lp.row);
}

function fix_names(objects: any) {
    for (const objekt of objects) {
        if (objekt != undefined) {
            objekt.name = objekt.name.replace(/[^\w]/g, '_');
            if (objekt.name[objekt.name.length - 1] == '_') objekt.name = objekt.name.slice(0, -1);
        }
    }
}