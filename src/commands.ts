import fs from 'fs'
import { profile, Profile } from './parser'
import { createPassword } from './parser'
import { exec } from 'child_process' 

export function readConfigFile(filePath: string): Profile {

  if(fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  const baseConfig = JSON.stringify(profile)
  fs.writeFileSync(filePath, baseConfig)

  return profile

}

export function copy(fileName: string, fn?: (err: Error | null, ouput: string | null) => unknown ) {
  exec('clip.exe < ' + fileName, (err, stderr, stdout) => {
    if(!fn) return
    if(err || stderr) return fn(err || new Error(stderr), null)
    fn(null, stdout)
  })
}




export function grabPassword(website: string, user: string, passw: string, others: string[]) {


  const args = Object.fromEntries(
    [
      "r=",
      "--no-uppercase",
      "--no-lowercase",
      "--no-number",
      "--no-symbol",
      "l="
    ]
      .map(v => flag(v, others, keywordsReference))
      .filter(x => !!x) as []
  );



  const _profile = readConfigFile('/home/terra/Documents/system33/typescript/armav2/config.json')


  if(!_profile) throw Error("Missing profile")

  const password = createPassword(user + "@" + website, passw, {..._profile, ...args})

  return password

}


function flag(keyword: string, args: string[], keywordsReference: Reference) {
  const argValue = args.find(v => v.startsWith(keyword))?.slice(keyword.length)
  if(argValue == null) return 

  const value = parseInt(argValue) 
  return [parseKeyword(keyword, keywordsReference), isNaN(value) ? false : value]
}

const keywordsReference = {
  upperCaseLetters: "--no-uppercase",
  lowerCaseLetters: "--no-lowercase",
  numbers: "--no-number",
  symbols: "--no-symbol",
  recursionLayer: "r=", //max 940
  length: "l=",
}

type Reference = typeof keywordsReference

function parseKeyword(keyword: string, keywordsReference: Reference) {
  const result = Object.entries(keywordsReference).find(v => v[1] === keyword)
  
  return result ? result[0] : null
}

export function getLine() {

  return new Promise<string>((resolve) => {
    const standard_Input = process.stdin.setEncoding('utf-8')
    standard_Input.on('data', data => {
      resolve(data.toString());
      
    })
  })

}
