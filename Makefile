default: help

# The general philosophy and functionality of this makefile is shamelessly stolen from compiler explorer

help: # with thanks to Ben Rady
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

NODE:=node
NPM:=npm
NPX:=npx

.PHONY: prereqs
prereqs: package.json package-lock.json
	$(NPM) i

.PHONY: ts-check
ts-check: prereqs  ## Check typescript
	$(NPM) run ts-check

.PHONY: lint
lint: prereqs  ## Run eslint
	$(NPM) run lint

.PHONY: format-check
formats-check: prereqs  ## Check formatting
	$(NPM) run format-check

.PHONY: check
check: ts-check lint formats-check  ## Run all checks

.PHONY: format
format: prereqs  ## Formats source files
	$(NPM) run format

.PHONY: test
test: prereqs  ## Run tests
	$(NPM) run test

.PHONY: clean
clean:  ## Clean up everything
	rm -rf node_modules dist

.PHONY: build
build: prereqs  ## Build everything
	$(NPM) run build

.PHONY: update
update:  ## Updates npm packages
	./scripts/update_packages.sh

.PHONY: publish
publish: check build test  ## Publish to npm
	npm publish
