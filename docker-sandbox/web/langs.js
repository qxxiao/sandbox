var LANGS = {
  'C/C++': [0, 'text/x-c++src'],
  Java: [1, 'text/x-java'],
  Python: [2, 'text/x-python'],
  Go: [3, 'text/x-go'],
  JavaScript: [4, 'text/javascript'],
  // Bash: [5, 'text/x-bash'],
  // Rust: [6, 'text/rust'],
};

var Codes = {
  'C/C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout<<"Hello world!\\n";\n\treturn 0;\n}`,
  Java: `/* package whatever*/\n\nimport java.io.*;\n\nclass Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t\n\t\tSystem.out.println("Hello world!");\n\t}\n}`,
  Python: `print("Hello world!")`,
  Go: `package main\nimport "fmt"\n\nfunc main(){\n\tfmt.Printf("Hello world!\\n")\n}`,
  JavaScript: `console.log("Hello world!");`,
  // Bash: `echo 'Hello world!'`,
  // Rust: `fn main() {\n\tprintln!("Hello world!");\n}`,
};

export { LANGS, Codes };
