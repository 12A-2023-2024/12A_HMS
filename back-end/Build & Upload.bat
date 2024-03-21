docker build . --file Dockerfile -t ghcr.io/jedlik-gyor/hmswebapi:1.0.9
docker push ghcr.io/jedlik-gyor/hmswebapi:1.0.9
docker rmi ghcr.io/jedlik-gyor/hmswebapi:1.0.9
kubectl apply -f k8s/hms-webapi.yaml

