const { validate } = require('schema-utils');
const child_process = require('child_process');
const process = require('process');
const stream = require('stream');

const pluginName = 'MelangeWebpackPlugin';

const schema = {
  type: 'object',
  properties: {
    sourceDirs: {
      type: 'array',
      items: {type: 'string'},
      minItems: 1
    },
    buildCommand: {
      type: 'string'
    }
  },
};

const defaultOptions = {
  buildCommand: 'esy bsb -make-world'
}

module.exports = class MelangeWebpackPlugin {
  constructor(options = {}) {
    options = Object.assign({}, defaultOptions, options)

    validate(schema, options, {
      name: 'MelangeWebpackPlugin',
      baseDataPath: 'options',
    });

    this.sourceDirs = options.sourceDirs;
    this.buildCommand = options.buildCommand;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      const logger = compilation.getLogger(pluginName);
      logger.debug('starting thisCompilation hook')

      compilation.hooks.additionalAssets.tapAsync(pluginName, (callback) => {
        try {
          logger.debug('starting bsb')

          child_process.execSync(this.buildCommand, { stdio: 'inherit'});
          callback();

        } catch (e) {
          logger.error('compilation failed')

          //callback(new Error('[melange-webpack-plugin] Compilation failed'));
          callback();
        }
      });
    });

    compiler.hooks.afterCompile.tap(pluginName, compilation => {
      const logger = compilation.getLogger(pluginName);

      this.sourceDirs.forEach(dir => {
        logger.debug('adding '+dir+' to watch list')

        compilation.contextDependencies.add(dir);
      });
    });
  }
}
