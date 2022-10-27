
# <%= prettyName %>

### APACHE
Basic configuration of the virtualhost developer mode in: ` /etc/apache2/sites-available/local.project.com.conf`

	<VirtualHost *:80>
		ServerName local.project.com
		DocumentRoot /var/www/html/project/app/
		<Directory /var/www/html/project/app/>
			Options Indexes FollowSymLinks Multiviews
			AllowOverride All
			Order allow,deny
			allow from all
			RewriteEngine on
		</Directory>
		SetEnv WP_ENV dev
		ErrorLog ${APACHE_LOG_DIR}/local.project.com-error.log
	</VirtualHost>

###

* Install NodeJS and the necessary packers (within WSL2 in case of using Windows).
  * `sudo apt update`
  * Install NodeJS y NPM
    * `sudo apt install nodejs`
    * `sudo apt install npm`
  * Install NVM or n and the version of Node to use (`10.13.0`)
  * Install Gulp:
    * `sudo npm install -g gulp gulp-cli`

* Download the necessary packages for the site to work properly.
  * Go to the theme folder within the project: `cd app/wp-content/themes/<%= name %>/assets/`
  * Remember to be using version `10.13.0` of Node.
    * `nvm use 10.13.0`
    * `n 10.13.0`
  * Download and compile the necessary resources.
    * `npm install`
    * `gulp dist`

* Finally, test if the page is displayed correctly in the local environment by logging into the [WordPress Administrator](<%= uri %>/wp-admin/) with the corresponding credentials.

## Working with the theme

> **Ejecutar los siguientes pasos en el terminal (WSL2 en caso de Windows)**

* To work with the theme, it is necessary to go to the folder where it is located.
  * Within the project: `cd app/wp-content/themes/<%= name %>/assets/`

* Remember to be using version `10.13.0` of Node.
  * `nvm use 10.13.0`
  * `n 10.13.0`

* When you have finished making the relevant changes, the Sass files must be compiled and the JS must be minified:
  * `gulp dist`

* Finally, the changes will be ready to be tested and uploaded to GitHub.

### Styles
Sass is being used as a CSS precompiler. You can find the entire file hierarchy in:
```
app/wp-content/themes/<%= name %>/assets/scss/
```

* The style.css file will only be modified to add external CSS libraries. Currently, the project uses:
* Bourbon: Collection of mixins
* Normalize
* The base folder contains general files for the whole application:
* _animations.scss: CSS animations
* _fonts.scss: Fonts
* _globals.scss: Global styles e.g. applied to body, html, a...
* _helpers.scss: Classes to make your life easier like converting to uppercase.
* _icons.scss: CSS icons.
* _variables.scss: Definition of the SCSS variables to use in the project.
* The responsive folder will contain the global settings for different viewport sizes. It will not be used for specific section styles, which should go in the following area.
* The sections folder will contain the styles in individual section files (contact, help, header, footer...).

### Sass utils core or use https://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints
Use sass mixin responsive helpers file in `sass/mixin/_media_queries.scss`

Example use `@include maxw(xs){};` for  `@media (max-width: 575px){};`

Or use `@include minw(xs){};` for  `@media (min-width: 576px){};`
#### Input sass example
```sh
.my-component{
// use example props test
width: 25%;
font-size: 15px;
&__title{
    color: blue;
}
// use max-width
@include maxw(xs){
    width: 75%;
}
// use min-width
@include minw(xs){
    font-size: 18px;
}
}
```
#### Output css
```sh
.my-component{
width: 25%;
font-size: 15px;
}
.my-component__title{
color: blue;
}
@media (max-width: 575px) {
.my-component{
    width: 100%;
}
}
@media (min-width: 576px) {
.my-component{
    font-size: 18px;
}
}
```

#### Existing mixin media queries:
Mixin `maxw($breakpoint)` with parameters **lg** = 1199px , **md** = 991px , **sm** = 767px , **xs** = 575px.

Example `@include maxw(lg){...};`  output  `@media (max-width: 1199px){...};`

Mixin `minw($breakpoint)` with parameters **lg** = 1200px , **md** = 992px , **sm** = 768px , **xs** = 576px.

Example `@include minw(xs){...};`  output  `@media (max-width: 576px){...};`


### Javascript
The project was configured to separate our scripts into 2 files.
* The plugins or external libraries will be stored in <%= name %>-plugins.js. These libraries will have to be installed via bower and you need to modify the gulpconfig.js file to tell it the new scripts.
* Our application code will go in <%= name %>-core.js

The core.js file that will be where we will work our application is located in **app/wp-content/themes/<%= name %>/assets/js/**

NOTE: Third party plugins that are installed in WordPress may insert more scripts, but in any case they will be inserted in the footer.

### PHP
PHP files will be sorted as much as possible inside **app/wp-content/themes/<%= name %>/assets/inc/**, with the exception of Templates.

Currently there are 5 folders and one file there:

* assets.php: This file is in charge of gluing styles and javascript of our template.
* actions: Here we will create our WordPress actions.
* filters: Here we will create our WordPress filters.
* custom_posts: Here we will create our WordPress custom_posts.
* custom_fields: Here we will specify the custom fields created with the "Advanced Custom Fields" tool.

- The Templates will be in the **app/wp-content/themes/<%= name %>/assets/templates/** folder.

### Error ejecute GULP  ENOSPC
For Arch Linux add this line to:

sudo nano /etc/sysctl.d/99-sysctl.conf

fs.inotify.max_user_watches=524288

Then execute:

sysctl --system


### the file Robots.txt container:
```sh
User-agent: *
Disallow: /wp-login
Disallow: /wp-admin
Disallow: //wp-includes/
Disallow: /*/feed/
Disallow: /*/trackback/
Disallow: /*/attachment/
Disallow: /author/
Disallow: /*/page/
Disallow: /*/feed/
Disallow: /tag/*/page/
Disallow: /tag/*/feed/
Disallow: /page/
Disallow: /comments/
Disallow: /xmlrpc.php
Disallow: /*?s=
Disallow: /*/*/*/feed.xml
Disallow: /?attachment_id*

```

### Fonts
The fonts are sorted in subfolders by their family in **app/wp-content/themes/<%= name %>/fonts/**.

Fonts are declared in the Sass font file using a Bourbon mixin to get all formats imported on a single line. Example:
```
@include font-face("dinnext-regular", $icon-font-path + "dinnext/DINNextLTPro-Regular", $file-formats: eot woff ttf svg);
```
### Languages (.pot files)
The project has been designed to be multilingual, so the development must be accordingly.
* All text strings must be inserted using the gettext functions. Their default value will be in English and the domain
  will be '<%= name %>-theme':
```
<h1><?php _e('This is a test', '<%= name %>-theme'); ?></h1>
```
* To generate the .pot file for translations, there is a gulp task. The generated file is placed in src/languages
```
gulp potfiles
```

For more information see: https://codex.wordpress.org/I18n_for_WordPress_Developers


## Other considerations when working on the project

* The main language of the project is English
* All variables must be specified in English, both PHP, javascript and CSS classes.
* It is preferable that the code is commented in English, but in this case Spanish may be used if it will better represent the information you want to convey.
* The default tabulation of the project is 4 spaces tabulation. This configuration is specified in the .editorconfig file.
* It is essential to have an extension for javascript linteo in the editor to be used. For example:
* The HTML should be correctly formatted in cascading avoiding compressing several tags in a single line to be able to read the code more easily. An automated tool is then in charge of compressing all the HTML.
* Do not leave empty HTML attributes such as name or id. If they are not needed, do not put them.
* Do not leave commented code except in cases of force majeure. If you need to see previous versions of code you will use GIT.
* In the header of our functions, put a small comment with the functionality of that function, as well as detailing what parameters the function receives and what it returns, if it returns something. Example:

```
/**
* Method to change the graph to the selected time frame
* @param {string} type "Type of group to return its value" * @param {string} type "Type of group to return its value"
* @param {array} item
*/
```
## What to put in the commits or Pull Requests
* For developers, these values can be put directly in the name of the pull request, instead of each commit.
  of each commit.

#### Added a plugin
>[new plugin] Added `plugin_name`

>[new plugin] Added Advanced Custom Fields PRO

#### Modify a plugin
>[`plugin_name`] `Modification description`

>[altimea-connector-hybris] Refactoring of connection logic

#### delete a plugin
>[remove plugin] Removed `plugin_name`

>[remove plugin] Removed Advanced Custom Fields PRO

#### New Feature
>[new feature] `Feature description`

>[new feature] Ability to send emails from custom form

#### Fix
>[fix] `Fix description`

>[fix] Fixed wrong analytics value

#### Documentation
>[doc] `Description`

>[doc] Added these cases in README.md

#### Infrastructure
>[arch] `Description`

>[arch] Modified Dockerfile

#### Update
>[update] `package_name or library` updated to `new_version`

>[update] WordPress updated to 6.0.3

#### Others
>[others] `Description`

>[others] Blank line
