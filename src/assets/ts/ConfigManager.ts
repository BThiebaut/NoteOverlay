import { ConfigInterface } from './Interfaces/ConfigInterface';
import * as path from 'path';
const userConfigFile = "../../config.json"
import fs = require('fs');

export class ConfigManager {

  private config = <ConfigInterface>{ keySettings : "", keyToggleMouse : "" }

  constructor(){
    this.loadConfig()
  }

  private loadConfig(){
    let userConfig : ConfigInterface = fs.existsSync(userConfigFile) ? JSON.parse(fs.readFileSync(userConfigFile, { encoding: "utf8" })) : {};
    let distConfig : ConfigInterface = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../src/assets/config/config.dist.json'), { encoding: "utf8" }))

    let k: keyof ConfigInterface;
    for(k in this.config){
      this.config[k] = distConfig[k];

      if (typeof userConfig[k] !== typeof void(0)){
        this.config[k] = userConfig[k];
      }
    }
    console.log(this.config);

    fs.writeFile(userConfigFile, JSON.stringify(this.config, null, 2), err => {
      if (err !== null){
        throw 'unable to write user config file : ' + err.message;
      }
    });
  }
  
  getConfig() : ConfigInterface
  {
    return this.config;
  }

}