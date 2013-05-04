module.exports = function(grunt){

    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            clean: [
                'build/*',
                'doc/*',
                'test/unit/build/*',
                'test/manual/index.htm'
            ],

            concat: {
                build: {
                    options: {
                        stripBanners: true,
                        banner: '/*\n'+
                            '\tLib:\t\t<%= pkg.name %>\n'+
                            '\tVersion:\t<%= pkg.version %>\n'+
                            '\tBuild Date:\t<%= grunt.template.today("yyyy-mm-dd") %>\n'+
                            '\tAuthor:\t\t<%= pkg.author %>\n*/\n\n'+
                            '(function(NS){\n\n',
                        footer: '\n\n})("<%= pkg.name %>");'
                    },
                    src: ['src/**/*.js'],
                    dest: 'build/<%= pkg.name %>.<%= pkg.version %>.dev.js'
                },

                tests:{
                    options: {
                        stripBanners: true,
                        banner: '(function(NS){\n\n',
                        footer: '\n\n})("<%= pkg.name %>");'
                    },
                    src: ['test/unit/src/**/*.js'],
                    dest: 'test/unit/build/<%= pkg.name %>.<%= pkg.version %>.test.js'
                },
                testDevHtml: {
                    options: {
                        stripBanners: true,
                        banner: '<!DOCTYPE html>\n'+
                            '<html>\n'+
                            '<head>\n'+
                            "<meta charset='utf-8'>\n"+
                            '<title><%= pkg.name %> v<%= pkg.version%> - unit test</title>\n'+
                            '<script src="../../../build/<%= pkg.name %>.<%= pkg.version %>.dev.js"></script>\n'+
                            '<script src="../QUnit/QUnit-v1.11.0.js"></script>\n'+
                            '<script src="<%= pkg.name %>.<%= pkg.version %>.test.js"></script>\n'+
                            '<link rel="stylesheet" href="../QUnit/QUnit-v1.11.0.css">\n'+
                            '</head>\n'+
                            '<body>\n'+
                            '<div id="qunit"></div>\n'+
                            '<div id="qunit-fixture"></div>\n'+
                            '</body>\n'+
                            '</html>'
                    },
                    src: [],
                    dest: 'test/unit/build/index.dev.htm'
                },
                testMinHtml: {
                    options: {
                        stripBanners: true,
                        banner: '<!DOCTYPE html>\n'+
                            '<html>\n'+
                            '<head>\n'+
                            "<meta charset='utf-8'>\n"+
                            '<title><%= pkg.name %> v<%= pkg.version%> - unit test</title>\n'+
                            '<script src="../../../build/<%= pkg.name %>.<%= pkg.version %>.min.js"></script>\n'+
                            '<script src="../QUnit/QUnit-v1.11.0.js"></script>\n'+
                            '<script src="<%= pkg.name %>.<%= pkg.version %>.test.js"></script>\n'+
                            '<link rel="stylesheet" href="../QUnit/QUnit-v1.11.0.css">\n'+
                            '</head>\n'+
                            '<body>\n'+
                            '<div id="qunit"></div>\n'+
                            '<div id="qunit-fixture"></div>\n'+
                            '</body>\n'+
                            '</html>'
                    },
                    src: [],
                    dest: 'test/unit/build/index.min.htm'
                },
                manualTestHtml: {
                    options: {
                        stripBanners: true,
                        banner: '<!DOCTYPE html>\n'+
                            '<html>\n'+
                            '<head>\n'+
                            "<meta charset='utf-8'>\n"+
                            '<title><%= pkg.name %> v<%= pkg.version%> - sandbox</title>\n'+
                            '<script src="App.js"></script>\n'+
                            '</head>\n'+
                            '<body>\n'+
                            '</body>\n'+
                            '</html>'
                    },
                    src: [],
                    dest: 'test/manual/build/index.htm'
                },
                manualTestApp: {
                    options: {
                        stripBanners: true,
                        banner: '/*\n'+
                            '\tLib:\t\t<%= pkg.name %>\n'+
                            '\tVersion:\t<%= pkg.version %>\n'+
                            '\tBuild Date:\t<%= grunt.template.today("yyyy-mm-dd") %>\n'+
                            '\tAuthor:\t\t<%= pkg.author %>\n*/\n\n'+
                            '(function(NS){\n\n',
                        footer: '\n\n})("<%= pkg.name %>");'
                    },
                    src: ['src/**/*.js','test/manual/manualTestApp.js'],
                    dest: 'test/manual/build/App.js'
                }
            },

            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> v<%= pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    dead_code: true
                },
                build: {
                    src: 'build/<%= pkg.name %>.<%= pkg.version %>.dev.js',
                    dest: 'build/<%= pkg.name %>.<%= pkg.version %>.min.js'
                }
            },

            yuidoc: {
                compile: {
                    name: '<%= pkg.name %>',
                    description: '<%= pkg.description %>',
                    version: '<%= pkg.version %>',
                    url: '<%= pkg.homepage %>',
                    options: {
                        paths: 'src/',
                        outdir: 'doc/'
                    }
                }
            },

            qunit: {
                all:['test/unit/build/*.htm']
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['clean','concat','uglify','yuidoc','qunit']);
    grunt.registerTask('build', ['clean','concat','uglify']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('doc', ['yuidoc']);

};