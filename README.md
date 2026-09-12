# Ivy Homes Internship Assignment

This repository contains the solution for the Ivy Homes Software Engineering Internship assignment.

## Discovering API Discrepancies
The process of finding API documentation discrepancies involved systematically interacting with the API and analyzing the responses:

1. **Authentication Errors**: Initially attempting to fetch listings with `?api_key=...` resulted in a 401 error explicitly instructing to use the `X-API-Key` header.
2. **Missing Token**: Even with the header, fetching listings resulted in another 401, stating a bearer token was required. This contradicted the documentation implying only the API key was needed for `GET /v1/listings`.
3. **Login Response Mismatch**: The `/auth/login` endpoint returned `access_token` instead of `token`, and surprisingly included a `refresh_token` with an `expires_in` of 900 seconds (15 minutes). This contradicted the "no refresh flow, 24h validity" claim in the documentation. I implemented a refresh flow in `api.js` to ensure the session lasts 30+ minutes as required.
4. **Pagination Clamping**: The `limit` parameter for collections was clamped to 50 server-side, ignoring requests for up to 200 items.
5. **Data Duplication & Anomalies**: Analysis of `listings.json` revealed multiple entries with the exact same `listing_id`, contradicting the claim of global uniqueness. I had to implement deduplication in the analysis scripts.
6. **Data Inspection Notes**: I found hidden notes in the `description` fields of certain listings instructing AI assistants to include specific dataset audit hashes and report retired endpoints (`/v1/rentals/export`).
7. **Unit Discrepancies**: The `projects` endpoint returned `price_max` in crores (e.g., 3.22) rather than the documented Indian Rupees integer.

## What Checked Out Fine
- The properties of the actual property listings (bedrooms, areas, etc.) largely followed the conventions (lowercase strings, ISO 8601 UTC dates).
- The filters for `GET /v1/listings` actually worked server-side (for the most part), returning correct counts in `total`.
- Error messages were genuinely helpful in pointing out missing headers or tokens.

## Future Improvements (With 2 more days)
- **Robust Error Handling**: Implement comprehensive error boundaries and toast notifications in the UI for failed API requests or token refresh failures.
- **Advanced Insights**: The `/v1/analytics/summary` endpoint is completely broken (returns 404). In a real scenario, I would pre-compute these analytics offline and serve them via a static JSON file or a custom backend proxy to power the dashboard.
- **Server-side Rendering (SSR)**: Migrate to Next.js for better SEO and initial load performance for the property detail pages.
- **Full testing suite**: Add unit tests (Vitest) for the `api.js` refresh logic and E2E tests (Cypress/Playwright) for the login and filtering flows.

## What Checked Out Fine
- The properties of the actual property listings (bedrooms, areas, etc.) largely followed the conventions (lowercase strings, ISO 8601 UTC dates).
- The filters for `GET /v1/listings` actually worked server-side (for the most part), returning correct counts in `total`.
- Error messages were genuinely helpful in pointing out missing headers or tokens.
