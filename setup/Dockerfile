############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM ubuntu:focal

# Update the repository sources list
RUN echo "deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y --allow-downgrades libsystemd0=245.4-4ubuntu3 networkd-dispatcher systemd policykit-1 packagekit software-properties-common
#Install all the languages/compilers we are supporting.
RUN apt-get remove -y gcc g++
RUN add-apt-repository -y ppa:ubuntu-toolchain-r/test
RUN apt update
RUN apt install -y --allow-downgrades gcc-11 libstdc++-11-dev libc6=2.31-0ubuntu9 g++-11
RUN ln -s /usr/bin/gcc-11 /usr/bin/gcc
RUN ln -s /usr/bin/g++-11 /usr/bin/g++
RUN  apt-get install -y python3

RUN  apt-get install -y golang-go	
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN  npm install -g underscore request express jade shelljs passport http sys jquery lodash async mocha moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever debug && export NODE_PATH=/usr/local/lib/node_modules/

# java8
RUN apt-get install -y openjdk-8-jdk

# rust
# RUN mkdir -p /opt/rust && \
#     curl https://sh.rustup.rs -sSf | HOME=/opt/rust sh -s -- --no-modify-path -y && \
#     chmod -R 777 /opt/rust
