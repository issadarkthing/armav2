"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parser_1 = require("./parser");
const parser_2 = require("./parser");
const child_process_1 = require("child_process");
function readConfigFile(filePath) {
    if (fs_1.default.existsSync(filePath))
        return JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    const baseConfig = JSON.stringify(parser_1.profile);
    fs_1.default.writeFileSync(filePath, baseConfig);
    return parser_1.profile;
}
exports.readConfigFile = readConfigFile;
function copy(fileName, fn) {
    child_process_1.exec('clip.exe < ' + fileName, (err, stderr, stdout) => {
        if (!fn)
            return;
        if (err || stderr)
            return fn(err || new Error(stderr), null);
        fn(null, stdout);
    });
}
exports.copy = copy;
function grabPassword(website, user, passw, others) {
    const args = Object.fromEntries([
        "r=",
        "--no-uppercase",
        "--no-lowercase",
        "--no-number",
        "--no-symbol",
        "l="
    ]
        .map(v => flag(v, others, keywordsReference))
        .filter(x => !!x));
    const _profile = readConfigFile('./config.json');
    if (!_profile)
        throw Error("Missing profile");
    const password = parser_2.createPassword(user + "@" + website, passw, { ..._profile, ...args });
    return password;
}
exports.grabPassword = grabPassword;
function flag(keyword, args, keywordsReference) {
    var _a;
    const argValue = (_a = args.find(v => v.startsWith(keyword))) === null || _a === void 0 ? void 0 : _a.slice(keyword.length);
    if (argValue == null)
        return;
    const value = parseInt(argValue);
    return [parseKeyword(keyword, keywordsReference), isNaN(value) ? false : value];
}
const keywordsReference = {
    upperCaseLetters: "--no-uppercase",
    lowerCaseLetters: "--no-lowercase",
    numbers: "--no-number",
    symbols: "--no-symbol",
    recursionLayer: "r=",
    length: "l=",
};
function parseKeyword(keyword, keywordsReference) {
    const result = Object.entries(keywordsReference).find(v => v[1] === keyword);
    return result ? result[0] : null;
}
function getLine() {
    return new Promise((resolve) => {
        const standard_Input = process.stdin.setEncoding('utf-8');
        standard_Input.on('data', data => {
            resolve(data.toString());
        });
    });
}
exports.getLine = getLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIscUNBQTJDO0FBQzNDLHFDQUF5QztBQUN6QyxpREFBb0M7QUFFcEMsU0FBZ0IsY0FBYyxDQUFDLFFBQWdCO0lBRTdDLElBQUcsWUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUVqRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFPLENBQUMsQ0FBQTtJQUMxQyxZQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUV0QyxPQUFPLGdCQUFPLENBQUE7QUFFaEIsQ0FBQztBQVRELHdDQVNDO0FBRUQsU0FBZ0IsSUFBSSxDQUFDLFFBQWdCLEVBQUUsRUFBeUQ7SUFDOUYsb0JBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyRCxJQUFHLENBQUMsRUFBRTtZQUFFLE9BQU07UUFDZCxJQUFHLEdBQUcsSUFBSSxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNELEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDbEIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBTkQsb0JBTUM7QUFLRCxTQUFnQixZQUFZLENBQUMsT0FBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsTUFBZ0I7SUFHekYsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FDN0I7UUFDRSxJQUFJ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