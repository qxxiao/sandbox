#!/bin/bash

#######################################################################################
# Java sourcefile can cantain public Main class or no public class
# If the class contains the main function run the java command to run it and exit
# This script only executes the first main function it finds
#######################################################################################


#The folder which we mount on docker is named the usercode.
#Move into the directory and execute the loop
cd /usercode/

# for classfile in *.class; do
for classfile in $(find . -name "*.class"); do
    # 去除后缀.class和前缀./
    classname=${classfile%.*}
    [[ $classname =~ ^\./.* ]] && classname=${classname:2}
    # echo $classname 

    #Execute fgrep with -q option to not display anything
    if javap -public $classname | fgrep -q 'public static void main(java.lang.String[])'; then
        java -cp . $classname "$@"
        exit 0;
    fi
done