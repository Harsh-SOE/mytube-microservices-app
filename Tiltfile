docker_compose('compose.yml')

SERVICES = {
  'users': './apps/users',
  'videos': './apps/videos',
  'email': './apps/email',
  'reaction': './apps/reaction',
  'video-transcoder': './apps/video-transcoder',
  'saga': './apps/saga',
  'views': './apps/views',
  'comments': './apps/comments',
  'channel': './apps/channel',
  'gateway': './apps/api-gateway',
}

def start_services(name, rel_path):
    image_name = "mytube/" + name + "/development"

    prisma_generate_command = 'npx prisma generate --schema apps/' + name + '/prisma/schema.prisma'
    prisma_schema = '/@streamforge/apps/' + name + '/prisma/schema.prisma'

    docker_build(
        image_name,
        '.',
        dockerfile = rel_path + '/Dockerfile',
        target='development',
        live_update=[
            sync(rel_path, "/@streamforge/apps/" + name),
            sync("./libs", "/libs"),
            run("yarn install", trigger=["package.json", "yarn.lock"]),
            run(prisma_generate_command, trigger=[prisma_schema]),
        ]
    )

for name, path in SERVICES.items():
    start_services(name, path)
