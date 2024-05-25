import path from 'bare-path';
import Hypercore from 'hypercore';
import { SnapshotCoreName } from './constant';

export type InitSnapshot = (nameKey: SnapshotCoreName, swarm?: Hyperswarm) => Promise<Hypercore>;
export const initSnapshot: InitSnapshot = async (nameKey, swarm?) => {
    const snapshotCore = new Hypercore(path.join(Pear.config.storage, nameKey), { valueEncoding: 'json' });
    await snapshotCore.ready();
    if (swarm) {
        console.log('got swarm: ', swarm.peers);
    }
    return snapshotCore;
};
