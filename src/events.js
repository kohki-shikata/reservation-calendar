import util from './util'
import staffs from './staffs'
import dayjs from 'dayjs'

// const autoGenerateEvents = (num) => {
  
//   let events = []
  
//   for(let i = 0; i < num; i++) {

//     const staffNum = util.randomNums(0, staffs.length - 1)
//     const min = [14,29,44,59]
//     const hour = util.zeroPadding(util.randomNums(9,17))
//     // console.log(hour)
//     const day = dayjs().add(util.randomNums(0, 6), 'day').format('YYYY-MM-DD')
//     events.push({
//       staff: staffs[staffNum],
//       startTime: `${day} ${hour}:${min[util.randomNums(0,min.length - 1)] + 1}`,
//       endTime: `${day} ${Number(hour) + Number(util.randomNums(0,2))}:${min[util.randomNums(0,min.length - 1)]}`
//     })

//   }

//   return events
// }

const events = [
  {
    staff: '山田',
    startTime: '2021-12-26 9:45',
    endTime: '2021-12-26 11:14',
    type: 'reservation',
    label: ''
  },
  {
    staff: '山田',
    startTime: '2021-12-26 12:00',
    endTime: '2021-12-26 12:59',
    type: 'lunch break',
    label: ''
  },
  {
    staff: '山田',
    startTime: '2021-12-26 17:00',
    endTime: '2021-12-26 20:00',
    type: 'not available',
    label: ''
  },
  {
    staff: '佐藤',
    startTime: '2021-12-26 09:00',
    endTime: '2021-12-26 09:59',
    type: 'not available',
    label: ''
  },
  {
    staff: '佐藤',
    startTime: '2021-12-26 13:00',
    endTime: '2021-12-26 13:59',
    type: 'lunch break',
    label: ''
  },
  {
    staff: '佐藤',
    startTime: '2021-12-26 19:00',
    endTime: '2021-12-26 20:00',
    type: 'not available',
    label: ''
  },
  {
    staff: '橘',
    startTime: '2021-12-26 09:00',
    endTime: '2021-12-26 13:59',
    type: 'not available',
    label: ''
  },
]

export default events