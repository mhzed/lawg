util  = require 'util'
path  = require "path"

###
paras: what to log, if an object then it will be deeply inspected
###

debug = if process.env['NODE_DEBUG'] then true else false

module.exports = (paras...)->

  ts = do ->
    dateTs = new Date()
    sts = (dateTs + "")
    sms = '' + dateTs.getMilliseconds()
    pad = (3-sms.length)
    (sms = '0' + sms) for i in [0...pad]
    sts.slice(4, 24) + "." + sms + sts.slice(24, 33)

  msg = ((if typeof para == "object" then util.inspect(para, {depth: 10}) else "#{para}") \
    for para in paras).join('')

  if debug
    e = new Error("")
    locLine = e.stack.split("\n")[2]
    m = /\((.*?):(\d+:\d+)\)/.exec(locLine)
    if not m then m = /at (.*?):(\d+:\d+)/.exec(locLine)
    if m
      [file, offsets] = [m[1], m[2]]
      console.log "[#{ts}](#{path.relative(process.cwd(), file)}:#{offsets}) #{msg} "
    else

      console.log "[#{ts}](#{e.stack}) #{msg} "
  else
    console.log "[#{ts}] #{msg} "

module.exports( 1, " word ", new Error("err"), [1,2], { x : 1, y: {a : 2}})