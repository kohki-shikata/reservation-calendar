import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.locale('ja')

export const genCal = (options) => {
  
  const cal = document.getElementById('cal')

  const table = document.createElement('table')
  cal.appendChild(table)

  const tableHeader = document.createElement('thead')
  table.appendChild(tableHeader)

  const tableHeaderRow = document.createElement('tr')
  tableHeader.appendChild(tableHeaderRow)


  for(let i = 1; i <= 7; i++) {
    
    let day = ''
  
    day = dayjs(options.startDay).add(i - 1, 'day')
  
    
    const tableHeaderColumn = document.createElement('th')
    const tableHeaderColumnLabel = document.createElement('div')
    tableHeaderColumnLabel.classList.add('js-headerLabel')
    const tableHeaderColumnName = document.createElement('div')
    tableHeaderColumnName.classList.add('js-headerLabelName')
    tableHeaderColumn.style.minWidth = 50 * options.staffs.length + 'px'
    tableHeaderColumn.appendChild(tableHeaderColumnLabel)
    tableHeaderColumn.appendChild(tableHeaderColumnName)
    if(day.format('D') === "1") {
      tableHeaderColumnLabel.textContent = day.format('M/D(ddd)')  
    } else {
      tableHeaderColumnLabel.textContent = day.format('D(ddd)')
    }
    
    tableHeaderRow.appendChild(tableHeaderColumn)

    

    for(let j = 1; j <= options.staffs.length; j++) {

      const tableHeaderColumnNamePerson = document.createElement('p')
      tableHeaderColumnName.appendChild(tableHeaderColumnNamePerson)
      tableHeaderColumnNamePerson.dataset.nameLabel = options.staffs[j - 1]
      tableHeaderColumnNamePerson.classList.add('js-nameLabel')
      tableHeaderColumnNamePerson.style.width = `calc(100% / ${options.staffs.length})`
      tableHeaderColumnNamePerson.textContent = options.staffs[j - 1].name

    }
  
    if(day.format('d') === '6') {
      tableHeaderColumn.classList.add('js-saturday')
    } else if(day.format('d') === '0') {
      tableHeaderColumn.classList.add('js-sunday')
    }
    
  }
  
  tableHeaderRow.insertAdjacentHTML('afterbegin','<th></th>')
  
  const tableBody = document.createElement('tbody')
  table.appendChild(tableBody)
  
  for(let i = 1; i <= 11; i++) {
  
    const tableBodyRow = document.createElement('tr')
    tableBody.appendChild(tableBodyRow)
  
  
    
    for(let j = 1; j <= 8; j++) {
      const tableBodyColumn = document.createElement('td')
      tableBodyRow.appendChild(tableBodyColumn)
  
      if(j === 1) {
        
        const th = document.createElement('th')
        tableBodyColumn.appendChild(th)
        tableBodyColumn.parentNode.replaceChild(th, tableBodyColumn)
        th.classList.add('js-timeLabel')
        
        for(let k = 0; k < 4; k++) {
          const innerCell = document.createElement('div')
          innerCell.classList.add('js-innerCell')
          
          if(k === 0) {
            innerCell.textContent =`${i + 8}:00`
          } else if(k === 1) {
            innerCell.textContent =`${i + 8}:15`
          } else if(k === 2) {
            innerCell.textContent =`${i + 8}:30`
          } else if(k === 3) {
            innerCell.textContent =`${i + 8}:45`
          }
          
          th.appendChild(innerCell)
        }
          
      } else {
  
        tableBodyColumn.classList.add('js-timeCell')
        const wrapper = document.createElement('div')
        wrapper.classList.add('js-dayWrapper')
        let day = dayjs(options.startDay).add(j - 2, 'day').format('YYYY-MM-DD')
        wrapper.dataset.day = day
        
        for(let l = 1; l <= options.staffs.length; l++) {
          const wrapperRow = document.createElement('div')
          wrapperRow.classList.add('js-dayWrapperRow')
          wrapperRow.style.width = `calc(100% / ${options.staffs.length})`
          wrapper.appendChild(wrapperRow)
  
          for(let m = 1; m <= 4; m++) {
  
            const timeCellPerson = document.createElement('div')
            timeCellPerson.classList.add('js-timeCellPerson')
            timeCellPerson.dataset.staff = options.staffs[l - 1].name

            console.log(timeCellPerson)
            if(m === 1) {
              timeCellPerson.dataset.startTime = `${day} ${i + 8}:00`
              timeCellPerson.dataset.endTime = `${day} ${i + 8}:14`
            } else if(m === 2) {
              timeCellPerson.dataset.startTime = `${day} ${i + 8}:15`
              timeCellPerson.dataset.endTime = `${day} ${i + 8}:29`
            } else if(m === 3) {
              timeCellPerson.dataset.startTime = `${day} ${i + 8}:30`
              timeCellPerson.dataset.endTime = `${day} ${i + 8}:44`
            } else if(m === 4) {
              timeCellPerson.dataset.startTime = `${day} ${i + 8}:45`
              timeCellPerson.dataset.endTime = `${day} ${i + 8}:59`
            }
            
            wrapperRow.appendChild(timeCellPerson)
  
          }
  
        }
  
        tableBodyColumn.appendChild(wrapper)
        
  
      }
  
    }
    
  }

  
  const staffObj = document.querySelectorAll(`.js-timeCellPerson`)

  // console.log(options.staffs)
  
  for(const item of staffObj) {
      for(const event of options.events) {
        const cellStart = dayjs(item.dataset.startTime)
        const eventstart = dayjs(event.startTime)
        const cellEnd = dayjs(item.dataset.endTime)
        const eventEnd = dayjs(event.endTime)



        if(item.dataset.staff === event.staff) {
          // console.log(options.eventstart.isBefore(cellStart))
          // console.log(options.eventstart)
          if(eventstart.isSameOrBefore(cellStart)) {
            item.classList.add('is-occupied')
            item.textContent = '×'
          }
          if(cellEnd.isAfter(eventEnd)) {
            item.classList.remove('is-occupied')
            item.textContent = ''
          }

        }
        
        if(options.forceClose) {
          if(cellStart.isSameOrAfter(dayjs(options.forceClose.start)) && cellEnd.isSameOrBefore(dayjs(options.forceClose.end))) {
            item.classList.add('is-occupied')
            item.textContent = '×'
          }
        }
        
        if(cellEnd.isSameOrBefore(dayjs())) {
          item.classList.add('notAvailable')
          item.classList.remove('available')
          item.textContent = 'ー'
        }

        if(options.futureClose) {
          if(cellEnd.isSameOrAfter(options.futureClose)) {

            item.classList.add('notAvailable')
            item.classList.remove('available')
            item.textContent = 'ー'
          }
        } else {

          if(cellEnd.isSameOrAfter(dayjs().add(options.futureCloseValue, options.futureCloseUnit))) {

            item.classList.add('notAvailable')
            item.classList.remove('available')
            item.textContent = 'ー'
          }

        }

    }
  }

  const available = document.querySelectorAll('.js-timeCellPerson:not(.is-occupied)')
  // const notAvailable = document.querySelectorAll('.notAvailable')
  let i = 0
  for(const item of available) {
    // console.log(item.classList)
    if(![...item.classList].includes('notAvailable')) {
      item.classList.add('available')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      checkbox.setAttribute('id',`checkbox-${dayjs().format('YYYY-MM-DD')}-${i}`)
      const label = document.createElement('label')
      label.setAttribute('for',`checkbox-${dayjs().format('YYYY-MM-DD')}-${i}`)
      label.appendChild(checkbox)
      label.appendChild(document.createTextNode(''))
      item.appendChild(label)
      const icon = document.createElement('p')
      item.appendChild(icon).textContent = '👌'
      const statusLabel = document.createElement('p')
      statusLabel.classList.add('reservationLabel')
      item.appendChild(statusLabel).insertAdjacentHTML('afterbegin',`${item.dataset.staff}<br>予約OK`)
    }
    i++
  }

}