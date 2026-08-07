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

[Only add issues you actually observed]
