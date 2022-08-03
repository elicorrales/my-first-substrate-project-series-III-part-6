const httpUrl = 'http://localhost:9933';
const wsUrl = 'ws://localhost:9944';
const { HttpProvider, WsProvider, ApiPromise } = require('@polkadot/api');
(async () => {
    let ws = new WsProvider(wsUrl);
    let wApi = await ApiPromise.create({ provider: ws });
    wApi.disconnect();
})();
