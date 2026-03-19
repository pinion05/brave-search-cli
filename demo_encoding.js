#!/usr/bin/env node

/**
 * Demonstration of URL encoding in bsearch CLI
 *
 * This script shows how Korean characters and special characters
 * are automatically encoded when making API requests.
 */

console.log('=== URL Encoding Demonstration for bsearch CLI ===\n');

// Show how the API URL is constructed with different query types
const testQueries = [
  { query: '한글', type: 'Korean' },
  { query: 'Node.js tutorial', type: 'English' },
  { query: 'price < $100 & discount', type: 'Special chars' },
  { query: 'Café résumé', type: 'Accented chars' },
  { query: '자바스크립트 프로그래밍', type: 'Korean phrase' },
];

testQueries.forEach(({ query, type }) => {
  const apiUrl = new URL('https://api.search.brave.com/res/v1/web/search');
  apiUrl.searchParams.append('q', query);
  apiUrl.searchParams.append('count', '10');

  console.log(`${type}: "${query}"`);
  console.log(`  → Encoded URL parameter: q=${apiUrl.searchParams.get('q')}`);
  console.log(`  → Full query string: ${apiUrl.search}`);
  console.log();
});

console.log('✓ The URLSearchParams API automatically handles all encoding');
console.log('  No manual encoding required in the code!\n');
