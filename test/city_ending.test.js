const cityEnding = require('../lib/city_ending');
const assert = require( 'assert' );

describe( 'cityEnding', () => {
  it( 'attaches a city ending', () => {
    assert.equal( cityEnding( 'Portland' ), 'Portlandian' );
    assert.equal( cityEnding( 'Seattle' ), 'Seattleite' );
    assert.equal( cityEnding( 'New York' ), 'New Yorkers' );
  });
});

