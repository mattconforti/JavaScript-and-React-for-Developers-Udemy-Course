module.exports = function(grunt) {
    grunt.initConfig({
        name: 'classroom',
        watch: {
            files: ['*.js', '*.css'],
            task: ['updated']
        },
        uglify: {
            build: {
                src: ['index.js', 'logger.js'],
                dest: 'dist/bundle.js'
            }
        },
        babel: {  // BABEL TASK HERE TO TRANSPILE TO OLDER ECMAScript VERSIONS
            options: {
              sourceMap: true,  // sourcemap created each time!!
              presets: ['@babel/preset-env']
            },
            dist: {
              files: {
                // only does 1 file?? - make it the uglified file
                // can possibly make it do more than 1 file with expand: true
                // but may mess up sourceMap having more than 1 file transpiled
                'dist/babel_converted_app.js': 'dist/bundle.js'
              }
            }
          }
    });

    // file updated here (to test watch task)

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('updated', () => {
        grunt.log.writeln(`It updated again!`);
    });


    grunt.registerTask('default', () => {
        grunt.log.writeln(`Hello, ${grunt.config.get("name")}!`);
    });

    grunt.registerTask('default', ['babel']);
};