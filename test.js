import fetch from './fetch'
import got from 'got'
import test from 'blue-tape'

const res = fetch()

test('Fetches champions list from League of Legends API', (t) => res.then((champions) => {
  t.assert(Array.isArray(champions), 'champions is an array')
}))

test('Adds "id"', (t) => res.then((champions) => {
  let champion = champions[0]
  t.assert(/[a-z ]/.test(champion.id), 'id property is a lower cased string')
}))

test('Transmutes "image" object into an valid URL', (t) => res
.then((champions) => {
  let champion = champions[0]
  t.assert(!champion.image, 'image property is gone')
  t.equal(typeof champion.sprite, 'object', 'sprite property is an object')
  t.equal(typeof champion.sprite.x, 'number', 'sprite.x property contains x-coordinate')
  t.equal(typeof champion.sprite.y, 'number', 'sprite.y property contains y-coordinate')
  return champion
})
.then((champion) => got(champion.icon)))

test('Renames "blurb" to "description"', (t) => res.then((champions) => {
  let champion = champions[0]
  t.assert(champion.description, 'description is present')
  t.assert(!champion.blurb, 'blurb property is gone')
}))

test('Keeps a set of properties', (t) => res.then((champions) => {
  let champion = champions[0]
  t.assert(!champion.version, 'version property is gone')
  t.assert(!champion.info, 'info property is gone')
  t.assert(!champion.blurb, 'blurb property is gone')
  t.assert(!champion.partype, 'partype property is gone')
}))
