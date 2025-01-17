const fs = require("fs");
const path = require("path");

const configPath = "config.json";

document.getElementById("settingsForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const config = {
        server: {
            address: document.getElementById("serverAddress").value,
            port: parseInt(document.getElementById("serverPort").value),
            deviceId: document.getElementById("deviceId").value,
        },
        browser: {
            x: parseInt(document.getElementById("browserX").value) || 0,
            y: parseInt(document.getElementById("browserY").value) || 0,
            width: parseInt(document.getElementById("browserWidth").value) || 800,
            height: parseInt(document.getElementById("browserHeight").value) || 600,
        }
    };

    
    
    try {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        window.location.href = "index.html";
    } catch (error) {
        console.error("Config dosyası yazılırken hata:", error);
        alert("Config dosyası yazılırken hata oluştu!");
    }
});

window.addEventListener("load", () => {
    try {
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
            
            if (config.server) {
                document.getElementById("serverAddress").value = config.server.address || "";
                document.getElementById("serverPort").value = config.server.port || "";
                document.getElementById("deviceId").value = config.server.deviceId || "";
            }

            if (config.browser) {
                document.getElementById("browserX").value = config.browser.x || "";
                document.getElementById("browserY").value = config.browser.y || "";
                document.getElementById("browserWidth").value = config.browser.width || "";
                document.getElementById("browserHeight").value = config.browser.height || "";
            }
        }
    } catch (error) {
        console.error("Config dosyası okunurken bir hata oluştu:", error);
    }
});
