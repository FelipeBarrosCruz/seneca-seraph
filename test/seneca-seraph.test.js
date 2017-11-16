'use strict'

const Lab = require('lab')
const Seneca = require('seneca')
const SenecaSeraphPlugin = require('../')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = require('chai').expect

let senecaInstance = null

var createSenecaInstance = function () {
  const seneca = Seneca()
  return seneca.use(SenecaSeraphPlugin, {
    pass: '1q2w3e4r'
  })
}

describe('seneca-seraph', function () {
  before({}, function (done) {
    senecaInstance = createSenecaInstance()
    if (senecaInstance < '3.0.0') {
      return done(null)
    }
    senecaInstance.ready(done)
  })

  it('Expect to have seneca instance', (done) => {
    expect(senecaInstance).not.equal(null)
    done(null)
  })

  it('Expect to have seraph plugin instance', (done) => {
    expect(senecaInstance.seraph).not.equal(undefined)
    done(null)
  })

  it('Expect to have query in seraph plugin instance', (done) => {
    const seraph = senecaInstance.seraph
    expect(seraph.query).not.equal(undefined)
    expect((typeof seraph.query)).equal('function')
    done(null)
  })

  it('Expect to have queryRaw in seraph plugin instance', (done) => {
    const seraph = senecaInstance.seraph
    expect(seraph.queryRaw).not.equal(undefined)
    expect((typeof seraph.queryRaw)).equal('function')
    done(null)
  })
})
