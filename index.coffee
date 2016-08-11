###
paras: what to log, if an object then it will be deeply inspected
###

if typeof process == 'undefined'
  debug = false
else
  debug = if process.env['NODE_DEBUG'] then true else false


module.exports = (paras...)->

  ts = do ->
    dateTs = new Date()
    sts = (dateTs + "")
    sms = '' + dateTs.getMilliseconds()
    pad = (3-sms.length)
    (sms = '0' + sms) for i in [0...pad]
    sts.slice(4, 24) + "." + sms + sts.slice(24, 33)
  inspect = (obj, opt)->
    if typeof window == 'undefined'
      util  = require 'util'
      util.inspect obj, opt
    else if module.exports.inspect
      module.exports.inspect obj, opt
    else
      JSON.stringify(obj)


  msg = ((if typeof para == "object" then inspect(para, {depth: 10}) else "#{para}") \
    for para in paras).join('')

  if debug
    e = new Error("")
    locLine = e.stack.split("\n")[2]
    m = /\((.*?):(\d+:\d+)\)/.exec(locLine)
    if not m then m = /at (.*?):(\d+:\d+)/.exec(locLine)
    if m
      [file, offsets] = [m[1], m[2]]
      console.log "[#{ts}](#{file}:#{offsets}) #{msg} "
    else

      console.log "[#{ts}](#{e.stack}) #{msg} "
  else
    console.log "[#{ts}] #{msg} "
