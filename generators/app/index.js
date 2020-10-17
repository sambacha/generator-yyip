const Generator = require("yeoman-generator");
const packageInformation = require("../../package.json");
const chalk = require("chalk");
const prompts = require("./prompts");

module.exports = class extends Generator {
  get prompting() {
    return this._prompting();
  }

  initializing() {
    this.yipNumberAssigned = false;
    this.yipNumber = 0;
    this._printWelcomeMessage();
  }

  _prompting() {
    return {
      askForYIPNumber: prompts.askForYIPNumber,
      askForYIPType: prompts.askForYIPType,
      askForYIPAuthor: prompts.askForYIPAuthor,
      askForYIPStatus: prompts.askForYIPStatus,
      askForDateCreated: prompts.askForDateCreated,
    };
  }

  configuring() {}

  writing() {
    this.yipDestinationPath = this.yipNumberAssigned
      ? `YIPS/yip-${this.yipNumber}.md`
      : "YIPS/yip-x.md";
    this.fs.copyTpl(
      this.templatePath("yip-template.md"),
      this.destinationPath(this.yipDestinationPath),
      {
        yipType: this.yipType,
        yipCategory: this.yipCategory,
        yipAuthor: this.yipAuthor,
        yipAuthorGithubUsername: this.yipAuthorGithubUsername,
        yipDateCreated: this.yipDateCreated,
        yipStatus: this.yipStatus,
        yipNumberAssigned: this.yipNumberAssigned,
        yipNumber: this.yipNumber,
      }
    );

    this.config.save();
  }

  conflicts() {}

  install() {}

  end() {
    this._printGoodByeMessage();
  }

  _printWelcomeMessage() {
    this.log("\n");
    this.log("\n");
    this.log(`${chalk.green(" yeomanYIP ")}\n`);
    this.log(`${chalk.blue.bold("YIP Improvement Proposal")}\n`);
    this.log(
      chalk.white.bold(
        "https://github.com/iearn-finance/YIPS/blob/master/YIPS/yip-0.md1\n"
      )
    );
    this.log(
      chalk.white(
        "discourse: https://gov.yearn.finance/  - go and lobby for your changes "
      ) + chalk.yellow(`v${packageInformation.version}`)
    );
    this.log(
      chalk.white(
        `Application files will be generated in folder: ${chalk.yellow(
          process.cwd()
        )}`
      )
    );
  }

  _printGoodByeMessage() {
    this.log(
      "YIP template is ready: ",
      chalk.yellow(`${process.cwd()}/${this.YIPDestinationPath}`)
    );
    this.log("Please fill all the required sections.");
    this.log(
      `Once done, you can submit a pull request to: ${chalk.blueBright(
        "https://github.com/iearn-finance/YIPS"
      )}`
    );
    this.log(chalk.magentaBright.bold(`yip or rip, lmao`));
  }
};
