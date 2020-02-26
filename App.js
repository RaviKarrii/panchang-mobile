import React from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, FlatList, ScrollView, Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


export default class Example extends React.Component {
  constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {date:"2020-02-27",
                  jsondata:{
                    "Day Duration": "11:43:12",
                    "Durmuhurtam": " 11:50:43 -  12:37:36",
                    "Gulika Kalam": " 10:46:16 -  12:14:10",
                    "Karna": "Taitila",
                    "Maasa": "Phalguna",
                    "MoonRise": "8:6:34",
                    "MoonSet": "20:19:37",
                    "Nakshatra": "Uttara Bhadrapada , Till 22:08:34",
                    "Night Duration": "12:13:3",
                    "Rahu Kalam": " 12:14:10 -  13:42:4",
                    "Ritu": "Shishir - Winter",
                    "SunRise": "6:22:34",
                    "SunSet": "18:5:46",
                    "Tithi": "Thadiya till Next day, 4:12:07",
                    "Vaaram": "Wednesday",
                    "Yama Kalam": " 7:50:28 -  9:18:22",
                    "Yoga": "Sadhya , Till 9:34:19"
                  }}
  }
  saveState(data){
    this.setState({date: data.dateString})
  };
  async getDataPromise() {
        try {
          const resp = await fetch("https://daily-panchang.herokuapp.com/panchang-api/v1.0/?date="+this.state.date+"&location=Kakinada")
          console.log("https://daily-panchang.herokuapp.com/panchang-api/v1.0/?date="+this.state.date+"&location=Kakinada");
          const newResp = await resp.json();
          return newResp
        } catch (err) {
     // all errors will be captured here for anything in the try block
             console.log(err)
          }
        }
    async getData() {
          let data = await this.getDataPromise();  
          this.setState({jsondata :data})
        }    
  
  render() 
  {
    return (
      <View style={{ paddingTop: 5, flex: 1 }}>
        <Calendar
          onDayPress={day => {
            //console.log(day);
            this.saveState(day);
            this.getData();
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
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={0}
        />
        <ScrollView style={{ paddingLeft: 10}}>        

          <Grid>
              <Row><Col><Text>Day Duration</Text></Col>
              <Col><Text>{this.state.jsondata["Day Duration"]}</Text></Col></Row>
              <Row><Col><Text>Durmuhurtam</Text></Col>
              <Col><Text>{this.state.jsondata["Durmuhurtam"]}</Text></Col></Row>
              <Row><Col><Text>Gulika Kalam</Text></Col>
              <Col><Text>{this.state.jsondata["Gulika Kalam"]}</Text></Col></Row>
              <Row><Col><Text>Karna</Text></Col>
              <Col><Text>{this.state.jsondata["Karna"]}</Text></Col></Row>
              <Row><Col><Text>Maasa</Text></Col>
              <Col><Text>{this.state.jsondata["Maasa"]}</Text></Col></Row>
              <Row><Col><Text>MoonRise</Text></Col>
              <Col><Text>{this.state.jsondata["MoonRise"]}</Text></Col></Row>
              <Row><Col><Text>MoonSet</Text></Col>
              <Col><Text>{this.state.jsondata["MoonSet"]}</Text></Col></Row>
              <Row><Col><Text>Nakshatra</Text></Col>
              <Col><Text>{this.state.jsondata["Nakshatra"]}</Text></Col></Row>
              <Row><Col><Text>Night Duration</Text></Col>
              <Col><Text>{this.state.jsondata["Night Duration"]}</Text></Col></Row>
              <Row><Col><Text>Rahu Kalam</Text></Col>
              <Col><Text>{this.state.jsondata["Rahu Kalam"]}</Text></Col></Row>
              <Row><Col><Text>Ritu</Text></Col>
              <Col><Text>{this.state.jsondata["Ritu"]}</Text></Col></Row>
              <Row><Col><Text>SunRise</Text></Col>
              <Col><Text>{this.state.jsondata["SunRise"]}</Text></Col></Row>
              <Row><Col><Text>SunSet</Text></Col>
              <Col><Text>{this.state.jsondata["SunSet"]}</Text></Col></Row>
              <Row><Col><Text>Tithi</Text></Col>
              <Col><Text>{this.state.jsondata["Tithi"]}</Text></Col></Row>
              <Row><Col><Text>Vaaram</Text></Col>
              <Col><Text>{this.state.jsondata["Vaaram"]}</Text></Col></Row>
              <Row><Col><Text>Yama Kalam</Text></Col>
              <Col><Text>{this.state.jsondata["Yama Kalam"]}</Text></Col></Row>
              <Row><Col><Text>Yoga</Text></Col>
              <Col><Text>{this.state.jsondata["Yoga"]}</Text></Col></Row>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}
