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

export type Pair<T, K> = [T, K];

export function createUniqueID(): string {
  return (
    Math.random().toString(36).substring(7) +
    Math.random().toString(36).substring(7) +
    Math.random().toString(36).substring(7)
  );
}
