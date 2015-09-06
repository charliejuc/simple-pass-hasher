'use strict'

/*----------------------------*/
//simple-pass-hasher
//Author: Juan Carlos Fernández || @Charliejuc
/*----------------------------*/

const crypto = require('crypto')

module.exports = function (options) {
	options = options || {}
	let password = options.password
	let algorithm = options.algorithm || 'sha1'
	let encoding = options.encoding || 'utf8'
	let hmac = options.hmac || false

	isStringExcept(algorithm, 'Algorithm')
	isStringExcept(encoding, 'Encoding')

	function isStringExcept (bar, name) {
		if ( ! isString(bar) ) {
			throw new Error(`${name} must be a string: ${typeof(bar)} given`)
		}
	}

	function getHash () {
		return crypto.createHash(algorithm)
	}

	function getHmac () {		
		if ( ! options.key ) throw new Error('Key is required')

		let key = isObject(options.key) ? JSON.stringify(options.key) : options.key

		isStringExcept(key, 'Key')

		return crypto.createHmac(algorithm, key)
	}

	function digest (pw) {
		pw = pw || password

		if ( ! pw ) throw new Error('Password is required')

		pw = isObject(pw) ? JSON.stringify(pw) : pw

		isStringExcept(pw, 'Password')

		let hash = hmac ? getHmac() : getHash()

		hash.update(pw)

		return hash.digest().toString(encoding)
	}

	function hashCompare (unencoded, encoded) {
		if ( ! unencoded || ! encoded ) 
			throw new Error('Encoded and unencoded passwords are required')

		let genPass = digest(unencoded)

		return ! genPass ? undefined : genPass === encoded
	}

	function isObject (bar) {
		let object = {}

		return isFoo(bar, object)
	}

	function isString (bar) {
		let string = ''

		return isFoo(bar, string)
	}

	function isFoo (bar, comparator) {
		if (typeof(bar) != typeof(comparator)) return false

		return bar.constructor === comparator.constructor
	}

	return password ? {
		digest: digest(),
		compare: hashCompare
	} : {
		compare: hashCompare
	}
}