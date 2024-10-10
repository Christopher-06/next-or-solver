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
