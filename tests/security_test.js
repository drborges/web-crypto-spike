import HKDF from 'hkdf'
import {expect} from 'chai'
import CryptoJS from 'crypto-js'

describe('Unseen Chat Security', () => {

  it('generates HMAC keys', () => {
    let message = 'my plain text'
    let hkdfMacKey = 'the HKDF mac key'
    let hmac = CryptoJS.HmacSHA256(message, hkdfMacKey).toString()

    console.log('HMAC', hmac)
  })

  it('encrypts message using AES algorithm', () => {
    let secret = 'my-async-key'
    let message = 'my plain text'
    let opts = { mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding }
    let encrypted = CryptoJS.AES.encrypt(message, secret, opts)
    let decrypted = CryptoJS.AES.decrypt(encrypted, secret, opts)

    expect(decrypted.toString(CryptoJS.enc.Utf8)).to.be.equal(message)
  })

  it('generates cipher and mac keys through HKDF based on the master token', () => {

    let salt = new Buffer('00000000000000000000000000000000', 'hex')
    let masterToken = new Buffer('masterToeken', 'hex')
    let info = new Buffer('UnseenText', 'hex')

    let hkdf = new HKDF('sha256', salt, masterToken);
    hkdf.derive(info, 64, function(key) {
      let cipherKey = key.slice(0, 32)
      let macKey = key.slice(32, 64)

      console.log("cipherKey:", cipherKey.toString('ascii'), "macKey", macKey.toString('ascii'))
    });
  })
})
