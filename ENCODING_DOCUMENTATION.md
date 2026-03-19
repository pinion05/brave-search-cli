# Query Encoding in bsearch CLI

## Summary

The bsearch CLI automatically handles URL encoding for all query types, including:
- Korean characters (한글, 자바스크립트, etc.)
- Special characters (@, <, >, &, $, #, etc.)
- Spaces (converted to +)
- Accented characters (é, ü, ñ, etc.)
- Unicode characters from any language
- Quotes and punctuation

## How It Works

The encoding is handled automatically by the native `URLSearchParams` API:

```javascript
// From index.js, line 47
const apiUrl = new URL('https://api.search.brave.com/res/v1/web/search');
apiUrl.searchParams.append('q', query);  // ← Automatic encoding happens here!
```

The `URLSearchParams.append()` method automatically:
1. Detects the character encoding of the input string
2. Applies proper URL encoding (percent-encoding) for all non-ASCII and reserved characters
3. Preserves the original Unicode string internally for correct decoding by the API

## Examples

### Korean Characters
```
Input:  "한글 테스트"
Output: ?q=%ED%95%9C%EA%B8%80+%ED%85%8C%EC%8A%A4%ED%8A%B8
```

### Special Characters
```
Input:  "test@example.com"
Output: ?q=test%40example.com

Input:  "price < $100"
Output: ?q=price+%3C+%24100
```

### Accented Characters
```
Input:  "Café & Restaurant"
Output: ?q=Caf%C3%A9+%26+Restaurant
```

### Mixed Content
```
Input:  "자바스크립트 <script>"
Output: ?q=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8+%3Cscript%3E
```

## Testing

Run the encoding test to verify the implementation:
```bash
node test_query_encoding.test.js
```

Run the demonstration to see encoding in action:
```bash
node demo_encoding.js
```

## Technical Details

- **Encoding Standard**: RFC 3986 (percent-encoding)
- **Character Encoding**: UTF-8
- **API Used**: Native `URLSearchParams` (Node.js URL module)
- **No External Dependencies**: Built-in Node.js functionality

## Why No Manual Encoding?

The `URLSearchParams` API is specifically designed for this use case and:
- Handles edge cases correctly
- Maintains proper UTF-8 encoding
- Works consistently across platforms
- Is maintained by Node.js core team
- Requires zero additional code

Manual encoding using `encodeURIComponent()` would work but is redundant when using `URLSearchParams`, which already handles this internally.

## Verification

To verify encoding is working correctly, the bsearch CLI will:
1. Accept any Unicode string as input
2. Properly encode it for the API request
3. The Brave Search API will decode it correctly
4. Search results will match the original query

No manual encoding or decoding is needed at any point in the process.
