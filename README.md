# Contest voting system

A system for capturing votes.
Initially used for designating the 2016 Junior Violinist Finalist people's award.

## Routes

### Basic
#### Vote for a contestant
URL: `/vote/:slug`
Method: `POST`
Payload: `{email: "email@example.com"}`

### Lists - require auth
#### See all votes casted so far
HTML: `/list/votes`
JSON: `/list/votes/json`
CVS: `/list/votes/cvs`

#### See top of all contestants
JSON: `/list/top/json`


 ### Management
 #### Reload list of contestants  - requires auth
 URL: `/management/reload-contestants`

 #### Health-check
 URL: `/management/health-check`


