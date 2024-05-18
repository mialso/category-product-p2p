declare type Hypercore = import('hypercore');

declare module 'corestore' {
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

    type CorestoreOptions = Partial<{
        key: StoreKey,
        name: string,
        exclusive: boolean,
    }>;

    class Corestore {
        constructor(storagePath: string, opts?: { primaryKey: unknown });
        get(key: StoreKey | CorestoreOptions & HypercoreOptions): Hypercore;
        replicate(opts: any): void;
    }

    export = Corestore;
}
