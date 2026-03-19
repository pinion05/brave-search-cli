# bsearch - Brave Search CLI

A simple command-line tool for performing web searches using the Brave Search API from your terminal.

## Features

- Fast web searches directly from your terminal
- Clean, text-based output (10 results per search)
- Minimal dependencies (only `commander`)
- Works with `npx` - no global install needed

## Prerequisites

- Node.js 20 or higher
- Brave Search API key ([Get one here](https://api.search.brave.com/app/keys))

## Installation

```bash
npm install -g bsearch-cli
```

Or use directly with npx (no installation required):

```bash
npx bsearch-cli "your search query"
```

## Setup

Set your Brave Search API key as an environment variable:

```bash
export BRAVE_API_KEY="your-api-key-here"
```

Add to your shell profile (`~/.zshrc` or `~/.bashrc`) for persistence:

```bash
echo 'export BRAVE_API_KEY="your-api-key-here"' >> ~/.zshrc
```

## Usage

```bash
# Basic search
bsearch "hello world"

# Korean and special characters supported
bsearch "대한민국 날씨"

# Show help
bsearch

# Show version
bsearch --version
```

## Output Format

```
Found 10 results for "hello world":

1. "Hello, World!" program - Wikipedia
   https://en.wikipedia.org/wiki/%22Hello,_World!%22_program
   A "Hello, World!" program is usually a simple computer program...

2. Hello World
   https://code.org/helloworld
   Hello World is a great starting point...
...
```

## Error Handling

- **Missing API key**: Exits with code 1
- **API errors (401, 429, etc.)**: Outputs error message to stderr, exits with code 1
- **No results**: Displays "No search results found"

## Troubleshooting

**"API key not found"**
- Make sure `BRAVE_API_KEY` environment variable is set
- Check that the key is correctly exported in your current shell session

**"No results found"**
- Try a different search query
- Check your internet connection

## License

MIT

## Version

0.1.0
