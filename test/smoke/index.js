const path = require('path');
const webpack = require('webpack');
const Mocha = require('mocha');
const rimraf = require('rimraf');

const mocha = new Mocha({
    timeout: '10000ms'
});

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod');

    webpack(prodConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.error(err);
            console.error(stats.toString());
            process.exit(2);
        }
        console.log(stats.toString({
            color: true,
            modules: false,
            children: false
        }));

        console.log('Webpack build success, begin run test...');
        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        mocha.run(failures => {
            process.exit(failures);
        })
    })
})

