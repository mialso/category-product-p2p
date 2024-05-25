import { initConnection } from './connection';
import { initBaseStore } from './baseStore';
import { initSnapshot } from './snapshot';
import { SnapshotCoreName } from './constant';

export async function initDb() {
    const swarm = initConnection();
    const baseStore = await initBaseStore(swarm);
    const productSnapshot = await initSnapshot(SnapshotCoreName.Product, swarm);

    return { baseStore, productSnapshot };
}
