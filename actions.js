const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const open = require('open');

const {
  printMessages,
  printSuccess,
  getTemplates,
  writeTemplate,
  renameTemplate,
  useTemplate,
  delTemplate,
  exit
} = require('./helpers');

const Directory = path.resolve(__dirname, './templates');

async function onList() {
  const templates = await getTemplates(Directory);

  const messages = templates.map(template => {
    const prefix = chalk.green.bold('* ');
    return prefix + template;
  });

  printMessages(messages);
}

function onUse(template, name) {
  useTemplate(Directory, template, name);
}

async function onAdd(template, name) {
  try {
    const stat = fs.statSync(template);
    
    if (!stat.isFile()) {
      exit(template + ' is not a file!');
    }
    if (!name) {
      name = path.basename(template);
    }

    const file = path.join(Directory, name);
    const result = await writeTemplate(template, file);
    
    result && printSuccess('Add template success!');
  } catch (err) {
    exit(template + ' does not exist!');
  }
}

function onDelete(template) {
  const file = path.join(Directory, template);
  if (!fs.existsSync(file)) {
    exit(template + ' does not exist!');
  } else {
    delTemplate(file);
  }
}

function onRename(template, name) {
  const file = path.join(Directory, template);
  if (!fs.existsSync(file)) {
    exit(template + ' does not exist!');
  } else {
    renameTemplate(file, Directory, name);
  }
}

function onView(template) {
  const file = path.join(Directory, template);
  if (!fs.existsSync(file)) {
    exit(template + ' does not exist!');
  }
  open(file);
}

function onInfo(template) {
  const file = path.join(Directory, template);
  
  if (!fs.existsSync(file)) {
    exit(template + ' does not exist!');
  }
  
  try {
    const { birthtime, ctime } = fs.statSync(file);
    const info = {
      name: {
        value: template
      },
      directory: {
        value: Directory
      },
      'Creation time': {
        value: birthtime
      },
      'Modification time': {
        value: ctime
      }
    }
    console.table(info);
  } catch (e) {
    exit(e);
  }
}

module.exports = {
  onList,
  onUse,
  onAdd,
  onDelete,
  onRename,
  onView,
  onInfo
};
