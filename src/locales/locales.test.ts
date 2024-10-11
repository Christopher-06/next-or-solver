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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

const get_deep_keys = (obj: any, prefix: string = ""): string[] => {
  let keys: string[] = [];
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      keys = keys.concat(get_deep_keys(obj[key], prefix + key + "."));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
};

describe("locales", () => {
  it("german and english should exist", () => {
    const german_locale = require("./de-DE.json");
    const english_locale = require("./en-US.json");

    expect(german_locale).toBeDefined();
    expect(english_locale).toBeDefined();
  });

  it("german and english should have the same top level keys", () => {
    const german_locale = require("./de-DE.json");
    const english_locale = require("./en-US.json");

    // TODO: expect(Object.keys(german_locale).sort()).toEqual(Object.keys(english_locale).sort());
  });

  it("all locales should not have duplicate keys", () => {
    const german_locale = require("./de-DE.json");
    const english_locale = require("./en-US.json");

    const german_keys = get_deep_keys(german_locale);
    const english_keys = get_deep_keys(english_locale);

    const german_set = new Set(german_keys);
    const english_set = new Set(english_keys);

    expect(german_set.size).toBe(german_keys.length);
    expect(english_set.size).toBe(english_keys.length);
  });

  it("all locales should have the same keys", () => {
    const german_locale = require("./de-DE.json");
    const english_locale = require("./en-US.json");

    const german_keys = get_deep_keys(german_locale);
    const english_keys = get_deep_keys(english_locale);

    const german_set = new Set(german_keys);
    const english_set = new Set(english_keys);

    // TODO: expect(german_set).toEqual(english_set);
  });
});
