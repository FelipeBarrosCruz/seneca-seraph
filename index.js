/*
  * @Name: SenecaSeraph
  * @Description: Seneca plugin for Seraph Lib to connect a Neo4j Database
  * @Author: FelipeBarrosCruz<felipe.barros.pt@gmail.com>
  * @Version: 1.0
  * @Date? [2017-11-15]
*/

module.exports = function SenecaSeraph (options) {
  const name = 'seneca-seraph'
  const seneca = this
  const seraph = require('seraph')
  const async = require('async')
  const _ = require('lodash')
  const defaultOptions = {
    server: 'http://localhost:7474',
    user: 'neo4j',
    pass: 'neo4j'
  }
  const logger = seneca.log || _logger()

  seneca.add({role: name, cmd: 'connection'}, cmd_connection)

  seneca.add({ init: name }, (args, done) => {
    seneca.act({ role: name, cmd: 'connection' }, (err, connection) => {
      if (err) return seneca.die(err)
      seneca.decorate('seraph', connection)
      return done(null)
    })
  })

  function cmd_connection (args, done) {
    async.retry({ times: 5, timeout: 1000 }, tryToConnect, (err, connection) => {
      if (err) return done(err)
      return done(null, connection)
    })
  }

  function tryToConnect (done) {
    const connection = seraph(_.merge({}, defaultOptions, options))
    connection.query('MATCH (n) RETURN n;', (err, result) => {
      if (err) {
        logger.error(err.message)
        return done(err)
      }
      logger.info('Connection succeeded')
      return done(null, connection)
    })
  }

  function _logger () {
    function log (type) {
      return (message) => {
        console.log('[%s] - Seneca Seraph Internal %s: %s', new Date().toISOString(), type, message)
      }
    }
    return {
      error: log('Error'),
      info: log('Info'),
      warn: log('Warn'),
      debug: log('Debug')
    }
  }

  return {
    name: name
  }
}
