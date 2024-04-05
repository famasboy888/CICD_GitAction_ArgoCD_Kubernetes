# This is a CI/CD Pipeline line using GitHub Actions and ArgoCD

This is a short description of the structure of GitHub Actions YAML file:

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
