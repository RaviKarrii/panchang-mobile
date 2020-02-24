import React from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, Text, View } from 'react-native';


export default class Example extends React.Component {
  constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {date:""}
  }
  saveState(data){
    this.setState({date: data.dateString})
  };
  
  render() 
  {
    return (
      <View style={{ paddingTop: 50, flex: 1 }}>
        <Calendar
          // Initially visible month. Default = Date()
          //current={'2020-02-22'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log(day);
            this.saveState(day);
            console.log(this.state.date)
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />
      </View>
    );
  }
}
