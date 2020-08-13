// This CORS service was abandonded due to time, but
// otherwise would create whitelists and depending
// on the environment choose which whitelist to use

const developmentWhitelist: string[] = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', ''];
// const productionWhitelist: string[] = [''];

const urlWhitelist = (): string[] => developmentWhitelist;

const corsOptions = {
  origin: function (origin: string, callback: (arg1: Error | null, arg2?: boolean) => any) {
    if (urlWhitelist().indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

export default {
  corsOptions
}
