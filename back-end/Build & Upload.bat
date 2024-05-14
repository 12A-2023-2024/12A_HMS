docker build . --file Dockerfile -t ghcr.io/jedlik-gyor/hmswebapi:1.0.22
docker push ghcr.io/jedlik-gyor/hmswebapi:1.0.22
docker rmi ghcr.io/jedlik-gyor/hmswebapi:1.0.22
kubectl apply -f k8s/hms-webapi.yaml

