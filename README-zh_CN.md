tpl -- Template manager
===

[![tpl](https://img.shields.io/npm/v/tpl-manager)](https://github.com/shitouplus/tpl)

`tpl` 可以帮助您轻松管理模板。 您可以使用此工具从文件创建模板，或者从模板创建文件。

[English](./README.md) | 简体中文

## 安装

```
$ npm install tpl-manager -g
```

## 示例
```
$ tpl ls

README.md

```

```
$ tpl use README.md

  use template to create file

```

## 使用

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


## 致谢

受 [nrm](https://github.com/Pana/nrm) 启发，实现一个模板管理命令行工具，方便将常用文件保存为模板，便于在其它项目中使用。



## LICENSE
MIT


