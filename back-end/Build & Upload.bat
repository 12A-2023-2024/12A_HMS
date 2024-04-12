docker build . --file Dockerfile -t ghcr.io/jedlik-gyor/hmswebapi:1.0.18
docker push ghcr.io/jedlik-gyor/hmswebapi:1.0.18
docker rmi ghcr.io/jedlik-gyor/hmswebapi:1.0.18
kubectl apply -f k8s/hms-webapi.yaml

