The application was built on .Net Core 3.1 as a ASP .Net Core Webapp.

I chose SignalR over gRPC for RPC communication. As the app required periodic broadcasts from the Server which is supported out of the box by SignalR, it seemed to be the better choice.<br>
 

## Run/Build Instructions

### From the output folder

The server can be started by running the "StopWatchApp.exe" available in the [dist](dist) folder. Once the server is started, the web client can be launched in the browser via the url <https://localhost:5001/><br>

**Requirements:** .Net Core 3.1

### From the source code

- To build and run the source code from an IDE, necessary node packages must be installed by running the npm install command from the src directory.
```
npm install
```

- To compile typescript code and run webpack, run the following command whenever client side code is modified.
```
npm run release
```

- Start the server app in Debug or Release mode in the IDE and launch open the url <https://localhost:5001/> in the browser.

**Requirements:** .Net Core 3.1, Node + NPM