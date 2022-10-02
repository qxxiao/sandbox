/*
	This file stores the compiler/interpretor details that are provided to DockerSandbox.sh	by the app.js
	The index is the key field, 
	First column contains the compiler/interpretor that will be used for translation
	Second column is the file name to use when storing the source code
	Third column is optional, it contains the command to invoke the compiled program, it is used only for compilers
	Fourth column is just the language name for display on console, for verbose error messages
	Fifth column is optional, it contains additional arguments/flags for compilers
*/

var compilerArray = [
  ["'g++ -o /usercode/a.out' ", 'Main.cpp', '/usercode/a.out', 'C/C++', "'-std=c++17'"],
  ["'javac -d /usercode' ", 'Main.java', "'./usercode/javaRunner.sh'", 'Java', "'-encoding UTF-8'"],
  ['python3', 'Main.py', '', 'Python', ''],
  ["'go run'", 'Main.go', '', 'Go', ''],
  ['node', 'Main.js', '', 'JavaScript', ''],
  // ["'env HOME=/opt/rust /opt/rust/.cargo/bin/rustc'", 'file.rs', '/usercode/a.out', 'Rust', "'-o /usercode/a.out'"],
  // ['/bin/bash', 'file.sh', ' ', 'Bash', ''],
];

export default compilerArray;
