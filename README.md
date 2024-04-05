# This is a MERN Stack deployed on Kubernetes Clusted

Web Application consists of the following tools: `ReactJs` + `NodeJs` + `Express` + `Mongo DB`


## Debugging Pods

`kubectl run curl --image=curlimages/curl -i --tty -- sh`

or go inside the shell

`kubectl exec <pod-name> -i --tty -- sh`
