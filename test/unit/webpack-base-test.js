const assert = require('assert');

describe('webpack-base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base');

    console.log(baseConfig);

    it('entry', () => {
        assert.equal(baseConfig.entry.index, 'F:/workSpace_test/test/webpack-learn/builer-webpack/test/smoke/template/src/pages/index/index.js');
        assert.equal(baseConfig.entry.search, 'F:/workSpace_test/test/webpack-learn/builer-webpack/test/smoke/template/src/pages/search/index.js');
    })
})