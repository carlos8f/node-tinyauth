var tinyauth = require('./')
  , assert = require('assert')

function fakeReq (headers) {
  return {
    headers: headers || {}
  };
}

function fakeRes (onEnd) {
  return {
    writeHead: function (status, headers) {
      this.statusCode = status;
      this.headers = headers;
    },
    write: function () {

    },
    end: function () {
      if (onEnd) onEnd();
    }
  };
}

var plan = 2;
var tests = [
  function (done) {
    var req = fakeReq();
    var res = fakeRes(function () {
      assert.equal(res.statusCode, 401);
      plan--;
      done();
    });
    tinyauth({
      realm: 'MY TEST',
      accounts: ['admin:one2three']
    })(req, res, assert.fail);
  },
  function (done) {
    var req = fakeReq({
      authorization: 'Basic Og=='
    });
    var res = fakeRes(function () {
      assert.equal(res.statusCode, 401);
      plan--;
      done();
    });
    tinyauth({
      realm: 'MY TEST',
      accounts: ['admin:one2three']
    })(req, res, assert.fail);
  }
];

(function nextTest (err) {
  assert.ifError(err);
  var test = tests.shift();
  if (test) test(nextTest);
  else assert.equal(plan, 0);
})();
