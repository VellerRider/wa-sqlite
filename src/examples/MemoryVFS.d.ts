// Type definitions for MemoryVFS
// Generated from MemoryVFS.js

import type { FacadeVFS } from "../FacadeVFS.js";

/**
 * Simple in-memory VFS implementation for SQLite WASM.
 */
export class MemoryVFS extends FacadeVFS {
  /** Existing files keyed by canonical pathname. */
  mapNameToFile: Map<string, _MemoryFile>;

  /** Open handle map keyed by SQLite file identifier. */
  mapIdToFile: Map<number, _MemoryFile>;

  /**
   * Construct and initialize a MemoryVFS instance.
   */
  static create(name: string, module: any): Promise<MemoryVFS>;

  constructor(name: string, module: any);

  /** Close all open file handles. */
  close(): void;

  /** xOpen */
  jOpen(
    filename: string | null,
    fileId: number,
    flags: number,
    pOutFlags: DataView
  ): number;

  /** xClose */
  jClose(fileId: number): number;

  /** xRead */
  jRead(fileId: number, pData: Uint8Array, iOffset: number): number;

  /** xWrite */
  jWrite(fileId: number, pData: Uint8Array, iOffset: number): number;

  /** xTruncate */
  jTruncate(fileId: number, iSize: number): number;

  /** xFileSize */
  jFileSize(fileId: number, pSize64: DataView): number;

  /** xDelete */
  jDelete(name: string, syncDir: number): number;

  /** xAccess */
  jAccess(name: string, flags: number, pResOut: DataView): number;
}

/** Internal representation of an in-memory file. */
declare interface _MemoryFile {
  pathname: string;
  flags: number;
  size: number;
  data: ArrayBuffer;
}
