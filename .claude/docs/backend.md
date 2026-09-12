# Go Backend Guidelines

All Go commands must include the `--tags "fts5"` flag for SQLite FTS5 support.

## Error Handling
- Use error wrapping with context: `fmt.Errorf("context: %w", err)`
- Always log errors with `slog.Error()` before returning
- Handle `sql.ErrNoRows` separately using `errors.Is()`
- Use `panic()` only for critical initialization errors

## HTTP Handlers
- Function signature: `func HandleXXX(w http.ResponseWriter, r *http.Request)`
- Naming: `Handle{Action}{Resource}` (e.g., `HandleGetNotes`, `HandleCreateUser`)
- Structure: Parse/validate → Business logic → Response
- Use `utils.SendErrorResponse()` for consistent error responses
- Set `Content-Type: application/json` for JSON responses

## API Endpoints
- RESTful patterns: `GET /api/resource/`, `POST /api/resource/`, `PUT /api/resource/{id}/`
- Private routes use `addPrivateRoute()` wrapper for authentication
- Response envelopes for paginated data (e.g., `ResponseEnvelope`)

## Struct Conventions
- Separate database and API structs (e.g., `UserRecord` vs public struct)
- Use JSON tags for API responses: `json:"fieldName"`
- Naming: `{Resource}Record` for database structs, `{Resource}` for API
