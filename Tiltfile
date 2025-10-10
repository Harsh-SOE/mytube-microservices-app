# Use docker-compose for databases, kafka, redis
docker_compose('docker-compose.yml')

# Function to add a service
def add_service(service_name, path):
    service_container_path = f'/usr/src/app/apps/{service_name}'  # match dev workdir
    docker_build(service_name, path,
        dockerfile=f'{path}/Dockerfile',
        live_update=[
            # Sync service code
            sync(path, service_container_path),
            # Sync shared libs
            sync('./libs', '/usr/src/app/libs'),
            # Install deps if package.json or yarn.lock changes
            run('yarn install', trigger=['package.json', 'yarn.lock']),
            # Build the specific service
            run(f'yarn build {service_name}', trigger=[f'{path}/src', './libs'])
        ]
    )

# Add all your services
add_service('users', './apps/users')
add_service('videos', './apps/videos')
add_service('cloud', './apps/cloud')
add_service('email', './apps/email')
add_service('likes', './apps/likes')
add_service('video-transcoder', './apps/video-transcoder')
add_service('saga', './apps/saga')
add_service('likes-aggregator', './apps/likes-aggregator')
add_service('views', './apps/views')
add_service('views-aggregator', './apps/views-aggregator')
add_service('comments-aggregator', './apps/comments-aggregator')
add_service('comments', './apps/comments')
add_service('hub', './apps/hub')
add_service('gateway', './apps/api-gateway')
