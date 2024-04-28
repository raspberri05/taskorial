const { app, BrowserWindow } = require("electron");

/**
 * Function to create a new electron window
 */
function createWindow() {
  // Create a new BrowserWindow instance
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Disable node integration for security
    },
  });

  // Load URL of React app
  win.loadURL("http://localhost:3000"); // Replace with your React app URL

  // Open the DevTools (optional)
  // win.webContents.openDevTools();
}

// Create window when electron app is ready
app.whenReady().then(createWindow);

// Quit app when all windows are closed
app.on("window-all-closed", () => {
  // Quit app if platform isn't macOS
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Recreate window when app is activated and no windows are open
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
