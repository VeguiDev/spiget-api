
![SPIGET Logo](https://spiget.org/img/logo-plain-x64.png)

# Spiget API Client (Spigot API)
![NPM VERSION](https://img.shields.io/npm/v/spiget-api?style=flat)
![DOWNLOADS](https://img.shields.io/npm/dm/spiget-api.svg?style=flat)
![LICENSE](https://img.shields.io/npm/l/spiget-api)
![BUILD](https://img.shields.io/github/workflow/status/VeguiDev/spiget-api/Node.js%20CI)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3476d11695cf45b38da2c7f556205df3)](https://www.codacy.com/gh/VeguiDev/spiget-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=VeguiDev/spiget-api&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/3476d11695cf45b38da2c7f556205df3)](https://www.codacy.com/gh/VeguiDev/spiget-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=VeguiDev/spiget-api&utm_campaign=Badge_Coverage)

This library allows you to interact with the Spigot API (Spiget), to obtain authors, categories and resources (Plugins).

**Table of Contents:**

- [Documentation](https://github.com/VeguiDev/spiget-api/wiki)
- [Contributing](#contributing)

## Quickstart

Installing the client librery...

```bash
npm install spiget-api
```

Import the library...

```js
import SpigetAPI from 'spiget-api';
// or
const SpigetAPI = require('spiget-api');

// Instance this

const api = new SpigetAPI("agent_name");
```

Or if you using in the browser

```html
<script src="https://unpkg.org/spiget-api@latest/dist/spiget-api.umd.min.js"></script>

<script>
    let api = new spigetapi("agent_name"); // To instance
</script>
```

Get array of resources...

```js
let resources = await api.getResources();
```
## Contributing

To contribute this is the [repository](https://github.com/VeguiDev/spiget-api) of this package.