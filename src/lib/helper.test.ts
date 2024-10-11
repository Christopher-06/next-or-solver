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

import { createUniqueID } from "./helper";

describe("Helper", () => {
  it("create unique id", () => {
    const id = createUniqueID();
    expect(id).toBeDefined();
    expect(id.length).toBeGreaterThan(0);
  });

  it("create unique id should be unique", () => {
    // Create 1000 unique ids
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(createUniqueID());
    }

    // Check that all ids are unique
    expect(ids.size).toBe(1000);
  });
});
