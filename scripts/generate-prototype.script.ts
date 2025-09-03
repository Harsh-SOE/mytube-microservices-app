import { execSync } from 'child_process';

const serviceName = process.argv[2];
if (!serviceName) {
  console.error('Usage: yarn generate:proto <serviceName>');
  process.exit(1);
}
const protoRoot = `libs/proto`;
const protoPath = `libs/proto/${serviceName}.proto`;
const outPath = `libs/contracts/src/${serviceName}`;

const cmd = `protoc -I=${protoRoot} --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=${outPath} --ts_proto_opt=useOptionals=none,useDate=false,nestJs=true ${protoPath}`;

console.log('Running:', cmd);
execSync(cmd, { stdio: 'inherit' });
