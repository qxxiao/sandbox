/**
 * @Constructor
 * @variable DockerSandbox
 * @description This constructor stores all the arguments needed to prepare and execute a Docker Sandbox
 * @param {Number} timeout_value: The Time_out limit for code execution in Docker
 * @param {String} path: The current working directory where the current API folder is kept
 * @param {String} folder: The name of the folder that would be mounted/shared with Docker container, this will be concatenated with path
 * @param {String} vm_name: The TAG of the Docker VM that we wish to execute
 * @param {String} compiler_name: The compiler/interpretor to use for carrying out the translation
 * @param {String} file_name: The file_name to which source code will be written
 * @param {String} code: The actual code
 * @param {String} output_command: Used in case of compilers only, to execute the object code, send " " in case of interpretors
 */

import { execSync, exec } from 'child_process';
import fs from 'fs';

export default class DockerSandbox {
  constructor(
    timeout_value,
    path,
    folder,
    vm_name,
    compiler_name,
    file_name,
    code,
    output_command,
    languageName,
    additional_flags,
    stdin_data
  ) {
    this.timeout_value = timeout_value;
    this.path = path;
    this.folder = folder;
    this.vm_name = vm_name;
    this.compiler_name = compiler_name;
    this.file_name = file_name;
    this.code = code;
    this.output_command = output_command;
    this.languageName = languageName;
    this.additional_flags = additional_flags;
    this.stdin_data = stdin_data;
  }

  /**
   * @function
   * @name DockerSandbox.run
   * @description Function that first prepares the Docker environment and then executes the Docker sandbox
   * @param {Function pointer} success(data, time, error): Callback function to be called on success
   */
  run(success) {
    // prepare the Docker environment
    const isOk = this.prepare();
    // if preparation was successful, execute the Docker sandbox
    if (isOk) {
      this.execute(success);
    }
  }

  prepare() {
    try {
      fs.mkdirSync(this.path + this.folder, { mod: 0o666 });
      fs.copyFileSync(this.path + 'payload/script.sh', this.path + this.folder + '/script.sh', fs.constants.COPYFILE_EXCL);
      fs.chmodSync(this.path + this.folder + '/script.sh', 0o777);
      fs.copyFileSync(
        this.path + 'payload/javaRunner.sh',
        this.path + this.folder + '/javaRunner.sh',
        fs.constants.COPYFILE_EXCL
      );
      fs.chmodSync(this.path + this.folder + '/javaRunner.sh', 0o777);
      fs.writeFileSync(this.path + this.folder + '/' + this.file_name, this.code, {
        encoding: 'utf8',
        mod: 0o666,
      });
      console.log(this.languageName + ' file was saved!');
      fs.writeFileSync(this.path + this.folder + '/inputFile', this.stdin_data, {
        encoding: 'utf8',
        mod: 0o666,
      });
      console.log('Input file was saved!');
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  execute(success) {
    var myC = 0; //variable to enforce the timeout_value

    // execute statement
    var st =
      this.path +
      'DockerTimeout.sh ' +
      this.timeout_value +
      's ' +
      '-v "' +
      this.path +
      this.folder +
      '":/usercode ' +
      this.vm_name +
      ' /usercode/script.sh ' +
      this.compiler_name +
      ' ' +
      this.file_name +
      ' ' +
      this.output_command +
      ' ' +
      this.additional_flags;

    exec(st);
    // check if the execution was successful
    let intid = setInterval(() => {
      myC++;
      if (myC <= (this.timeout_value * 1000) / 500) {
        try {
          let data = fs.readFileSync(this.path + this.folder + '/completed', 'utf8');
          let error = fs.readFileSync(this.path + this.folder + '/errors', 'utf8');
          console.log('[' + this.languageName + '] Data:\n' + data);
          console.log('[' + this.languageName+ '] Error:\n' + error);
          let lines = data.toString().split('*-COMPILEBOX::ENDOFOUTPUT-*');
          data = lines[0];
          let time = lines[1];
          clearInterval(intid);
          execSync('rm -r ' + this.folder);
          success(data, time, error);
        } catch (err) {
          // console.log(err.code);
          return;
        }
        return;
      }
      // timeout
      console.log('Timeout');
      clearInterval(intid);
      //now remove the temporary directory
      execSync('rm -r ' + this.folder);
      success('', this.timeout_value, 'Timeout');
    }, 500);
  }
}
