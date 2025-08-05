TritonExtensionEnabler
======================

A Google Chrome Extension for the game [Neptune's Pride](https://np.ironhelmet.com/#landing) (formerly Triton). 

# Features

- Open Neptune's Pride with one Click
- Take-Screenshots and sharing over Dropbox by hitting `P` 

# Development

This project is written in TypeScript and requires a build step to generate the loadable extension.

## Prerequisites

- Node.js and npm

## Setup

```bash
npm install
```

## Building

To build the extension for distribution:

```bash
npm run build
```

This will:
1. Clean the `dist/` directory
2. Compile TypeScript files from `src/` to `dist/js/`
3. Copy all static assets (CSS, images, HTML, manifest) to `dist/`

The `dist/` directory contains the complete extension ready to be loaded in Chrome.

## Development Workflow

For development with auto-recompilation:

```bash
npm run watch
```

To clean build artifacts:

```bash
npm run clean
```

## Loading the Extension

1. Run `npm run build` to create the `dist/` directory
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist/` directory

 
