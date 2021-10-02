import { ConfigManager } from './assets/ts/ConfigManager';
import { app, BrowserWindow, globalShortcut } from 'electron'
import { overlayWindow } from 'electron-overlay-window'
import * as path from 'path';
import fs = require('fs');
const ipc = require('electron').ipcMain;

// https://github.com/electron/electron/issues/25153
app.disableHardwareAcceleration()

let window: BrowserWindow
let config: ConfigManager
var ignoreMouseEvent = true;
var registered = false;

function createWindow () {
  window = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    ...overlayWindow.WINDOW_OPTS
  })

  window.loadFile(path.join(__dirname, '../src/views/overlay.html'));

  // NOTE: if you close Dev Tools overlay window will lose transparency 
  window.webContents.openDevTools({ mode: 'detach', activate: false })

  window.setIgnoreMouseEvents(ignoreMouseEvent)

  config = new ConfigManager();
  
  registerHooks()

  overlayWindow.attachTo(window, 'Voicemod')

  window.webContents.once('dom-ready', () => {
    window.webContents.send('config-loaded', config.getConfig());
  })

  ipc.on('toggle-mouse-events', (e:any, isVisible : boolean) => {
    window.setIgnoreMouseEvents(!isVisible);
  });
}

function toggleSettings(){
  window.webContents.send('toggle-settings', true);
}

function toggleMouse(){
  window.webContents.send('toggle-mouse', true);
}

function registerHooks () {

  if (!registered){
    let c = config.getConfig();
    globalShortcut.register(c.keySettings, toggleSettings);
    globalShortcut.register(c.keyToggleMouse, toggleMouse);

    registered = true;
  }
}

app.on('ready', createWindow)

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

overlayWindow.on('detach', () => {
  app.quit();
});

overlayWindow.on('blur', () => {
  globalShortcut.unregisterAll();
  registered = false;
});

overlayWindow.on('focus', () => {
  registerHooks();
});