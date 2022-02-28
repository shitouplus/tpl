tpl -- Template manager
===

`tpl` can help you use template to create file,


## Install

```
$ npm link
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


## Guide

参考 [nrm](https://github.com/Pana/nrm) 实现一个模板管理的命令，方便将经常使用的文件存为模板，便于在项目中使用




## LICENSE
MIT


