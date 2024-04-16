import notifier from 'node-notifier'

const INTERVAL = 1000 * 10
const TARGET = 'PURR/USDC'

type SpotMetaResponse = {
  universe: Array<{
    index: number,
    name: string
  }>
}

const checkExistsPurr = (response: SpotMetaResponse) => {
  return response.universe.findIndex(u => u.name === TARGET) !== -1
}

const run = async () => {
  const response = await fetch('https://api-ui.hyperliquid.xyz/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({type: 'spotMeta'})
  }).then(r => r.json())  as SpotMetaResponse

  if (checkExistsPurr(response)) {
    console.log(new Date(), 'FOUND!')
    notifier.notify({title: 'FOUND🔥', message: `Found ${TARGET}`})
  } else {
    console.log(new Date(), 'NOT FOUND!')
    setTimeout(() => {
      run()
    }, INTERVAL)
  }
}

run()
