declare module 'hypercore' {
    type StoreKey = string | Buffer;
    type Encoding = string; // 'json', 'utf-8', 'binary'

    type HypercoreOptions = Partial<{
        createIfMissing: boolean,
        overwrite: boolean,
        sparse: boolean,
        valueEncoding: Encoding,
        encodeBatch: (batch: unknown) => void,
        keyPair: Record<string, unknown> | null,
        encryptionKey: string | null,
        onwait: () => void,
        timeout: number,
        writable: boolean,
    }>;

    type GetOptions = Partial<{
        wait: boolean,
        onwait: () => void,
        timeout: number,
        valueEncoding: Encoding,
        decrypt: boolean,
    }>;
    class Hypercore {
        constructor(storagePath: string, key?: StoreKey, opts?: HypercoreOptions);
        constructor(storagePath: string, opts?: HypercoreOptions);
        readable: boolean;

        id: string;

        key: Buffer;

        keyPair: Record<string, Buffer>;

        discoveryKey: Buffer | null;

        encryptionKey: Buffer | null;

        writable: boolean;

        length: number;

        contiguousLength: number;

        fork: unknown;

        padding: number;

        append(block: any): Promise<{ length: number; byteLength: number }>;
        get(index: number, opts?: GetOptions): Promise<Buffer>;
        has(start: number, end?: number): Promise<boolean>;
        update(opts?: { wait: boolean }): Promise<boolean>;
        ready(): Promise<void>;
        close(): Promise<void>;
    }

    export = Hypercore;
}
