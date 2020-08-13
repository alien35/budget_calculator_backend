const ping = async (req: any, res: any): Promise<any> => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.send('pong');
}

export default ping;
