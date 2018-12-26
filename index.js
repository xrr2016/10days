const r2 = require('r2')
const schedule = require('node-schedule')

require('dotenv').config()

async function getCatImg() {
	const data = await r2.get(process.env.CAT_API).json
	return data[0].url
}

const URL = `${process.env.SEND_URL}${process.env.ACCESS_TOKEN}`
const LUNCH_CHOICES = ['湘缘木桶饭', '云姐餐厅', '食堂一楼', '食堂二楼', '黄焖鸡米饭']

async function sendMessage(message) {
	if (!message) {
		return
	}
	const response = await r2.post(URL, {
		json: message
	}).response
}

schedule.scheduleJob({
		hour: 8,
		minute: 55,
		second: 1,
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '快去签到吧！😗'
			},
			at: {
				isAtAll: true
			}
		}
		sendMessage(message).catch(() => {})
	}
)

schedule.scheduleJob({
		hour: 9,
		minute: 0,
		second: 1,
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '上班的时间到了',
				text: `### 上班喽, 不要在划水了。😗`
			},
			at: {
				isAtAll: true
			}
		}

		sendMessage(message).catch(() => {})
	}
)

schedule.scheduleJob({
		hour: 11,
		minute: 45,
		second: 1,
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const lunch = LUNCH_CHOICES[Math.floor(Math.random() * LUNCH_CHOICES.length)]
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '吃饭的时间到了',
				text: `### 吃饭喽，今天中午去${lunch}。🍚 `
			},
			at: {
				isAtAll: true
			}
		}

		sendMessage(message).catch(() => {})
	}
)

schedule.scheduleJob({
		hour: 17,
		minute: 0,
		second: 10,
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const cat = await getCatImg()

		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '每日一猫🐱',
				text: `![](${cat})`
			},
			at: {
				isAtAll: true
			}
		}

		sendMessage(message).catch(() => {})
	}
)

schedule.scheduleJob({
		hour: 18,
		minute: 0,
		second: 10,
		dayOfWeek: new schedule.Range(1, 5)
	},
	async date => {
		const message = {
			msgtype: 'markdown',
			markdown: {
				title: '下班的时间到了，快去签到吧',
				text: `### 回家喽 😎 \n ${date}`
			},
			at: {
				isAtAll: true
			}
		}

		sendMessage(message).catch(() => {})
	}
)