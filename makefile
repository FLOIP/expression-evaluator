.PHONY: install clean

install: node_modules

node_modules: package.json
	npm install

build: src node_modules
	npx tsc

watch: src
	npx tsc -w

clean:
	rm -rf node_modules
	rm -rf dist/*
