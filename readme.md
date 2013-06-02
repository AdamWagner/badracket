# 5.01

### Enhancements
- Optimized load times using DNS prefetch, lazyloading, gziping, caching, deferred parsing
- Lazy-loaded scripts sourced from CDN
- Add Mixpanel events for RSVP button click & FB login
- Check FB photos against blacklist of IDs to avoid self-referential screenshots
- New build process with grunt.js
- Javascript cache-busting
- Javascript modularization

### Bug fixes
- Fix misc. typos and rendered debug content
- Fix show date off-by-one bug in playbar
- Restrict number of albums rendered on homepage to 7