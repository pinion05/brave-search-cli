#!/usr/bin/env node

/**
 * Test script to verify URL encoding for Korean and special characters
 */

// Test the encoding behavior
function testEncoding() {
  const testCases = [
    { query: '한글 테스트', description: 'Korean characters' },
    { query: 'Hello World', description: 'English with space' },
    { query: 'Café & Restaurant', description: 'Special characters with accent' },
    { query: 'test@example.com', description: 'Email-like query' },
    { query: 'price < $100', description: 'HTML special characters' },
    { query: '자바스크립트', description: 'Korean word' },
    { query: '"quoted string"', description: 'Quoted text' },
  ];

  console.log('Testing URL encoding with URLSearchParams:\n');

  testCases.forEach(({ query, description }) => {
    const apiUrl = new URL('https://api.search.brave.com/res/v1/web/search');
    apiUrl.searchParams.append('q', query);

    console.log(`Test: ${description}`);
    console.log(`  Input:  "${query}"`);
    console.log(`  Encoded: ${apiUrl.searchParams.get('q')}`);
    console.log(`  Full URL segment: ${apiUrl.search}`);
    console.log();
  });
}

testEncoding();
