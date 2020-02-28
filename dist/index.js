#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands = __importStar(require("./commands"));
const fs_1 = __importDefault(require("fs"));
const test_1 = require("./test");
async function main() {
    const [website, user, ...others] = process.argv.slice(2);
    if (website === "help") {
        console.log("Options: --no-upperCaseLetters, --no-numbers, --no-symbols, --no-lowerCaseLetters, r=, l=");
        process.exit(1);
    }
    if (!website || !user) {
        console.log("Please provide argument for <website> <user>");
        process.exit(1);
    }
    test_1.rl.query = "[Password]: ";
    test_1.rl.question(test_1.rl.query, (password) => {
        const initial = Date.now();
        const passw = commands.grabPassword(website, user, password, others);
        const tempPathFile = "temp.txt";
        fs_1.default.writeFileSync(tempPathFile, passw, { encoding: "utf8" });
        commands.copy(tempPathFile, (err, ouput) => {
            fs_1.default.unlinkSync(tempPathFile);
            const final = Date.now();
            console.log("\n\nCompleted in: " + (final - initial) + "ms");
        });
        test_1.rl.close();
    });
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLHFEQUF1QztBQUN2Qyw0Q0FBb0I7QUFDcEIsaUNBQTRCO0FBRTVCLEtBQUssVUFBVSxJQUFJO0lBQ2hCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekQsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQ1IsMkZBQTJGLENBQzdGLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNqQjtJQUVELFNBQUUsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO0lBRTFCLFNBQUUsQ0FBQyxRQUFRLENBQUMsU0FBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQWdCLEVBQUUsRUFBRTtRQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRSxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUE7UUFFL0IsWUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFNUQsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNILFNBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELElBQUksRUFBRSxDQUFDIn0=