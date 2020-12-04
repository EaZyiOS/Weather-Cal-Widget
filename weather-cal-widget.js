async function importWidget() {

      function makeAlert(message,options) {
        const a = new Alert()
        a.message = message
        for (const option of options) { a.addAction(option) }
        return a
      }

      let fm = FileManager.local()
      fm = fm.isFileStoredIniCloud(module.filename) ? FileManager.iCloud() : fm

      const path = fm.joinPath(fm.documentsDirectory(), "Weather Cal code.js")
      const wc = fm.fileExists(path) ? fm.readString(path) : false
      const version = wc ? parseInt(wc.slice(wc.lastIndexOf("//") + 2).trim()) : false

      if (wc && (!version || version < 4)) { return await makeAlert("Please update Weather Cal before importing a widget.",["OK"]).present() }

      if ((await makeAlert("Do you want your widget to be named " + Script.name() + "?",["Yes, looks good","No, let me change it"]).present()) == 1) { return }

      fm.writeString(fm.joinPath(fm.libraryDirectory(), "weather-cal-preferences-" + Script.name()), '{"widget":{"name":"Overall settings","locale":"","units":"metric","preview":"large","padding":"5","widgetPadding":{"top":"","left":"","bottom":"","right":""},"tintIcons":false},"localization":{"name":"Localization and text customization","morningGreeting":"Good Morning, Momin","afternoonGreeting":"Good Afternoon, Momin","eveningGreeting":"Good Evening, Momin","nightGreeting":"Good Night, Momin","nextHourLabel":"Next hour","tomorrowLabel":"Tomorrow","noEventMessage":"","noRemindersMessage":"","durationMinute":"m","durationHour":"h","covid":"{cases} cases, {deaths} deaths, {recovered} recoveries","week":"Week"},"font":{"name":"Text sizes, colors, and fonts","defaultText":{"size":"20","color":"ffffff","font":"code"},"smallDate":{"size":"17","color":"","font":"bold"},"largeDate1":{"size":"30","color":"","font":"bold "},"largeDate2":{"size":"30","color":"","font":"bold "},"greeting":{"size":"30","color":"","font":"bold"},"eventLabel":{"size":"14","color":"","font":"bold"},"eventTitle":{"size":"14","color":"","font":"bold"},"eventLocation":{"size":"14","color":"","font":"bold"},"eventTime":{"size":"14","color":"ffffffcc","font":"bold"},"noEvents":{"size":"30","color":"","font":"bold"},"reminderTitle":{"size":"14","color":"","font":"bold"},"reminderTime":{"size":"14","color":"ffffffcc","font":"bold"},"noReminders":{"size":"30","color":"","font":"bold"},"largeTemp":{"size":"34","color":"","font":"bold"},"smallTemp":{"size":"14","color":"","font":"bold"},"tinyTemp":{"size":"12","color":"","font":"bold"},"customText":{"size":"14","color":"","font":"bold"},"battery":{"size":"16","color":"","font":"large"},"sunrise":{"size":"14","color":"","font":"large"},"covid":{"size":"14","color":"","font":"medium"},"week":{"size":"14","color":"","font":"large"}},"date":{"name":"Date","dynamicDateSize":true,"staticDateSize":"large","smallDateFormat":"EEEE, MMMM d","largeDateLineOne":"EEEE,","largeDateLineTwo":"MMMM d"},"events":{"name":"Events","numberOfEvents":"3","minutesAfter":"5","showAllDay":true,"numberOfDays":"1","labelFormat":"EEEE, MMMM d","showTomorrow":"20","showEventLength":"duration","showLocation":true,"selectCalendars":"","showCalendarColor":"rectangle right","noEventBehavior":"greeting","url":""},"reminders":{"name":"Reminders","numberOfReminders":"3","useRelativeDueDate":true,"showWithoutDueDate":false,"showOverdue":false,"todayOnly":false,"selectLists":"","showListColor":"rectangle left","noRemindersBehavior":"greeting","url":""},"sunrise":{"name":"Sunrise and sunset","showWithin":"","separateElements":true},"weather":{"name":"Weather","showLocation":false,"horizontalCondition":false,"showCondition":true,"showHighLow":true,"showRain":true,"tomorrowShownAtHour":"0","spacing":"0","horizontalHours":false,"showHours":"3","showHoursFormat":"ha","horizontalForecast":false,"showDays":"3","showDaysFormat":"E","showToday":true,"urlCurrent":"","urlFuture":"","urlForecast":""},"covid":{"name":"COVID data","country":"Portugal ","url":"https://covid19.who.int"},"symbol":{"name":"Symbols","size":"18","padding":{"top":"","left":"","bottom":"","right":""},"tintColor":"ffffff"}}')
      fm.writeString(fm.joinPath(fm.libraryDirectory(), "weather-cal-" + Script.name()), '{"type":"image"}')

      let code = await new Request('https://raw.githubusercontent.com/mzeryck/Weather-Cal/main/weather-cal.js').loadString()
      let arr = code.split('`')
      arr[1] = `
  
  row 
    column
      date
      battery
      sunset
      space
      events
      reminders
    
    column(100)
      current
      daily
      space
       
`

      alert = makeAlert("Close this script and re-run it to finish setup.",["OK"])
      fm.writeString(module.filename, arr.join('`'))
      await alert.present()
      }
      await importWidget()
      Script.complete()
