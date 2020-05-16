# Realtime applications with .NET Core SignalR | Coding Live #004

## Getting Started

These instructions is a part of a live coding video.

### Prerequisites

.NET Core 3.1 SDK - https://dotnet.microsoft.com/download

## Example project

Create a base folder `CodingLive004`.

Create the .gitignore file based on file https://github.com/github/gitignore/blob/master/VisualStudio.gitignore

### SignalR backend

```bash
dotnet new webapi --name MyRealTimeBackend
```

### Add package for SignalR

```bash
dotnet add package Microsoft.AspNetCore.SignalR --version 1.1.0
```

### Realtime Chat App - Vanilla JS Frontend

```
npm init -y
npm install @microsoft/signalr
cp node_modules\@microsoft\signalr\dist\browser\signalr.min.js wwwroot
```
