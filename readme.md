
![SPIGET Logo](https://spiget.org/img/logo-plain-x64.png)

# SPIGET API
![NPM VERSION](https://img.shields.io/npm/v/spiget-api?style=flat)
![DOWNLOADS](https://img.shields.io/npm/dm/spiget-api.svg?style=flat)
![LICENSE](https://img.shields.io/npm/l/spiget-api)
![BUILD](https://img.shields.io/github/workflow/status/VeguiDev/spiget-api/Node.js%20CI)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3476d11695cf45b38da2c7f556205df3)](https://www.codacy.com/gh/VeguiDev/spiget-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=VeguiDev/spiget-api&amp;utm_campaign=Badge_Grade)

*This library allows you to obtain version information of PaperMC projects and also generate download links.*

**Table of Contents:**

- [Quickstart](#quickstart)
- [Documentation](#documentation)

## Quickstart

Installing the client librery
```
npm install papermc-api
```

## Documentation

**PaperAPI.projects()**

List all PaperMC projects.
```ts
let projects = await PaperAPI.projects(); // Returns array with all PaperMc projects.
```

**PaperAPI.project(project_id)**

Get the information of a PaperMC project.
`project_id`: must be *waterfall*/*velocity*/*paper*.
```ts
let project = await PaperAPI.project("waterfall"); // Returns project info
```

**PaperAPI.project(project_id).getVersion(version)**

Get a version of a PaperMC project.

`version`: Must be a Minecraft Version. *Example: 1.19.2*
```ts
let project = await PaperAPI.project("waterfall"); // Returns project info

let version = await project.getVersion("1.19.2"); // Returns version info
```

**PaperAPI.project(project_id).getVersion(version).getBuild(build_number)**

Get the build information of a version of the PaperMC project

`build_number`: Must be a valid build number or latest. *Example: 568 or latest*
```ts
let project = await PaperAPI.project("waterfall"); // Returns project info

let version = await project.getVersion("1.19.2"); // Returns version info

let build = await version.getBuild("latest"); // Returns Build info
```

**PaperAPI.project(project_id).getVersion(version).getBuild(build_number).getDownloadUrl(download)**

Generates a link to download the specified file.

`download` *optional*: Specifies the file from which you want the link, in case you do not specify this parameter, the file will be downloaded *applicaiton*.

```ts
let project = await PaperAPI.project("waterfall"); // Returns project info

let version = await project.getVersion("1.19.2"); // Returns version info

let build = await version.getBuild("latest"); // Returns Build info

let downloadUrl = build.getDownloadUrl(); // Returns download URL for in this case waterfall 1.19.2
```

