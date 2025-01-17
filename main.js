const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
const configPath = path.join(__dirname, "config.json");

function createWindow() {
    let config = {};
    let shouldShowSettings = false;

    try {
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, "utf8"));

            if (!config.server || !config.server.address || !config.server.port || !config.server.deviceId) {
                shouldShowSettings = true;
            }
        } else {
            shouldShowSettings = true;
        }
    } catch (error) {
        console.error("Config dosyası okunurken bir hata oluştu => ", error);
        shouldShowSettings = true;
    }

    const windowOptions = {
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    };

    if (config.browser) {
        windowOptions.x = config.browser.x;
        windowOptions.y = config.browser.y;
        windowOptions.width = config.browser.width;
        windowOptions.height = config.browser.height;
    } else {
        windowOptions.fullscreen = true;
    }

    mainWindow = new BrowserWindow(windowOptions);
    
    if (shouldShowSettings) {
        mainWindow.loadFile("setting.html");
    } else {
        mainWindow.loadFile("index.html");
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
