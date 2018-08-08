export class ImportedFooError extends Error {}

console.log(`Without try/catching?`);
console.log(new ImportedFooError instanceof Error);

try {
  throw new ImportedFooError(`We threw ImportedFooError (same file)`);
} catch (error) {
  console.log(`instanceof ImportedFooError (same file)`, error instanceof ImportedFooError);
}
