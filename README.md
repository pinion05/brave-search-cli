# bsearch - Brave Search CLI

A simple command-line tool for performing web searches using the Brave Search API from your terminal.

## Features

- Fast web searches directly from your terminal
- Clean, text-based output (10 results per search)
- Minimal dependencies (only `commander`)
- Easy to install and use

## Prerequisites

- Node.js 20 or higher
- pnpm package manager
- Brave Search API key ([Get one here](https://api.search.brave.com/app/keys))

## Installation

1. Clone or navigate to the project directory:
```bash
cd ~/dev/brave-search-cli
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your Brave Search API key as an environment variable:
```bash
export BRAVE_API_KEY="your-api-key-here"
```

For convenience, add this to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):
```bash
echo 'export BRAVE_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

4. Link the CLI globally:
```bash
pnpm link --global
```

## Usage

### Basic Search

```bash
bsearch <search-query>
```

### Examples

Search for web development topics:
```bash
bsearch JavaScript async await
```

Search with quotes for exact phrases:
```bash
bsearch "climate change solutions"
```

Search for technical documentation:
```bash
bsearch Node.js streams API
```

## Output Format

Results are displayed as a simple list with:
- **Title**: The webpage title
- **URL**: Direct link to the webpage
- **Description**: Brief summary of the page content

Example output:
```
Searching for: "Node.js documentation"

1. Node.js Documentation
   https://nodejs.org/docs
   Official Node.js documentation with API references, guides, and examples.

2. Node.js Tutorial - W3Schools
   https://www.w3schools.com/nodejs/
   Learn Node.js from basics to advanced concepts with interactive examples.

...
```

## API Key

You need a valid Brave Search API key to use this tool. Visit [Brave Search API](https://api.search.brave.com/app/keys) to:
1. Sign up for a free account
2. Generate your API key
3. Copy the key and set it as the `BRAVE_API_KEY` environment variable

## Troubleshooting

**"API key not found" error**
- Make sure you've set the `BRAVE_API_KEY` environment variable
- Check that the key is correctly exported in your current shell session

**"No results found"**
- Try a different search query
- Check your internet connection

**Command not found**
- Make sure you've run `pnpm link --global`
- Check that `~/.npm-global/bin` is in your PATH

## Development

Project structure:
```
brave-search-cli/
├── index.js       # Main CLI application
├── package.json   # Project configuration
├── README.md      # This file
└── .git/          # Git repository
```

## License

MIT License - feel free to use and modify as needed.

## Version

0.1.0
