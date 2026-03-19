# WHOIS Lookup

Look up domain registration data including registrar, creation/expiry dates, name servers, and DNSSEC status, with raw WHOIS output, entirely from the browser.

**Live Demo:** https://file-converter-free.com/en/network-tools/whois-lookup-online

## How It Works

The domain input is normalized by stripping `https?://` and any path component. The request calls `https://api.file-converter-free.com/api/whois?domain=...` via `fetch`. Ten standard WHOIS fields are displayed when present: domain name, registrar, creation date, expiration date, updated date, status, name servers, DNSSEC, registrant, and registrant country. Array-valued fields (such as `name_servers` and `status`) are joined with `, ` for compact display. If a `raw` field is present in the response, the complete raw WHOIS text is rendered in a scrollable `<pre>` block with a maximum height of 300px.

## Features

- Domain normalization: strips protocol and path
- 10 structured WHOIS fields displayed when available
- Array fields joined with `, ` (name servers, status)
- Raw WHOIS output in scrollable `<pre>` block (max-height 300px)
- Enter key shortcut

## Browser APIs Used

- Fetch API

## Code Structure

| File | Description |
|------|-------------|
| `whois-lookup.js` | Domain normalization, `fetch` to `/api/whois`, 10-field renderer with `Array.join`, raw `data.raw` in scrollable `<pre>` |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#whoisDomain` | Domain input |
| `#whoisLookup` | Lookup button |
| `#whoisResults` | Results container |
| `#whoisLoading` | Loading indicator |
| `#whoisData` | Rendered WHOIS fields and raw output |

## License

MIT
