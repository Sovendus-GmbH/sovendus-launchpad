export function logger(message: string): void {
  // eslint-disable-next-line no-console
  console.log(
    `%c[Sovendus-Launchpad][INFO] ${message}`,
    "color: green; font-size: larger;",
  );
}

export function loggerError(message: string, error: unknown): void {
  // eslint-disable-next-line no-console
  console.error(
    `%c[Sovendus-Launchpad][ERROR] ${message}`,
    "color: red; font-size: larger;",
    error,
  );
}
