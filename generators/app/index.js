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
        name: "yoThemeUri",
        message: "Template repository url.",
        default:
          "https://github.com/hchamba-altimea/generator-wordpress-theme-gulp-3-9-0"
      },
      {
        type: "input",
        name: "yoThemeAuthor",
        message: "Enter the name of the theme author.",
        default: "Hegel Berkeley"
      },
      {
        type: "input",
        name: "yoThemeAuthorUri",
        message: "Author url.",
        default: "https://www.hegelberkeley.com"
      },
      {
        type: "input",
        name: "yoThemeAuthorEmail",
        message: "Author email.",
        default: "hegel.berkeley@gmail.com"
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
        type: "confirm",
        name: "yoSecurity",
        message: "Do you want to add security?"
      },
      {
        type: "confirm",
        name: "yoComments",
        message: "Do you want to add comments to pages ?"
      },
      {
        type: "confirm",
        name: "yoSiderbar",
        message: "Do you want to add sidebar to pages ?"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("theme"),
      this.destinationPath(this.props.yoThemeDirectoryName),
      {
        prettyName: this.props.yoThemeName,
        name: this.props.yoThemeDirectoryName,
        nameFunction: this.props.yoThemeDirectoryName.replace(/-/g, "_"),
        nameClass: this.props.yoClassName,
        description: this.props.yoThemeDescription,
        uri: this.props.yoThemeUri,
        uriLocal: this.props.yoUrlProxy,
        comments: this.props.yoComments,
        sidebar: this.props.yoSiderbar,
        security: this.props.yoSecurity,
        author: this.props.yoThemeAuthor,
        authorUri: this.props.yoThemeAuthorUri,
        authorEmail: this.props.yoThemeAuthorEmail
      },
      {},
      { globOptions: { dot: true } }
    );

    this.fs.move(
      this.destinationPath(
        this.props.yoThemeDirectoryName + "/inc/ClassName.php"
      ),
      this.destinationPath(
        this.props.yoThemeDirectoryName +
          "/inc/" +
          this.props.yoClassName +
          ".php"
      )
    );

    // Copy the configuration files
    const uriAssets = `${this.props.yoThemeDirectoryName}/assets`;
    this.fs.copyTpl(
      this.templatePath("assets/_package.json"),
      this.destinationPath(`${uriAssets}/package.json`),
      {
        name: this.props.yoThemeDirectoryName,
        themeUri: this.props.yoThemeUri,
        author: this.props.yoThemeAuthor
      }
    );
    this.fs.copyTpl(
      this.templatePath("assets/_gulpconfig.js"),
      this.destinationPath(`${uriAssets}/gulpconfig.js`),
      {
        name: this.props.yoThemeDirectoryName,
        uriLocal: this.props.yoUrlProxy
      }
    );
    this.fs.copyTpl(
      this.templatePath("assets/_gulpfile.js"),
      this.destinationPath(`${uriAssets}/gulpfile.js`),
      {
        name: this.props.yoThemeDirectoryName,
        author: this.props.yoThemeAuthor,
        authorEmail: this.props.yoThemeAuthorEmail
      }
    );
    this.fs.copy(
      this.templatePath("assets/_editorconfig"),
      this.destinationPath(`${uriAssets}/.editorconfig`)
    );
    this.fs.copy(
      this.templatePath("assets/_gitattributes"),
      this.destinationPath(`${uriAssets}/.gitattributes`)
    );
    this.fs.copy(
      this.templatePath("assets/_gitignore"),
      this.destinationPath(`${uriAssets}/.gitignore`)
    );
    this.fs.copy(
      this.templatePath("assets/_eslintrc.json"),
      this.destinationPath(`${uriAssets}/.eslintrc.json`)
    );
    this.fs.copyTpl(
      this.templatePath("assets/_composer.json"),
      this.destinationPath(`${uriAssets}/composer.json`),
      {
        name: this.props.yoThemeDirectoryName,
        author: this.props.yoThemeAuthor,
        authorUri: this.props.yoThemeAuthorUri,
        uri: this.props.yoThemeUri
      }
    );
  }

  install() {
    // This.installDependencies();
  }
};
