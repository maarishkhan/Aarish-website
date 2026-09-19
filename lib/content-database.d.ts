export function normalizeCollection<T>(
  rows: unknown[],
  fallback: T[],
  mapper: (row: Record<string, unknown>) => T,
): T[];

export async function readDatabaseCollection<T>(
  tableName: string,
  fallback: T[],
  mapper: (row: Record<string, unknown>) => T,
): Promise<T[]>;
