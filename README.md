## simple-docker-sandbox

CompileBox is a Docker based sandbox to run untrusted code and return the output to your app. Users can submit their code in any of the supported languages. The system will test the code in an isolated environment.

## Use
1. use pre-built docker image   

if don't install docker, just run:  
```shell
./install.sh
```

or you can pull this image:  
```shell
docker pull qxxiao/compile-sandbox:latest
```

2. run example  

```shell
cd  docker-sandbox
npm install && node app.js
```
If everything has been setup correctly in app.js file, you will see the following message on your terminal: 
```
Listening at 8080
```
- navigate your browser to [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 
- Try: [Js demo](http://124.221.39.29:9000/)

## Modify & Notes

you can add your language env in setup/Dockfile, and rebuild your image.

### notes
1. docker-sandbox
```
docker-sandbox/payload --- run scripts
docker-sandbox/temp    --- temp compile/run working-dir
other-files            --- js demo 
```

2. compilers.js
you must define a compilerArray in your app, and it will be use for compiling source code and run.

### credits
[https://github.com/remoteinterview/compilebox](https://github.com/remoteinterview/compilebox)
