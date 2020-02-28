const readline = require("readline");

export const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

rl.stdoutMuted = true;
rl._writeToOutput = function _writeToOutput(stringToWrite: string) {
   if (rl.stdoutMuted)
      rl.output.write(
         "\x1B[2K\x1B[200D" +
            rl.query +
            "[" +
            (rl.line.length % 2 == 1 ? "=-" : "-=") +
            "]"
      );
   else rl.output.write(stringToWrite);
};

