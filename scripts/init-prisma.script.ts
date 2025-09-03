import { execSync } from 'child_process';

const serviceName = process.argv[2];
if (!serviceName) {
  console.error('Usage: yarn prisma:init <serviceName> <migrationName>');
  process.exit(1);
}

const cmd = `sh -c 'echo Initializing prisma for ${serviceName} && cd apps/${serviceName} && npx prisma init && cd ../../'`;

console.log('Running:', cmd);
execSync(cmd, { stdio: 'inherit' });
