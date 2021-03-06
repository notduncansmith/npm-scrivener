var path = require('path')
  , dir = process.cwd()
  , fs = require('fs')
  , appName = '/'
  , colors = require('colors')
  , ncp = require('ncp');

module.exports = {

  setup: function (app) {
    appName = app;
  },

  touch: function (filePath) {
    if (filePath instanceof Array) {
      var realPath = path.join(dir, appName, path.normalize(filePath.join('/')));
    } else {
      var realPath = path.join(dir, appName, filePath);
    }
    
    fs.writeFile(realPath, '', function (err){
      if (err) {
        console.log("Error generating ".red + realPath.red + " directory:\n\n".red + err);
        throw err;
      }
      console.log("Successfully generated ".green + realPath)
    });
  },

  mkDir: function (filePath, cb) {
    if (filePath instanceof Array) {
      var realPath = path.join(dir, appName, path.normalize(filePath.join('/')));
    } else {
      var realPath = path.join(dir, appName, filePath);
    }
    

    fs.mkdir(realPath, function (err){
      if (err) {
        console.log("Error generating ".red + realPath.red + " directory:\n\n".red + err);
        throw err;
      }
      if (cb) {
        cb();
      }
    });
  },

  write: function (filePath, content, cb) {
    if (filePath instanceof Array) {
      var realPath = path.join(dir, appName, path.normalize(filePath.join('/')));
    } else {
      var realPath = path.join(dir, appName, filePath);
    }
    realPath = path.normalize(realPath);

    fs.writeFile(realPath, content, function (err) {
      if (err) {
        console.log("Error generating ".red + realPath.red + ":\n\n".red + err);
        throw err;
      }
      console.log("Successfully wrote to ".green + realPath)
      if (cb) {
        cb();
      }
    });
  },

  readFile: function(filePath) {
    console.log(filePath)
    if (filePath instanceof Array) {
      var realPath = path.join(dir, appName, path.normalize(filePath.join('/')));
    } else {
      var realPath = path.join(dir, appName, filePath);
    }
    realPath = path.normalize(realPath);
    console.log(realPath)

    return fs.readFileSync(realPath, 'utf-8') || "Unable to read file";
  },

  append: function(filePath, data, cb) {
    if (filePath instanceof Array) {
      var realPath = path.join(dir, appName, path.normalize(filePath.join('/')));
    } else {
      var realPath = path.join(dir, appName, filePath);
    }

    fs.appendFile(realPath, data, function (err){
      if (err) {
        console.log("Error generating ".red + realPath.red + ":\n\n".red + err);
        throw err;
      }
      if (cb) {
        cb();
      }
    })
  },

  copyDir: function(source, destination) {
    if (source instanceof Array) {
      var realSource = path.join(dir, appName, path.normalize(source.join('/')));
    } else {
      var realSource = path.join(dir, appName, source);
    }

    if (destination instanceof Array) {
      var realDestination = path.join(dir, appName, path.normalize(destination.join('/')));
    } else {
      var realDestination = path.join(dir, appName, destination);
    }

    ncp.limit = 16;
    ncp(realSource, realDestination, function (err){
      if (err) {
        console.log("Unable to copy ".red + realSource + " to ".red + realDestination);
        throw err;
      }
      console.log("Successfully copied ".green + realSource + " to ".green + realDestination);
    })
  }
}