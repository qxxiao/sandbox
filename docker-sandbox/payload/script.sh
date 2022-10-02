#!/bin/bash

########################################################################
#	- This is the main script that is used to compile/interpret the source code
#	- The script takes 3 arguments
#		1. The compiler that is to compile the source file.
#		2. The source file that is to be compiled/interpreted
#		3. Additional argument only needed for compilers, to execute the object code//执行命令
#	
#	- Sample execution command:   $: ./script.sh g++ file.cpp ./a.out
#	
########################################################################

compiler=$1
file=$2
output=$3
addtionalArg=$4


########################################################################
#	- The script works as follows
#	- It first stores the stdout and std err to another stream
#	- The output of the stream is then sent to respective files
#	
#	
#	- if third arguemtn is empty Branch 1 is followed. An interpretor was called
#	- else Branch2 is followed, a compiler was invoked
#	- In Branch2. We first check if the compile operation was a success (code returned 0)
#	
#	- If the return code from compile is 0 follow Branch2a and call the output command
#	- Else follow Branch2b and output error Message
#	
#	- Stderr and Stdout are restored
#	- Once the logfile is completely written, it is renamed to "completed"
#	- The purpose of creating the "completed" file is because NodeJs searches for this file 
#	- Upon finding this file, the NodeJS Api returns its content to the browser and deletes the folder
#
#	
########################################################################

exec  1> $"/usercode/logfile.txt"
exec  2> $"/usercode/errors"
# stdin: /usercode/inputFile

START=$(date +%s)
#Branch 1 解释器 python3 javascript 
if [ "$output" = "" ]; then
    $compiler /usercode/$file -< $"/usercode/inputFile"
#Branch 2
else #编译器 c++,javac (go run看作解释)
	#In case of compile errors, redirect them to a file
    $compiler /usercode/$file $addtionalArg
	#Branch 2a
	if [ $? -eq 0 ];	then
		$output -< $"/usercode/inputFile"
	#Branch 2b
	else # 编译失败
	    echo -e "\nCompilation Failed" >&2
	    #if compilation fails, display the output file	
	    #cat /usercode/errors.txt
	fi
fi

END=$(date +%s)
runtime=$(expr $END - $START)


echo -n "*-COMPILEBOX::ENDOFOUTPUT-*" $runtime

mv /usercode/logfile.txt /usercode/completed
