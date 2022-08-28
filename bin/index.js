#!/usr/bin/env node

const actions = require('../actions');
const PKG = require('../package.json');
const { program } = require('commander');

program
  .description(PKG.description)
  .version(PKG.version);

program
  .command('ls')
  .description('List all the templates')
  .action(actions.onList);

program
  .command('use [template] [name]')
  .description('Use current template')
  .action(actions.onUse);

program
  .command('add <template> [name]')
  .description('Add custom template')
  .action(actions.onAdd);

program
  .command('rename <template> [name]')
  .description('Change custom template name')
  .action(actions.onRename);

program
  .command('del <template>')
  .description('Delete custom template')
  .action(actions.onDelete);

program
  .command('view <template>')
  .description('View the template')
  .action(actions.onView);

program
  .command('info <template>')
  .description('Template Info')
  .action(actions.onInfo);

program
  .parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}
