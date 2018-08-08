/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
 *  WARN: Heed the note in the "ES6 Custom Error Class" section:
 *  > Babel and other transpilers will not correctly handle the following code
 *  > without additional configuration (https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend)
 *
 * In addition to enabling babel-plugin-transform-builtin-extend, you also need
 * to set __proto__ on each custom error.
 * https://github.com/babel/babel/issues/4485#issuecomment-377970736
 */

export class ImportedFooError extends Error {
  constructor(message) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ImportedFooError);
    }
    this.constructor = ImportedFooError;
    this.__proto__   = ImportedFooError.prototype;
  }
}

console.log(`Without try/catching?`);

try {
  throw new ImportedFooError(`We threw ImportedFooError (same file)`);
} catch (error) {
  console.log(`instanceof ImportedFooError (same file)`, error instanceof ImportedFooError);
}
