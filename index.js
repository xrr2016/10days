const r2 = require('r2')
const schedule = require('node-schedule')

const SEND_URL = `https://oapi.dingtalk.com/robot/send?access_token=`
const ACCESS_TOKEN = '828107a72c581e39daa9ab75597796ed5116d62d87f494da5af72e64d1b0c2f7'

const IMG_URL = 'https://bing.ioliu.cn/v1/rand?type=json'

const JOB_TIME = {
	morning: {
		hour: 8,
		minute: 58,
		second: 0
	},
	evening: {
		hour: 6,
		minute: 1,
		second: 0
	}
}

async function getImg() {
	const json = await r2.get(IMG_URL).json
	const url = json.data.url.replace('1920x1080', '320x240')
	return url
}

async function sendMessage(message) {
	if (!message) {
		return
	}
	const url = `${SEND_URL}${ACCESS_TOKEN}`
	const response = await r2.post(url, { json: message }).response
}

const signInJob = schedule.scheduleJob(JOB_TIME.morning, async date => {
	const img = await getImg()
	const message = {
		msgtype: 'markdown',
		markdown: {
			title: '上班的时间到了，快去签到吧',
			text: `
                > 上班喽 😗
                > ![](${img})
            `
		},
		at: {
			isAtAll: false
		}
	}
	sendMessage(message)
})

const signUpJob = schedule.scheduleJob(JOB_TIME.evening, async date => {
	const img = await getImg()

	const message = {
		msgtype: 'markdown',
		markdown: {
			title: '下班的时间到了，快去签到吧',
			text: `
                > 下班回家喽 😎
                > ![](${img})
            `
		},
		at: {
			isAtAll: false
		}
	}

	sendMessage(message)
})
