const {Webhook} = require('discord-webhook-node')

const hook_errors = new Webhook('https://discord.com/api/webhooks/1228723362344341566/wLRrVtK38iWx068YEqv8nefQDLNOKwQL7FMWbLkfj6f_MbBqsUQ-LffybsvoFCsaZU35')
hook_errors.setUsername('RESTFUL Final - Errores')
hook_errors.setAvatar('https://miro.medium.com/v2/resize:fit:880/1*J3G3akaMpUOLegw0p0qthA.png')

const hook_updates = new Webhook('https://discord.com/api/webhooks/1228723362344341566/wLRrVtK38iWx068YEqv8nefQDLNOKwQL7FMWbLkfj6f_MbBqsUQ-LffybsvoFCsaZU35')
hook_updates.setUsername('RESTFUL Final - Updates')
hook_updates.setAvatar('https://miro.medium.com/v2/resize:fit:880/1*J3G3akaMpUOLegw0p0qthA.png')

module.exports = {
    hook_errors,
    hook_updates
}