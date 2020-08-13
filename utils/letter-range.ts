import { range } from 'lodash';

export const letterRange = (start: string, end: string): string[] =>
  range(start.charCodeAt(0), end.charCodeAt(0) + 1).map((i) =>
    String.fromCharCode(i)
  );

export const LETTERS = letterRange('A', 'Z');
