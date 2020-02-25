import React from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, FlatList, ScrollView, Text, View } from 'react-native';


export default class Example extends React.Component {
  constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {date:"",
                  jsondata:{}}
  }
  saveState(data){
    this.setState({date: data.dateString})
  };
  getMoviesFromApiAsync() {
    return fetch('https://daily-panchang.herokuapp.com/panchang-api/v1.0/?date=2020-02-25&location=Kakinada')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
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
            this.setState({jsondata :this.getMoviesFromApiAsync()})
            console.log(this.state.jsondata);
            //console.log(this.state.date)
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
        <ScrollView>       
          <Text>
            {this.state.date}
          </Text> 
          <Text>{this.state.jsondata.Durmuhurtam}</Text>
          <Text>{this.state.jsondata.Karna}</Text>
          <Text>{this.state.jsondata.Karna}</Text>     
        </ScrollView>
      </View>
    );
  }
}
