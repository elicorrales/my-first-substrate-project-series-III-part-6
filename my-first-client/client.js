const wsUrl = 'ws://localhost:9944';
const { WsProvider, ApiPromise } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract');
(async () => {
    let ws = new WsProvider(wsUrl);
    let wApi = await ApiPromise.create({ provider: ws });
    console.log(await wApi.tx);
    wApi.disconnect();
})();
