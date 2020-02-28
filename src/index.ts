#!/usr/bin/env node

import * as commands from "./commands";
import fs from "fs";
import { rl } from "./test";

async function main() {
   const [website, user, ...others] = process.argv.slice(2);

   if (website === "help") {
      console.log(
         "Options: --no-upperCaseLetters, --no-numbers, --no-symbols, --no-lowerCaseLetters, r=, l="
      );
      process.exit(1);
   }
   if (!website || !user) {
      console.log("Please provide argument for <website> <user>"); 
      process.exit(1)
   }

   rl.query = "[Password]: ";

   rl.question(rl.query, (password: string) => {
      const initial = Date.now();
      const passw = commands.grabPassword(website, user, password, others);
      const tempPathFile = "temp.txt"

      fs.writeFileSync(tempPathFile, passw, { encoding: "utf8" });

      commands.copy(tempPathFile, (err, ouput) => {
         fs.unlinkSync(tempPathFile);

         const final = Date.now();

         console.log("\n\nCompleted in: " + (final - initial) + "ms");
      });
      rl.close();
   });
}

main();
