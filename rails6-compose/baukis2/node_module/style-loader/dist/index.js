"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _isEqualLocals = _interopRequireDefault(require("./runtime/isEqualLocals"));

var _options = _interopRequireDefault(require("./options.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loaderApi = () => {};

loaderApi.pitch = function loader(request) {
  const options = _loaderUtils.default.getOptions(this);

  (0, _schemaUtils.default)(_options.default, options, {
    name: 'Style Loader',
    baseDataPath: 'options'
  });
  const insert = typeof options.insert === 'undefined' ? '"head"' : typeof options.insert === 'string' ? JSON.stringify(options.insert) : options.insert.toString();
  const injectType = options.injectType || 'styleTag';
  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : false;
  delete options.esModule;

  switch (injectType) {
    case 'linkTag':
      {
        const hmrCode = this.hot ? `
if (module.hot) {
  module.hot.accept(
    ${_loaderUtils.default.stringifyRequest(this, `!!${request}`)},
    function() {
     ${esModule ? `update(content);` : `var newContent = require(${_loaderUtils.default.stringifyRequest(this, `!!${request}`)});

           newContent = newContent.__esModule ? newContent.default : newContent;

           update(newContent);`}
    }
  );

  module.hot.dispose(function() {
    update();
  });
}` : '';
        return `${esModule ? `import api from ${_loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/injectStylesIntoLinkTag.js')}`)};
            import content from ${_loaderUtils.default.stringifyRequest(this, `!!${request}`)};` : `var api = require(${_loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/injectStylesIntoLinkTag.js')}`)});
            var content = require(${_loaderUtils.default.stringifyRequest(this, `!!${request}`)});

            content = content.__esModule ? content.default : content;`}

var options = ${JSON.stringify(options)};

options.insert = ${insert};

var update = api(content, options);

${hmrCode}

${esModule ? 'export default {}' : ''}`;
      }

    case 'lazyStyleTag':
    case 'lazySingletonStyleTag':
      {
        const isSingleton = injectType === 'lazySingletonStyleTag';
        const hmrCode = this.hot ? `
if (module.hot) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = ${_isEqualLocals.default.toString()};
    var oldLocals = content.locals;

    module.hot.accept(
      ${_loaderUtils.default.stringifyRequest(this, `!!${request}`)},
      function () {
        ${esModule ? `if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              if (update && refs > 0) {
                update(content);
              }` : `var newContent = require(${_loaderUtils.default.stringifyRequest(this, `!!${request}`)});

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (!isEqualLocals(oldLocals, newContent.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = newContent.locals;

              if (update && refs > 0) {
                update(newContent);
              }`}
      }
    )
  }

  module.hot.dispose(function() {
    if (update) {
      update();
    }
  });
}` : '';
        return `${esModule ? `import api from ${_loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/injectStylesIntoStyleTag.js')}`)};
            import content from ${_loaderUtils.default.stringifyRequest(this, `!!${request}`)};` : `var api = require(${_loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/injectStylesIntoStyleTag.js')}`)});
            var content = require(${_loaderUtils.default.stringifyRequest(this, `!!${request}`)});

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }`}

var refs = 0;
var update;
var options = ${JSON.stringify(options)};

options.insert = ${insert};
options.singleton = ${isSingleton};

var exported = {};

exported.locals = content.locals || {};
exported.use = function() {
  if (!(refs++)) {
    update = api(content, options);
  }

  return exported;
};
exported.unuse = function() {
  if (refs > 0 && !--refs) {
    update();
    update = null;
  }
};

${hmrCode}

${esModule ? 'export default' : 'module.exports ='} exported;`;
      }

    case 'styleTag':
    case 'singletonStyleTag':
    default:
      {
        const isSingleton = injectType === 'singletonStyleTag';
        const hmrCode = this.hot ? `
if (module.hot) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = ${_isEqualLocals.default.toString()};
    var oldLocals = content.locals;

    module.hot.accept(
      ${_loaderUtils.default.stringifyRequest(this, `!!${request}`)},
      function () {
        ${esModule ? `if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);` : `var newContent = require(${_loaderUtils.default.stringifyRequest(this, `!!${request}`)});

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.id, newContent, '']];
              }

              if (!isEqualLocals(oldLocals, newContent.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = newContent.locals;

              update(newContent);`}
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}` : '';
        return `${esModule ? `import api from ${_loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/injectStylesIntoStyleTag.js')}`)};
            import content from ${_loaderUtils.default.stringifyRequest(this, `!!${request}`)};` : `var api = require(${_loaderUtils.default.stringifyRequest(this, `!${_path.default.join(__dirname, 'runtime/injectStylesIntoStyleTag.js')}`)});
            var content = require(${_loaderUtils.default.stringifyRequest(this, `!!${request}`)});

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }`}

var options = ${JSON.stringify(options)};

options.insert = ${insert};
options.singleton = ${isSingleton};

var update = api(content, options);

${hmrCode}

${esModule ? 'export default' : 'module.exports ='} content.locals || {};`;
      }
  }
};

var _default = loaderApi;
exports.default = _default;