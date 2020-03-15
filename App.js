import React from 'react';
import { Calendar } from 'react-native-calendars';
import {ScrollView, Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import MapView from "react-native-maps";
import * as Location from 'expo-location';


export default class Example extends React.Component {
  constructor(props){
    super(props)
    //set value in state for initial date
    this.initflag = true;
    this.mapRegion = null;
    this.lastLat =  13.3850;
    this.lastLong = 18.4867;
    this.state = {date:"2020-02-02",
                  jsondata:{},
                  locupd:0.0}
  }
  updltlon(){
    Location.requestPermissionsAsync();
      this.watchID = navigator.geolocation.watchPosition((position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      }, (error)=>console.log(error));
  }
  UNSAFE_componentWillMount(prevProps, prevState) {

    this.updltlon();
    this.initmethod();
    this.getData();
  }
  componentDidMount(){
    
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState, this.state);
    if(prevState.date !== this.state.date) {
    this.getData();
    }
    if(prevState.locupd !== this.state.locupd) 
    {
      this.getData();
    }
   }

   onRegionChange(region, lastLat, lastLong) {
      this.lastLat  = lastLat;
      this.lastLong =lastLong;
      this.setState({locupd: "Done"})
    }

  saveState(data){
    this.setState({date: data.dateString})
  };
  initmethod(){
    if(this.initflag){
      Location.requestPermissionsAsync();
      this.watchID = navigator.geolocation.watchPosition((position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      }, (error)=>console.log(error));
      console.log("Lat GT")
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      console.log(today)
      this.setState({date: today})
      this.initflag = false
    }
  }
  async getDataPromise() {
        try {
          const resp = await fetch("https://daily-panchang.herokuapp.com/panchang-api/v1.0/?date="+this.state.date+"&lat="+this.lastLat+"&lon="+this.lastLong+"")
          console.log("https://daily-panchang.herokuapp.com/panchang-api/v1.0/?date="+this.state.date+"&lat="+this.lastLat+"&lon="+this.lastLong+"");
          const newResp = await resp.json();
          return newResp
        } catch (err) {
     // all errors will be captured here for anything in the try block
             console.log(err)
          }
        }
    async getData() {
          console.log("Getting Data")
          let data = await this.getDataPromise();  
          this.setState({jsondata :data})
        }    
  
  render() 
  {
    return (
      <View style={{ paddingTop: 10, flex: 1 }}>
        <Calendar
          onDayPress={day => {
            //console.log(day);
            this.saveState(day);
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
        <Text style={{ paddingTop: 15}}></Text>
        <ScrollView style={{ paddingLeft: 0}}>        
          <Grid>
              <Row style={{ height: 60, backgroundColor: '#99e0ac' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10, color: 'white', fontWeight: 'bold' }}>Day Duration</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Day Duration"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#e09999' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Durmuhurtam</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Durmuhurtam"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#a099e0' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Gulika Kalam</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Gulika Kalam"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Karna</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Karna"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Maasa</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Maasa"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#99e0ac' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>MoonRise</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["MoonRise"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#e09999' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>MoonSet</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["MoonSet"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#a099e0' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Nakshatra</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Nakshatra"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Night Duration</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Night Duration"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Rahu Kalam</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Rahu Kalam"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#99e0ac' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Ritu</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Ritu"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#e09999' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>SunRise</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["SunRise"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#a099e0' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>SunSet</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["SunSet"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Tithi</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Tithi"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Vaaram</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Vaaram"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#99e0ac' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Yama Kalam</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Yama Kalam"]}</Text></Col></Row>
              <Row style={{ height: 60, backgroundColor: '#e09999' }}><Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}} style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{left: 10,  color: 'white', fontWeight: 'bold' }}>Yoga</Text></Col>
              <Col style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.jsondata["Yoga"]}</Text></Col></Row>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}
