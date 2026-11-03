if (process.argv[2]) throw Error('Historical manuscript imports require the historical revision.');
await import('./apply-v31.mjs');
