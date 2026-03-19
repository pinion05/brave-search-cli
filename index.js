#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('bsearch')
  .description('CLI tool for performing web searches using Brave Search API')
  .version('0.1.0');

program
  .argument('<query>', 'search query string')
  .description('Perform a web search using Brave Search API')
  .action(async (query) => {
    try {
      await performSearch(query);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Show help and version info if no arguments provided
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`bsearch v${program.version()}\n`);
  program.outputHelp();
  process.exit(0);
}

// Parse arguments
program.parse();

/**
 * Perform a web search using Brave Search API
 * @param {string} query - The search query string
 */
async function performSearch(query) {
  // Get API key from environment variable
  const apiKey = process.env.BRAVE_API_KEY;

  if (!apiKey) {
    throw new Error('BRAVE_API_KEY environment variable is not set');
  }

  // Build API request URL
  // URLSearchParams automatically handles URL encoding for Korean characters,
  // special characters, spaces, and other non-ASCII characters
  const apiUrl = new URL('https://api.search.brave.com/res/v1/web/search');
  apiUrl.searchParams.append('q', query);
  apiUrl.searchParams.append('count', '10');

  // Make API request
  let response;
  try {
    response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'X-Subscription-Token': apiKey,
        'Accept': 'application/json'
      }
    });
  } catch (networkError) {
    // Handle network errors (connection refused, timeout, DNS failure, etc.)
    throw new Error(`Network error: Unable to connect to Brave Search API. ${networkError.message}`);
  }

  // Handle API errors
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your BRAVE_API_KEY environment variable.');
    } else if (response.status === 422) {
      throw new Error('Invalid request. Please check your API key format.');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (response.status === 500) {
      throw new Error('Brave Search API server error. Please try again later.');
    } else if (response.status === 503) {
      throw new Error('Brave Search API is temporarily unavailable. Please try again later.');
    } else {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
  }

  // Parse JSON response
  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error('Failed to parse API response. The server may be experiencing issues.');
  }

  // Handle empty results
  if (!data.web?.results || data.web.results.length === 0) {
    console.log('No search results found');
    return;
  }

  // Display results
  const results = data.web.results;
  console.log(`Found ${results.length} results for "${query}":\n`);

  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.title}`);
    console.log(`   ${result.url}`);
    if (result.description) {
      console.log(`   ${result.description}`);
    }
    console.log();
  });
}
