"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
exports.rl.stdoutMuted = true;
exports.rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (exports.rl.stdoutMuted)
        exports.rl.output.write("\x1B[2K\x1B[200D" +
            exports.rl.query +
            "[" +
            (exports.rl.line.length % 2 == 1 ? "=-" : "-=") +
            "]");
    else
        exports.rl.output.write(stringToWrite);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXhCLFFBQUEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDeEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtDQUN4QixDQUFDLENBQUM7QUFFSCxVQUFFLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN0QixVQUFFLENBQUMsY0FBYyxHQUFHLFNBQVMsY0FBYyxDQUFDLGFBQXFCO0lBQzlELElBQUksVUFBRSxDQUFDLFdBQVc7UUFDZixVQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDWixrQkFBa0I7WUFDZixVQUFFLENBQUMsS0FBSztZQUNSLEdBQUc7WUFDSCxDQUFDLFVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLEdBQUcsQ0FDUixDQUFDOztRQUNBLFVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyJ9