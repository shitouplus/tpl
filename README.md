tpl -- Template manager
===

[![tpl](https://img.shields.io/npm/v/tpl-manager)](https://github.com/shitouplus/tpl)

`tpl` can help you easily manage templates. You can use this tool to create templates from files, or create files from templates.

English | [简体中文](./README-zh_CN.md)

## Install

```
$ npm install tpl-manager -g
```

## Example
```
$ tpl ls

README.md

```

```
$ tpl use README.md

  use template to create file

```

## Usage

```
Usage: tpl [options] [command]

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  ls                        List all the templates
  use [template] [name]     Use current template
  add <template> [name]     Add custom template
  rename <template> [name]  Change custom template name
  del <template>            Delete custom template
  view <template>           View the template
  info <template>           Template Info
  help [command]            display help for command
```


## Thanks

Inspired by [nrm](https://github.com/Pana/nrm), Implement a template management command line tool to save frequently used files as templates for use in other projects.



## LICENSE
MIT


