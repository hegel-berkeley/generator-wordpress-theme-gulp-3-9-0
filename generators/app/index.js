"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the great ${chalk.red(
          "generator-wordpress-theme-gulp-3-9-0"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "yoThemeName",
        message: "Name of the wordpess template.",
        default: "My Theme"
      },
      {
        type: "input",
        name: "yoThemeAuthor",
        message: "Enter the name of the theme author.",
        default: "Hegel Berkeley"
      },
      {
        type: "input",
        name: "yoThemeUri",
        message: "Template repository url.",
        default:
          "https://github.com/hchamba-altimea/generator-wordpress-theme-gulp-3-9-0"
      },
      {
        type: "input",
        name: "yoThemeDirectoryName",
        message: "Name of the directory that will contain the template.",
        default: "hegel-theme"
      },
      {
        type: "input",
        name: "yoThemeDescription",
        message: "Wordpress theme description.",
        default: "Theme developed for their beloved client."
      },
      {
        type: "input",
        name: "yoClassName",
        message:
          "What name do you want to give to the template Class (use camelCase)?",
        default: "myThemeByHegel"
      },
      {
        type: "input",
        name: "yoUrlProxy",
        message:
          "Localhost URL of the project? ex: local.app.com, localhost/project-name",
        default: "local.app.com"
      },
      {
        type: "checkbox",
        name: "security",
        message: "Do you want to add security?",
        choices: [
          {
            name: "Security",
            value: "includeSecurity",
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
  }

  install() {
    // This.installDependencies();
  }
};
