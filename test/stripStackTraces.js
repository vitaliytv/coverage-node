'use strict'

module.exports =
  /**
   * Strips error stack traces from a multiline string.
   * @kind function
   * @name stripErrorStack
   * @param {string} string Multiline string.
   * @returns {string} String without error stack traces.
   * @ignore
   */
  function stripStackTraces(string) {
    return string.replace(/^ {2,}at .+\n?/gm, '')
  }
