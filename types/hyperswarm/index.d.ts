/* eslint-disable max-classes-per-file */
declare module 'hyperswarm' {
    type PeerInfo = {
        publicKey: string;
        topics: string[];
        prioritized: boolean;
    };

    class PeerDiscovery {
        flushed(): Promise<void>;
        refresh(opts: { client: unknown, server: unknown }): Promise<void>;
        destroy(): Promise<void>;
    }

    class Hyperswarm {
        constructor(opts?: { keyPair: string, seed: Buffer, maxPeers: number });

        connecting: number;

        connections: unknown[];

        peers: Record<string, PeerInfo>;

        dht: unknown; // hyperdht

        destroy(): void;
        join(key: string | Buffer): PeerDiscovery;
        leave(topic: Buffer): Promise<void>;
        on(key: string, handler: (info: PeerInfo) => void): void;
    }
    export = Hyperswarm;
}
