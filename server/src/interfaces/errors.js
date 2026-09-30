"use strict";

// Thrown when a repository has no database connection yet. The HTTP adapter
// answers it with 503 instead of letting the process crash.
export class ServiceUnavailableError extends Error {
  constructor(message = "database unavailable") {
    super(message);
    this.name = "ServiceUnavailableError";
  }
}
