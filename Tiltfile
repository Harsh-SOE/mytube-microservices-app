# Tiltfile (improved)
docker_compose('compose.yml')  # infra: postgres, redis, kafka, etc.

# List your services and the repo paths for them
SERVICES = {
  'users': './apps/users',
  'videos': './apps/videos',
  'cloud': './apps/cloud',
  'email': './apps/email',
  'likes': './apps/likes',
  'video-transcoder': './apps/video-transcoder',
  'saga': './apps/saga',
  'views': './apps/views',
  'comments': './apps/comments',
  'hub': './apps/hub',
  'gateway': './apps/api-gateway',
}

# Helper to create builds
def add_service(service_name, rel_path):
    # Use a dev-local image tag so it won't be mistaken for a real prod image.
    image_ref = "mytube/" + service_name + "/production"

    # Choose a build context. If your Dockerfile needs root files (libs, package.json),
    # use '.'; if it needs only the service folder + libs, set context to repo root still
    # but keep dockerfile pointing to the service Dockerfile.
    docker_build(
        image_ref,
        '.',  # keep repo root here so Dockerfile can reference ../../libs or root package.json as needed
        dockerfile = rel_path + '/Dockerfile',
        live_update = [
            # Sync service source into container
            sync(rel_path, '/home/node/app/apps/' + service_name),

            # Sync shared libs (monorepo)
            sync('./libs', '/home/node/app/libs'),

            # If your repo installs at root (yarn workspaces), trigger install when root lockfiles change
            run('yarn install --frozen-lockfile', trigger=['./package.json', './yarn.lock',
                                                           rel_path + '/package.json']),

            # Run the same build command your Dockerfile would run.
            # If your Dockerfile uses `npx nest build users`, mirror that here.
            run('npx nest build ' + service_name, trigger=[rel_path + '/src', './libs'])
        ]
    )

# Add each service
for name, path in SERVICES.items():
    add_service(name, path)
