import Hyperswarm from 'hyperswarm';

export function initConnection(): Hyperswarm {
    const swarm = new Hyperswarm();
    Pear.teardown(() => swarm.destroy());
    return swarm;
}
