export default function dateFilter (value, format = 'date') {
  var date
  value = new Date(value)

  if (format.includes('date')) {
    const day = (value.getDate() < 10) ? '0' + value.getDate() : value.getDate()
    const month = (value.getMonth() < 10) ? '0' + value.getMonth() : value.getMonth()
    date = day + '-' + month + '-' + value.getFullYear()
  }

  if (format.includes('time')) {
    const hours = (value.getHours() < 10) ? '0' + value.getHours() : value.getHours()
    const minutes = (value.getMinutes() < 10) ? '0' + value.getMinutes() : value.getMinutes()
    const seconds = (value.getSeconds() < 10) ? '0' + value.getSeconds() : value.getSeconds()

    date += ' ' + hours + ':' + minutes + ':' + seconds
  }
  return date
}
