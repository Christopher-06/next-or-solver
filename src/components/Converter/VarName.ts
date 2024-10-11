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