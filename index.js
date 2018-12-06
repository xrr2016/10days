const r2 = require('r2')
const schedule = require('node-schedule')

require('dotenv').config()

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

async function getImg() {
	const json = await r2.get(process.env.IMG_URL).json
	const url = json.data.url.replace('1920x1080', '320x240')
	return url
}

const URL = `${process.env.SEND_URL}${process.env.ACCESS_TOKEN}`

async function sendMessage(message) {
	if (!message) {
		return
	}
	const response = await r2.post(URL, {
		json: message
	}).response
}

schedule.scheduleJob(
	{
		hour: 8,
		minute: 55,
		second: randomNum(1, 59),
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const img = await getImg().catch(() => {})
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '上班的时间到了，快去签到吧',
				text: `### 上班喽 😗 \n ![img](${img})`
			},
			at: {
				isAtAll: false
			}
		}

		sendMessage(message).catch(() => {})
		console.log('date :', date)
	}
)

schedule.scheduleJob(
	{
		hour: 11,
		minute: 45,
		second: randomNum(1, 59),
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const img = await getImg().catch(() => {})
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '吃饭的时间到了',
				text: `### 吃饭喽 🍚 \n  ![img](${img})`
			},
			at: {
				isAtAll: false
			}
		}

		sendMessage(message).catch(() => {})
		console.log('date :', date)
	}
)

schedule.scheduleJob(
	{
		hour: 18,
		minute: 1,
		second: randomNum(0, 59),
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const img = await getImg().catch(() => {})
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '下班的时间到了，快去签到吧',
				text: `### 回家喽 😎 \n ![](${img})`
			},
			at: {
				isAtAll: false
			}
		}

		sendMessage(message).catch(() => {})
		console.log('date :', date)
	}
)
