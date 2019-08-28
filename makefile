.PHONY: install clean

install: node_modules

node_modules: package.json
	yarn install

build: src node_modules
	yarn build

watch: src
	yarn watch

clean:
	rm -rf node_modules
	rm -rf dist/*
