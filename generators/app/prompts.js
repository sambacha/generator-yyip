const chalk = require("chalk");
const util = require("./util");

module.exports = {
  askForYIPNumber,
  askForYIPType,
  askForYIPAuthor,
  askForYIPStatus,
  askForDateCreated,
};

async function askForYIPNumber() {
  const yipNumberAssignedAnswer = await this.prompt([
    {
      type: "confirm",
      name: "yipNumberAssigned",
      message: "Is the number of the YIP assigned ?",
      default: false,
    },
  ]);
  this.yipNumberAssigned = yipNumberAssignedAnswer.yipNumberAssigned;
  if (this.yipNumberAssigned) {
    const answers = await this.prompt([
      {
        type: "String",
        name: "yipNumber",
        message: "What is the number assigned to the YIP ?",
      },
    ]);
    this.yipNumber = answers.yipNumber;
  }
}

async function askForYIPType() {
  const typeChoices = [
    {
      value: "Strategy",
    },
    {
      value: "Protocol",
    },
    {
      value: "Informational",
    },
  ];

  const categoryChoices = [
    {
      value: "Core",
    },
    {
      value: "Networking",
    },
    {
      value: "Interface",
    },
    {
      value: "ERC",
    },
  ];

  const answers = await this.prompt([
    {
      type: "list",
      name: "yipType",
      message: `Which ${chalk.yellow(
        "*type*"
      )} of YIP would you like to create?`,
      choices: typeChoices,
      default: "Strategy",
    },
    {
      when: (answers) => ["Strategy"].includes(answers.yipType),
      type: "list",
      name: "yipCategory",
      message: `Which ${chalk.yellow(
        "*category*"
      )} of Strategy YIP would you like to create?`,
      choices: categoryChoices,
      default: "Core",
    },
  ]);
  this.yipType = answers.yipType;
  this.yipCategory = answers.yipCategory;
}

async function askForYIPAuthor() {
  const answers = await this.prompt([
    {
      type: "String",
      name: "yipAuthor",
      message: `Who is the ${chalk.yellow(
        "*author*"
      )} of the YIP would you like to create?`,
      default: this.yipAuthor,
      store: true,
    },
    {
      type: "String",
      name: "yipAuthorGithubUsername",
      message: `What is the ${chalk.yellow(
        "*github username*"
      )} of the author?`,
      default: this.yipAuthorGithubUsername,
      store: true,
    },
  ]);
  this.yipAuthor = answers.yipAuthor;
  this.yipAuthorGithubUsername = answers.yipAuthorGithubUsername;
}

async function askForYIPStatus() {
  const statusChoices = [
    {
      value: "WIP",
    },
    {
      value: "Withdrawn",
    },
    {
      value: "Implemented",
    },
    {
      value: "Proposed",
    },
    {
      value: "Approved",
    },
    {
      value: "Deferred",
    },
    {
      value: "Rejected",
    },
    {
      value: "Moribund",
    },
  ];

  const answers = await this.prompt([
    {
      type: "list",
      choices: statusChoices,
      message: `What is the ${chalk.yellow("*status*")} of the YIP?`,
      name: "yipStatus",
      default: "WIP",
    },
  ]);

  this.yipStatus = answers.yipStatus;
}

async function askForDateCreated() {
  const answers = await this.prompt([
    {
      type: "String",
      message: `What is the ${chalk.yellow("*creation date*")} of the YIP?`,
      name: "yipDateCreated",
      default: util.getTodayISO8601(),
    },
  ]);

  this.yipDateCreated = answers.yipDateCreated;
}
