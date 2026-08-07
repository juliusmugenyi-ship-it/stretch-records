# Stretch Records Lesson 5 Audit

## System tested

Branch:
lesson-05

Server:
npx json-server artists.json

Artists endpoint:
http://localhost:3000/artists

Date tested:
[07.08.2026]

---

## Fetch audit

### Endpoint

Observed request:

GET http://localhost:3000/artists

Observed status:

200 OK

Observed response type:

application/json

Evidence:

Browser Network tab showed:

- Request method: GET
- Status: 200
- Response header Content-Type: application/json

---

## Loader behavior

The page loader uses:

- async/await
- fetch()
- response.ok checking
- try/catch/finally

Observed behavior:

When the server was running:

- artists loaded successfully
- cards rendered on the page

When the server was stopped:

- the catch block displayed the error message
- loading state cleared

---

## Error handling audit

Test:

Request:
http://localhost:3000/wrong-path

Observed:

Status:
404

Content-Type:
application/json

Observation:

The fetch Promise fulfilled even though the response failed.

The code checked:

response.ok

and threw:

Error(`HTTP ${response.status}`)

---

## Form persistence audit

Test:

Submitted a new artist through the form.

Observed:

POST request:
http://localhost:3000/artists

Method:
POST

Headers:
Content-Type: application/json

Body:
JSON.stringify(newArtist)

Result:

Status:
201 Created

Verification:

After refreshing the page, the new artist remained visible.

A second browser tab requesting:

http://localhost:3000/artists

also showed the saved artist.

---

## Two-server audit

Second server:

Command:

npx json-server label.json --port 3001

Endpoint:

http://localhost:3001/label

Observed:

Both requests completed before rendering.

Implementation:

Promise.all()

---

## Limitations / findings

//[Only add issues you actually observed]

## Failure handling test

Test performed:

Stopped json-server on port 3000 while the page was open, then refreshed the page.

Observed visitor experience:

The page displayed:
"Sorry, we couldn't load the artists right now."

The loading message cleared after the failed request.

Single point of failure:

The json-server running on localhost:3000 is a single point of failure because the page depends on that one server being available to retrieve artist data.

Redundancy:

Redundancy would mean having an additional data source or backup server that could provide the artist data if the primary server becomes unavailable.

## Network latency test

Test performed:

Changed DevTools Network throttling to Slow 3G and reloaded the page.

Observed load time:

The artists request took approximately 4 seconds to complete.

What held the screen while waiting:

The visitor saw the loading message:

"Loading artists..."

until the fetch request completed and the artist cards rendered.

Delay created:

The slow network preset introduced latency.

Latency is the delay between making a request and receiving the response.

## Cache comparison test

Test performed:

Reloaded the page twice using the Network tab.

First reload:
Cache disabled.

Observed:

Status: 200
Load time: [your value]
Transferred: [your value]

Second reload:
Cache enabled.

Observed:

Status: 200
Load time: [your value]
Transferred: [your value]

Difference:

The cached reload was faster because the browser reused stored resources instead of requesting everything again.

Caching:

Caching is the process of storing previously loaded resources so future requests can be served faster.

## System layers audit

### Presentation layer

The presentation layer is the visible website in the browser.

Observed components:

- Artist cards displayed on the page
- Images, names, genres, descriptions, and songs
- Form used to submit a new artist

Technology:

HTML, CSS, and JavaScript DOM rendering.

---

### Application layer

The application layer is the JavaScript running in the browser.

Observed responsibilities:

- Fetching artist data from the server
- Checking response.ok and handling errors
- Rendering artist cards
- Sending POST requests when the form is submitted
- Managing loading and failure messages

What exists in the middle layer:

The middle layer contains client-side application logic.

What does not exist:

There is no separate backend application server containing business rules, authentication, validation, or custom API logic. The browser communicates directly with json-server.

---

### Data layer

The data layer is the JSON file used by json-server.

Observed data source:

artists.json

The json-server exposes this data through:

http://localhost:3000/artists

The JSON file stores:

- artist names
- genres
- images
- blurbs
- songs

---

## Architecture summary

Browser UI (presentation)
|
|
JavaScript fetch logic (application)
|
|
json-server API
|
|
artists.json (data)

The system has presentation, application, and data layers, but the application layer is lightweight client-side code rather than a full backend service.

## Request journey audit

Request traced:

GET http://localhost:3000/artists

### 1. Browser request

Evidence from Network tab:

The browser sent a GET request to:

http://localhost:3000/artists

Observed:

- Method: GET
- Status: 200
- Response Content-Type: application/json

---

### 2. Server response

Evidence from json-server terminal:

The running json-server handled the request on port 3000.

The server provided the JSON data from:

artists.json

---

### 3. JavaScript processing

After receiving the response:

- The loader checked response.ok.
- The response body was parsed with response.json().
- The artist objects were passed into the card-building code.

---

### 4. Rendered result

The browser created artist card sections from the returned JSON.

Observed result:

The artist cards appeared on the page with:

- artist image
- artist name
- genre
- description
- songs

---

## Request path summary

Browser
→ GET /artists
→ json-server on localhost:3000
→ artists.json
→ JavaScript fetch handling
→ DOM card rendering

## Optional: Real system comparison

The form submission works with json-server, but a production system would need additional responsibilities that json-server does not provide.

### Validation

Layer:

Application / backend layer

A real system would validate submitted data on the server before saving it.

Examples:

- Required artist name
- Valid image URL
- Correct data types
- Preventing empty or invalid fields

---

### Identity

Layer:

Application / backend layer

A real system would identify users before allowing changes.

Examples:

- User accounts
- Login sessions
- Permissions
- Knowing who created or edited an artist

json-server does not provide authentication or user identity.

---

### Rules

Layer:

Application / backend layer

A real system would enforce business rules.

Examples:

- Who can add artists
- Limits on submissions
- Preventing duplicate records
- Controlling what data can be changed

---

## What Lesson 4 proved cannot live in the browser alone

Lesson 4 showed that the browser cannot be trusted as the only place for important rules.

The browser can send a POST request, but it cannot guarantee that submitted data is valid or that a user is allowed to make changes.

Validation, identity checks, and business rules must be enforced on the server side because browser code can be modified or bypassed.
