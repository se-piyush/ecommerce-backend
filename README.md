# ecommerce-backend

This is a tiny microservices architecture project where we are using Helm charts to deploy a small collection of Node.js-coded services that are containerized in Docker on Minikube.

## Pre-requisites

- Kubernetes cli
- helm
- Docker
- minikube

## Some points to keep in mind while deploying on local

- Write now we need to create the images on local before deploying the helm charts, so have to go to each repository and run

```bash
  docker build -t <servicename>-service .
```

make sure that the service name matches the one listed in values.yaml file in helm charts

- Before creating the docker build we have to re-use the docker-daemon inside minikube instance, for example incase of powershell, run

```bash
  minikube docker-env
```

and follow the instructions mentioned there.

- We need to add ingress addon to minikube, so that ingress can work on local deployment

```bash
  minikube addons enable ingress
```

- We need start the minikube with atleas 4 CPUs as the rabbitmq is alos deployed on minikube which requires lots of resources.

```bash
  minikube start --cpus=4 --memory 7000
```

- While calling the apis makes sure that minikube tunnel is open in seperate terminal.

```bash
  minikube tunnel
```

##Deployment

- Go to the helm-charts repo and execute following command

```bash
  helm install ecommerce ./ecommerce/
```

## Breif description about architecture

There are mainly 4 services `order-service`,`integration-service`,`product-service`,`user-service`

- **user-service**: This service is responsible for the user registeration/login and user authentication so when any other three services receives request from client side they first authenticate that user using user-service endpoint `/internal/verify` which is not exposed publicly. This services uses postgresDB data to store the information.

- **product-service**: This service is responsible to maintain details about a product and uses mongoDB, this service has also exposed private api `/internal/product/:productId/quanity` which is used by `integration-service` to commit the quantity after successfull payment.

- **order-service**: This service has majorly 2 responsibilities 1. To create order, 2. To update the order status depending upon the various scenarios
  Right now it pushes the order status to rabbitmq so that `integration-service` service could update the status of quantity and orderstatus itself if the payment is successfull (payment service not implemeted yet.)

- **inventegration-service**: This is service right now subscribe to rabbitmq and processes the orderstatus Events and updates the quantity using the `product-service` service api along with the updating the orderstatus using `order-service` service api.

## APIs

The API's collection have been included in the repo inside `api-collection`.
