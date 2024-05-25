import Corestore from 'corestore';
import b4a from 'b4a';
import { BaseCoreName } from './constant';

export async function initBaseStore(swarm: Hyperswarm): Promise<Record<BaseCoreName, Hypercore>> {
    const store = new Corestore(Pear.config.storage);

    const appCtrlCore = store.get({ name: 'app-ctrl-core', valueEncoding: 'json' });
    const productCore = store.get({ name: 'product-core', valueEncoding: 'json' });
    const categoryCore = store.get({ name: 'category-core', valueEncoding: 'json' });
    await Promise.all([appCtrlCore.ready(), productCore.ready(), categoryCore.ready()]);

    const appCtrlKey = b4a.toString(appCtrlCore.key, 'hex');
    console.log('appCtrlKey', appCtrlKey);

    swarm.join(appCtrlCore.discoveryKey!);
    swarm.on('connection', (conn) => store.replicate(conn));
    return {
        [BaseCoreName.AppCtrl]: appCtrlCore,
        [BaseCoreName.Product]: productCore,
        [BaseCoreName.Category]: categoryCore,
    };
}
