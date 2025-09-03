import { execSync } from 'child_process';

const serviceName = process.argv[2];
const migrationName = process.argv[3];
if (!serviceName || !migrationName) {
  console.error(
    'Usage: yarn prisma:generate:migrations <serviceName> <migrationName>',
  );
  process.exit(1);
}

const cmd = `docker exec -it ${serviceName} sh -c 'npx prisma migrate dev --schema ./apps/${serviceName}/prisma/schema.prisma --name ${migrationName}'`;

console.log('Running:', cmd);
execSync(cmd, { stdio: 'inherit' });
