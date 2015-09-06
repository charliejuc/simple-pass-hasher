# Simple Pass Hasher

## How to use it?
### Basic Usage

**[ Hasher(opts) ]**

```

	'use strict'

	const hasher = require('simple-pass-hasher')

	const fooHash = hasher({
			password: 'fooPassword',
			key: 'fooSecret', 
			algorithm: 'sha1', 
			encoding: 'utf8', 
			hmac: true 
		})

	let digest = fooHash.digest //Return encrypted string

	fooHash.compare('fooPassword', digest) //This will return true

	fooHash.compare('foopassword', digest) //This will return false

	fooHash.compare('otherPassword', digest) //This will return false
```

### Passing Object As Key or String
```

	'use strict'

	const hasher = require('simple-pass-hasher')

	const fooHash = hasher({
			password: { username: '@charliejuc', password: '123456' },
			key: { home: 'It\'s a good place', hey: 'All this json will be used as key' }, 
			algorithm: 'sha1', 
			encoding: 'utf8', 
			hmac: true 
		})

	let digest = fooHash.digest //Return encrypted string

	fooHash.compare({ username: '@charliejuc', password: '123456' }, digest) 
	//This will return true

	fooHash.compare(JSON.stringify({ username: '@charliejuc', password: '123456' }), digest) 
	//This will return true

### Only compare function

```
	
	// Now, we don't pass string
	const fooHash = hasher({
			key: 'fooSecret', 
			algorithm: 'sha256', 
			encoding: 'base64', 
			hmac: true
		})

	// Now, we don't have fooHash.digest property

	fooHash.compare('decoded value of fooBase64StrEncoded', fooBase64StrEncoded) //This will return true

	fooHash.compare('other thing', fooBase64StrEncoded) //This will return false

```

### Without HMAC

```
	
	// Now, we don't need a key
	const fooHash = hasher({
			password: 'fooPassword',			
			algorithm: 'sha256', 
			encoding: 'base64', 
			hmac: false
		})
	
	let digest = fooHash.digest

	fooHash.compare('fooPassword', digest) //This will return true

```

### Options
* **password[?]:** String to encrypt, if not pass it, hasher will only return compare ignoring the digest
* **algorithn[?]:** The algorithm used for encrypting (sha1, sha256...) - Default value is **"sha1"**
* **encoding[?]:** This will determine the output format of the string after the hash - Default value is **"utf8"**
* **hmac[?]:** If this is false, going to use "createHash" method, otherwise use "createHmac" - Default is **false**
* **key[?]:** Encryption key used (Only is valid if hmac is true)