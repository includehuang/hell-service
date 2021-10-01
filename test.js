const NodeRSA = require('node-rsa')

const key = '-----BEGIN RSA PRIVATE KEY-----' +
    'MIIBPQIBAAJBANEYhMO/mFJPdmDuE0pV7aDFX2s7i7Uxvvnsus5UkotDPLeA3X0O' +
    'B6KR4XLxk3a2ypX7o6AsLoinfC+zM+I1w1cCAwEAAQJBALIsZ216BO0WozQDitKM' +
    'GDooFaAFlI3o/uhuzdvl+x3IugB58Kbks34dyPlOsG2DCCj+k99Z+s267ALJSV1G' +
    '28kCIQDxHIYwqlvAzBh93zalPF+eChhuIHIxn1h4CT/ntvKgRQIhAN4B5JQ9Oso5' +
    'V9eM2wZzDsT2r1XyFSNG9EnfEdourlTrAiEA2XZ1nUz5hlFOQbDiE3P5dYv7btA6' +
    'zoC+hT0qcy4xdNUCIQC2Wmmtlamfh4BureUOJB3ijRmyB7lzE4n+z3qzcxqA5wIh' +
    'ANvLWUvLjR+jUbkC/2ERETqFXB1+tLEZ8pyXAYUBNVKA' +
    '-----END RSA PRIVATE KEY-----'

const text = 'f4DV78sf4sp0gT3H9Z6e3pDn3Wc0+MHl9kqWx/Xc+Qq02wZMbzAKPtzHw8DI5P/2MXPlDC3lZFtpELk3UKw6Dg=='
const tttt = 'f4DV78sf4sp0gT3H9Z6e3pDn3Wc0+MHl9kqWx/Xc+Qq02wZMbzAKPtzHw8DI5P/2MXPlDC3lZFtpELk3UKw6Dg=='

const RSA = new NodeRSA(key)
console.log(RSA.decrypt(text, 'utf8'))