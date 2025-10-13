// Type definitions for OPFSCoopSyncVFS
// Generated from JSDoc in OPFSCoopSyncVFS.js

import type { FacadeVFS } from "../FacadeVFS.js";

/**
 * Cooperative OPFS-backed synchronous VFS for SQLite WASM.
 */
export class OPFSCoopSyncVFS extends FacadeVFS {
  /** Map of SQLite file IDs to open files. */
  mapIdToFile: Map<number, _File>;

  /** Last error that occurred within a VFS operation. */
  lastError: unknown;

  /** Optional logger. */
  log: ((...args: any[]) => void) | null;

  /** Persistent (main DB and related) files keyed by path. */
  persistentFiles: Map<string, _PersistentFile>;

  /** Reusable access handles bound to temporary paths. */
  boundAccessHandles: Map<string, FileSystemSyncAccessHandle>;

  /** Pool of unbound access handles. */
  unboundAccessHandles: Set<FileSystemSyncAccessHandle>;

  /** Paths that are currently visible/access-permitted to SQLite. */
  accessiblePaths: Set<string>;

  /** Releaser for this instance’s temporary directory WebLock. */
  releaser: (() => void) | null;

  /**
   * Factory: construct and initialize the VFS.
   */
  static create(name: string, module: any): Promise<OPFSCoopSyncVFS>;

  constructor(name: string, module: any);

  /**
   * xOpen
   */
  jOpen(
    zName: string | null,
    fileId: number,
    flags: number,
    pOutFlags: DataView
  ): number;

  /**
   * xDelete
   */
  jDelete(zName: string, syncDir: number): number;

  /**
   * xAccess
   */
  jAccess(zName: string, flags: number, pResOut: DataView): number;

  /**
   * xClose
   */
  jClose(fileId: number): number;

  /**
   * xRead
   */
  jRead(fileId: number, pData: Uint8Array, iOffset: number): number;

  /**
   * xWrite
   */
  jWrite(fileId: number, pData: Uint8Array, iOffset: number): number;

  /**
   * xTruncate
   */
  jTruncate(fileId: number, iSize: number): number;

  /**
   * xSync
   */
  jSync(fileId: number, flags: number): number;

  /**
   * xFileSize
   */
  jFileSize(fileId: number, pSize64: DataView): number;

  /**
   * xLock
   */
  jLock(fileId: number, lockType: number): number;

  /**
   * xUnlock
   */
  jUnlock(fileId: number, lockType: number): number;

  /**
   * xFileControl
   */
  jFileControl(
    fileId: number,
    op: number,
    pArg: DataView
  ): number | Promise<number>;

  /**
   * xGetLastError
   */
  jGetLastError(zBuf: Uint8Array): number;
}

/* ---------- Internal, non-exported helper types (for signatures only) ---------- */

declare class _File {
  /** Canonical path (file:// URL pathname). */
  path: string;
  /** SQLite open flags (VFS.SQLITE_OPEN_*). */
  flags: number;
  /** Access handle (temporary) if not persistent. */
  accessHandle: FileSystemSyncAccessHandle | undefined;
  /** Persistent file metadata/handles when main DB. */
  persistentFile: _PersistentFile | null;

  constructor(path: string, flags: number);
}

declare class _PersistentFile {
  /** OPFS file handle for the DB/journal/WAL file. */
  fileHandle: FileSystemFileHandle | null;
  /** Sync access handle for read/write/truncate/flush. */
  accessHandle: FileSystemSyncAccessHandle | null;

  /** True if a competing lock made us return SQLITE_BUSY. */
  isLockBusy: boolean;
  /** True while SQLite holds a lock on the file. */
  isFileLocked: boolean;
  /** True while creating/obtaining access handles. */
  isRequestInProgress: boolean;
  /** WebLock releaser function when the lock is held. */
  handleLockReleaser: (() => void) | null;

  /** Channel used to ask peers for the handle. */
  handleRequestChannel: BroadcastChannel;
  /** Whether a peer requested this connection to release handles. */
  isHandleRequested: boolean;

  constructor(fileHandle: FileSystemFileHandle | null);
}
