const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@routes': 'src/app/routes',
        '@components': 'src/presentation/components',
        '@pages': 'src/presentation/pages',
        '@utils': 'src/app/utils',
        "@repository": "src/data/repositories",
        "@data": "src/data",
        "@redux": "src/app/redux",
        '@entity': 'src/domain/entities',
        '@usecases': 'src/domain/usecases',
        '@presentation': 'src/presentation',
        '@app': 'src/app',
        '@domain': 'src/domain'
    })(config);

    return config;
};