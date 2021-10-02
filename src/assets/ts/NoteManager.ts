import { ConfigManager } from './ConfigManager';
import { NoteInterface } from "./Interfaces/NoteInterface";


export class NoteManager {

  notes : NoteInterface[]

  constructor(config : ConfigManager) {
    this.notes = [<NoteInterface>{}];
  }

}