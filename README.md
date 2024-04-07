# End-to-End CI/CD Pipeline line using GitHub Actions and ArgoCD.

<i>Note: This is the CI part. The CD part is located in [ArgoCD States](https://github.com/famasboy888/CICD_ArgoCD_States)</i>

We are deploying a **MERN Full Stack** (ReactJs + NodeJS + Express + Mongo DB) in **Kubernetes**.

CI will be handled by **GitHub Actions**.

While, CD will be handled by **ArgoCD**.

# Flow

## Modify changes from MERN App and push to Github

<p align="left">
  <img width="80%" height="80%" src="https://github.com/famasboy888/CICD_GitAction_ArgoCD_Kubernetes/assets/23441168/a8ae8bf2-1ea5-4bea-a1bb-203f6b37469f">
</p>

## Trigger Github Actions to build and push Docker image

<p align="left">
  <img width="80%" height="80%" src="https://github.com/famasboy888/CICD_GitAction_ArgoCD_Kubernetes/assets/23441168/5a47da51-ef9a-462f-afc4-54ed61e70b94">
</p>

## YAML changes will be pushed to ArgoCD repo in GitHub.

<p align="left">
  <img width="80%" height="80%" src="https://github.com/famasboy888/CICD_GitAction_ArgoCD_Kubernetes/assets/23441168/16d8a777-33d8-4dc6-a17d-99c1a1bbf6b2">
</p>

## ArgoCD will sync and re-redeploy new changes.

<p align="left">
  <img width="80%" height="80%" src="https://github.com/famasboy888/CICD_GitAction_ArgoCD_Kubernetes/assets/23441168/8012151c-51c4-47de-9f11-076cb822db77">
</p>

<hr>

## Structure of GitHub Actions YAML file:

Note: For this to work, we need to create a `.github/workflows/<name-of-yaml>.yaml` at the root directory of repo.

```yaml
name: Github Actions for building and pushing docker

on:
  push:                                                    <== this will trigger every push on main branch
    branches:
      - main

jobs:

  build:

    runs-on: ubuntu-latest                                  <== this is the os of the Github instance

    steps:
      - uses: actions/checkout@v4                                                           <== this will git checkout inside the Github instance 

      - name: Create file after checkout
        working-directory: ./backend                                                          <== this will change directory of path
        run: |                                                                                    <== run CMD commands
          sed -i '/PORT=/c\PORT=${{ secrets.MONGO_PORT }}' .env
          sed -i '/MONGO_USER=/c\MONGO_USER=${{ secrets.MONGO_USER }}' .env
          sed -i '/MONGO_PASS=/c\MONGO_PASS=${{ secrets.MONGO_PASS }}' .env
          sed -i '/MONGO_API=/c\MONGO_API=${{ secrets.MONGO_API }}' .env
    
      - uses: docker/login-action@v3                                                  <== Login in to dockerhub (https://docker.io/)
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
    
      - uses: docker/build-push-action@v5                                            <== this will auto build and push to dockerhub
        with:
          context: ./backend                                                            <== directory of dockerfile
          push: true                                              
          tags: ${{ secrets.DOCKERHUB_USERNAME  }}/node-server:0.0.${{ github.run_number }}.RELEASE                    <== Tag of the docker image

      - name: Create file for Front-end
        working-directory: ./frontend
        run: |
          sed -i '/PORT=/c\PORT=${{ secrets.REACT_APP_PORT }}' .env

      - uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME  }}/react-app:0.0.${{ github.run_number }}.RELEASE
```

## Added working nginx.conf

```bash
upstream backend {
        server node-server-service;
}


server {
    listen 8080;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```
