'use strict'

/*----------------------------*/
//simple-pass-hasher
//Author: Juan Carlos Fernández || Charliejuc
/*----------------------------*/

const crypto = require('crypto')

module.exports = function (options, callback) {
	options = options || {}
	let password = options.password
	let algorithm = options.algorithm || 'sha1'
	let encoding = options.encoding
	let hmac = options.hmac || false

	function getHash () {
		return crypto.createHash(algorithm)
	}

	function getHmac () {
		let key = options.key

		if (! key) return callback(new Error('Key is required'))

		return crypto.createHmac(algorithm, key)
	}

	function digest (pw) {
		pw = pw || password

		if (! pw) return callback(new Error('Password is required'))

		pw = isObject(options.password) ? JSON.stringify(pw) : pw

		let hash = hmac ? getHmac() : getHash()

		if ( ! hash ) return

		hash.update(pw)

		return hash.digest().toString(encoding)
	}

	function hashCompare (unencoded, encoded) {
		if ( ! unencoded || ! encoded ) 
			return callback(new Error('Encoded and unencoded passwords are required'))

		let genPass = digest(unencoded)

		return ! genPass ? undefined : genPass === encoded
	}

	function isObject (bar) {
		let object = {}

		if (typeof(bar) === typeof(object)) 
		{
			return bar.constructor === object.constructor
		}

		return false
	}

	return password ? {
		digest: digest(),
		compare: hashCompare
	} : {
		compare: hashCompare
	}
}