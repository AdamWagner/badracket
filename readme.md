# 5.02 - 6/3/13
### Bug fixes
- Remove layout flash on interior pages

### Enhancements
- 'Free Show' button & price metadata layout
- Modulzarize video tasks: get, set, ui, render


# 5.01 - 6/2/13

### Bug fixes
- Fix misc. typos and rendered debug content
- Fix show date off-by-one bug in playbar
- Restrict number of albums rendered on homepage to 7

### Enhancements
- Add Mixpanel events for RSVP button click & FB login
- Check FB photos against blacklist of IDs to avoid self-referential screenshots
- Page templates for tag, category, author archives
- 404 page template
- Javascript cache-busting

### Optimization
- Optimized load times using DNS prefetch, lazyloading, gziping, caching, deferred parsing
- Lazy-loaded scripts are sourced from CDN


### Worfklow
- New build process with grunt.js
- JShint
- Javascript modularization