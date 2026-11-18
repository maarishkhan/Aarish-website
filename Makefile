PORT ?= 3000
LOG  := .dev.log

.PHONY: up down restart logs status build

## Start the dev server in the background (http://localhost:$(PORT))
up:
	@if lsof -ti :$(PORT) -sTCP:LISTEN >/dev/null 2>&1; then \
		echo "Port $(PORT) already in use - run 'make down' first."; exit 1; \
	fi
	@[ -d node_modules ] || npm install
	@nohup npm run dev -- --port $(PORT) > $(LOG) 2>&1 &
	@echo "Starting on http://localhost:$(PORT) (logs: make logs)"

## Stop the dev server
down:
	@pids=$$(lsof -ti :$(PORT) -sTCP:LISTEN 2>/dev/null); \
	if [ -n "$$pids" ]; then kill $$pids && echo "Stopped server on port $(PORT)."; \
	else echo "Nothing running on port $(PORT)."; fi

restart: down up

logs:
	@tail -f $(LOG)

status:
	@lsof -ti :$(PORT) -sTCP:LISTEN >/dev/null 2>&1 && echo "Running on http://localhost:$(PORT)" || echo "Not running"

## Production build
build:
	npm run build
