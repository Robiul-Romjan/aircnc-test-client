import { DateRange } from 'react-date-range'

// eslint-disable-next-line react/prop-types
const DatePicker = ({value, handleSelect}) => {
  return (
    <DateRange
      rangeColors={['#F43F5E']}
      ranges={[value]}
      onChange={handleSelect}
      date={new Date()}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
    />
  )
}

export default DatePicker;