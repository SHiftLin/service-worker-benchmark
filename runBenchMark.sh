pkill npm >/dev/null 2>&1 &
npm run serve >/dev/null 2>&1 &

node webvisit.js
node webvisit.js --fetch
node webvisit.js --firefox
node webvisit.js --firefox --fetch

pkill npm >/dev/null 2>&1 &
