import Hyperswarm from 'hyperswarm';
import Corestore from 'corestore';
import b4a from 'b4a';

export async function initDb() {
    const store = new Corestore(Pear.config.storage);
    const swarm = new Hyperswarm();
    Pear.teardown(() => swarm.destroy());

    const appCtrlCore = store.get({ name: 'app-ctrl-core', valueEncoding: 'json' });
    const productCore = store.get({ name: 'product-core', valueEncoding: 'json' });
    const categoryCore = store.get({ name: 'category-core', valueEncoding: 'json' });
    await Promise.all([appCtrlCore.ready(), productCore.ready(), categoryCore.ready()]);

    const appCtrlKey = b4a.toString(appCtrlCore.key, 'hex');
    console.log('appCtrlKey', appCtrlKey);

    swarm.join(appCtrlCore.discoveryKey!);
    swarm.on('connection', (conn) => store.replicate(conn));
}
