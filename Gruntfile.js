module.exports = function(grunt) {
  grunt.initConfig({
    bowerpath: 'bower_components',
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'assets/scss',
          cssDir: 'assets/css',
          javascriptsDir: 'assets/js',
          config: 'config.rb'
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js', 'js/app.js'] },

      scss: {
        files: ['assets/scss/*.scss', 'assets/scss/**/*.scss', 'assets/scss/**/**/*.scss'],
        tasks: ['compass', 'postcss']
      },

      js: {
        files: ['assets/js/app.js'],
        tasks: ['jshint', 'uglify', 'concat']
      },
    },

    uglify: {
       options: {
        compress: {
          drop_console: true
        }
      },
      dist: {
          files: {
          'assets/js/app.min.js': ['assets/js/app.js']
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'assets/js/app.js'],
    },

    postcss: {
      options: {
        processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        require('cssnano')() // minify the result
      ]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: 'block',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      dist: {
        src: ['assets/js/angular/angular.min.js', 'assets/js/angular/angular-route.min.js', 'assets/js/bootstrap/javascripts/bootstrap.min.js', 'assets/js/app.js'],
        dest: 'assets/js/app.min.js',
      },
    },

  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch', 'uglify', 'compass', 'concat', 'jshint', 'postcss']);
};