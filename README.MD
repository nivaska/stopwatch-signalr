A simple SignalR based Stopwatch Timer built on ASP .Net Core.<br>

## Run/Build Instructions

### From the output folder

**Requirements:** .Net Core 3.1

The server can be started by running the "StopWatchApp.exe" available in the [dist](dist) folder. Once the server is started, the web client can be launched in the browser via the url <https://localhost:5001/><br>

### From the source code

**Requirements:** .Net Core 3.1, Node + NPM

- To build and run the source code from an IDE, necessary node packages must be installed by running the npm install command from the src directory.
```
npm install
```

- To compile typescript code and run webpack, run the following command whenever client side code is modified.
```
npm run release
```

- Start the server app in Debug or Release mode in the IDE and launch open the url <https://localhost:5001/> in the browser.

