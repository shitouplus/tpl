const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require("path");

function padding(message = '', before = 1, after = 1) {
  return new Array(before).fill(' ').join('') + message + new Array(after).fill(' ').join('');
}

async function copyFile(src, dest) {
  return new Promise(resolve => {
    fs.copyFile(src, dest, err => {
      if (err) {
        exit(err);
      } else {
        resolve(true);
      }
    })
  });
}

async function readDirectory(path) {
  return new Promise(resolve => {
    if (!fs.existsSync(path)) {
      resolve({});
    } else {
      try {
        const content = fs.readdirSync(path);
        resolve(content);
      } catch (error) {
        exit(error);
      }
    }
  });
}

async function writeTemplate(template, file) {
  if (fs.existsSync(file)) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'The file already exists, whether to overwrite?'
      }
    ]);
    if (!answers.overwrite) {
      exit();
    }
  }
  return copyFile(template, file);
}

async function useTemplate(directory, template, name) {
  const templates = await getTemplates(directory);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Please select a template: ',
      choices: templates,
      when: () => {
        return !template;
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'Please input the name',
      default: (answers) => {
        return answers.template || template;
      },
      when: () => {
        return !name;
      },
    }
  ]);
  
  const src = path.join(directory, answers.template || template);
  const dest = path.join(process.cwd(), answers.name || name);
  const dirname = path.dirname(dest);
  
  try {
    fs.mkdirSync(dirname, { recursive: true });
  } catch (e) {
    exit(e);
  }

  if (!fs.existsSync(src)) {
    exit(template + ' template does not exist!')
  }
  const result = await writeTemplate(src, dest);

  result && printSuccess('Use template success!');
}

async function renameTemplate(template, directory, name) {
  if (!name) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Please input the template name: ',
        validate: val => {
          const text = val.trim();

          if (!text) {
            return 'The name cannot be empty!'
          }

          if (/[\\\/]/.test(text)) {
            return text + ' is not a valid filename!'
          }

          return true;
        }
      }
    ])
      .then(answers => {
        name = answers.filename.trim();
      });
  }
  const file = path.join(directory, name);
  fs.rename(template, file, err => {
    if (err) {
      exit(err);
    }
    printSuccess('Rename success!');
  });
}

function delTemplate(template) {
  fs.unlink(template,(err,data)=>{
    if (err) {
      exit(err);
    }
    printSuccess('Delete template success!');
  })
}

async function getTemplates(path) {
  return await readDirectory(path);
}

function printError(error) {
  console.error(chalk.bgRed(padding('ERROR')) + ' ' + chalk.red(error));
}

function printSuccess(success) {
  console.log(chalk.bgGreen(padding('SUCCESS')) + ' ' + chalk.green(success));
}

function printMessages(messages) {
  for (const message of messages) {
    console.log(message);
  }
}

function exit(error) {
  error && printError(error);
  process.exit(1);
}

module.exports = {
  readDirectory,
  getTemplates,
  writeTemplate,
  renameTemplate,
  useTemplate,
  delTemplate,
  printError,
  printSuccess,
  printMessages,
  exit
};
