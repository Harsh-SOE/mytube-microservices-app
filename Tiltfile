docker_compose('compose.yml')

# List your services and the repo paths for them
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

# Helper to create builds
def add_service(service_name, rel_path):
    image_name = "mytube/" + service_name + "/production"

    docker_build(
        image_name,
        '.', 
        dockerfile = rel_path + '/Dockerfile',
        live_update = [
            sync(rel_path, '/home/node/apps/' + service_name),
            sync('./libs', '/home/node/libs'),
            run('yarn install --frozen-lockfile', trigger=['./package.json', './yarn.lock', rel_path + '/package.json']),
            run('npx nest build ' + service_name, trigger=[rel_path + '/src', './libs'])
        ]
    )

for name, path in SERVICES.items():
    add_service(name, path)
