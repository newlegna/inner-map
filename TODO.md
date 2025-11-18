# TODO - Future Enhancements

## High Priority

- [ ] **Authentication improvements**
  - Add email verification
  - Add password reset functionality
  - Add OAuth providers (Google, Apple)

- [ ] **Profile editing**
  - Allow users to update their profile information
  - Add profile picture upload
  - Edit birth data and types

- [ ] **Human Design accuracy**
  - Implement real HD chart calculation using birth time and location
  - Integrate with ephemeris data
  - Show full bodygraph (centers, gates, channels)
  - Remove "mocked" disclaimer

## Medium Priority

- [ ] **Assessment tests**
  - MBTI test implementation
  - Enneagram test implementation
  - Save and display test results

- [ ] **Life Purpose Map enhancements**
  - Payment integration (Stripe)
  - Premium subscription management
  - Downloadable PDF version
  - Deeper insights based on transits and progressions

- [ ] **AI Coach improvements**
  - Persist chat history to database
  - Conversation memory across sessions
  - Export chat transcripts
  - Voice input/output option

- [ ] **Dashboard enhancements**
  - Daily insights widget
  - Transit notifications
  - Progress tracking over time
  - Journal integration

## Low Priority

- [ ] **Astrology depth**
  - Full birth chart calculation with moon and rising
  - Planetary positions and aspects
  - Transit predictions
  - Synastry (relationship compatibility)

- [ ] **Social features**
  - Share insights (privacy-controlled)
  - Community forums
  - Coach recommendations
  - Friend compatibility analysis

- [ ] **Mobile app**
  - React Native version
  - Push notifications
  - Offline mode

- [ ] **Content library**
  - Educational resources for each system
  - Video tutorials
  - Guided meditations
  - Journaling prompts

## Technical Debt

- [ ] Add comprehensive error boundaries
- [ ] Implement loading skeletons instead of simple loading text
- [ ] Add unit tests for helpers (astrology, humanDesign, lifePurpose)
- [ ] Add integration tests for API routes
- [ ] Improve mobile responsiveness
- [ ] Add analytics (privacy-friendly)
- [ ] Optimize images and assets
- [ ] Add PWA support
- [ ] Improve SEO with metadata

## Known Limitations (MVP)

- Human Design type is calculated using a simple deterministic function, not real ephemeris data
- No persistent chat history (messages are lost on page refresh)
- Premium gate is cosmetic only (no actual payment processing)
- MBTI and Enneagram tests are not implemented (user self-reports)
- No email verification on signup
- No password reset functionality
- Birth chart only calculates sun sign, not full chart
- No relationship/synastry features

## Performance Optimizations

- [ ] Implement React Server Components where applicable
- [ ] Add caching for OpenAI API responses
- [ ] Optimize database queries
- [ ] Add CDN for static assets
- [ ] Implement rate limiting on API routes

## Accessibility

- [ ] Add ARIA labels
- [ ] Keyboard navigation improvements
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus management in modals/overlays
