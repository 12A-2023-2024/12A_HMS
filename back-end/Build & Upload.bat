docker build . --file Dockerfile -t ghcr.io/jedlik-gyor/hmswebapi:1.0.12
docker push ghcr.io/jedlik-gyor/hmswebapi:1.0.12
docker rmi ghcr.io/jedlik-gyor/hmswebapi:1.0.12
kubectl apply -f k8s/hms-webapi.yaml

