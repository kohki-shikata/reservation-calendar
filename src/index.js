import dayjs from 'dayjs'
import "./styles.styl";
import util from './util'

import { genCal } from './calendar'
import events from './events'
import staffs from './staffs'
import forceClose from './force_close'


let start = ''
const param = util.getUrlQueries()
if(param) {
  start = param.start
  console.log(param.start)
} else {
  start = salon.today
}


const options = {
  staffs: staffs,
  events: events,
  startDay: start,
  forceClose: forceClose,
  futureCloseValue: 2,
  futureCloseUnit: 'month',
}

class Salon {
  
  constructor() {
     
    this.today = dayjs()
    this.staffs = staffs

  }

  generate(options) {
    genCal(options)  
  }
  
}
const salon = new Salon()



salon.generate(options)
