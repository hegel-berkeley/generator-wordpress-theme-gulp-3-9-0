// ==== CONFIGURATION ==== //

// Project paths
var project = '<%= name %>',
    src = './src/',
    build = '../../themes/' + project + '-dev/',
    dist = '../../themes/' + project + '/',
    assets = './wp-content/',
    dev = './node_modules/',
    composer = './vendor/',
    modules = './node_modules/';

// Project settings
module.exports = {

    browsersync: {
        files: [build + '/**', '!' + build + '/**.map'],
        notify: true,
        open: true,
        port: 3000,
        proxy: '<%= uriLocal %>'
    },

    scripts: {
        bundles: {
            core: ['core'],
            plugins: ['plugins']
        },
        chunks: {
            core: [
                src + 'js/analytics.js',
                src + 'js/core.js',
                src + 'js/functions.js'
            ],
            plugins: [
                dev + 'jquery/dist/jquery.js',
                dev + 'boostrap/dist/js/bootstrap.js'
            ]
        },
        dest: build + 'js/',
        lint: {
            src: [src + 'js/**/*.js']
        },
        minify: {
            src: build + 'js/**/*.js',
            uglify: {},
            uglify_dist: {
                compress: {
                    drop_console: true
                }
            },
            dest: build + 'js/'
        },
        namespace: project + '-'
    },

    styles: {
        build: {
            src: src + 'scss/**/*.scss',
            dest: build
        },
        compiler: 'libsass',
        autoprefixer: {browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']},
        minify: {safe: true},
        rubySass: {
            loadPath: ['./src/scss', dev, modules],
            precision: 6,
            sourcemap: true
        },
        libsass: {
            includePaths: ['./src/scss', dev, modules],
            precision: 6,
            onError: function (err) {
                return console.log(err);
            }
        }
    },

    theme: {
        lang: {
            src: src + 'languages/**/*',
            dest: build + 'languages/',
            srcgen: src + 'languages/'
        }
    },

    utils: {
        clean: [build + '**/.DS_Store'],
        wipe: [dist],
        dist: {
            src: [build + '**/*', '!' + build + '**/*.map'],
            dest: dist
        },
        normalize: {
            src: modules + 'normalize.css/normalize.css',
            dest: src + 'scss/vendor/normalize',
            rename: '_normalize.scss'
        }
    },

    watch: {
        src: {
            styles: src + 'scss/**/*.scss',
            scripts: src + 'js/**/*.js',
            theme: src + '**/*.php'
        },
        watcher: 'browsersync'
    }
}
