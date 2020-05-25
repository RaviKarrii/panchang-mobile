/*Example of Collapsible - Accordion - Expandable View in React Native*/
import React from 'react';
//import react in our project
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Col, Row, Grid } from "react-native-easy-grid";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GLOBAL from './data.js';



export class marriage extends React.Component {
  state = {
    //default active selector
    activeSections: [],
    //collapsed condition for the single collapsible
    collapsedBoy: false,
    collapsedGirl: false,
    //multipleSelect is for the Multiple Expand allowed
    //true: You can expand multiple at a time
    //false: One can be expand at a time and other will be closed automatically
    multipleSelect: true,
    Bcoord: {
      latitude: 16.96036,
      longitude: 82.23809,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    ,
    Gcoord: {
      latitude: 16.96036,
      longitude: 82.23809,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    ,
    Bdate: "2016-05-15",
    Btime: "00:00",
    Gdate: "2016-05-15",
    Gtime: "00:00",
  };


  async getData(getreq){
    try {
    const resp =await fetch(GLOBAL.url + getreq, { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'Bearer '+GLOBAL.token, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }), 
    });
    response = await resp.json();
  } catch(err) {
    console.log("Error fetching data-----------", err);
}
    return resp;
  }
  onButtonGenerate(){

    var getreq = "?ayanamsa=1&bride_dob="+this.state.Gdate+"T"+this.state.Gtime+":00+05:30&bride_coordinates="+this.state.Gcoord.latitude+","+this.state.Gcoord.longitude+"&bridegroom_dob="+this.state.Bdate+"T"+this.state.Btime+":00+05:30&bridegroom_coordinates="+this.state.Bcoord.latitude+","+this.state.Bcoord.longitude;
    console.log(getreq)
    var resp = this.getData(getreq)
    console.log(resp)
  }

  toggleExpandedBoy = () => {
    //Toggling the state of single Collapsible
    this.setState({ collapsedBoy: !this.state.collapsedBoy });
  };
  toggleExpandedGirl = () => {
    //Toggling the state of single Collapsible
    this.setState({ collapsedGirl: !this.state.collapsedGirl });
  };

  setSections = sections => {
    //setting up a active section state
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.Btime !== this.state.Btime) {
      this.setState({ collapsedBoy: true })
    }
    if (prevState.Gtime !== this.state.Gtime) {
      this.setState({ collapsedGirl: true })
    }
  }

  onRegionChangeB(region) {
    //console.log(region)
    this.setState({ collapsedGirl: false })
    this.setState({ Bcoord: region })
  }
  onRegionChangeG(region) {
    //console.log(region)
    this.setState({ collapsedGirl: false })
    this.setState({ Gcoord: region })
  }

  render() {
    const { multipleSelect, activeSections } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={this.toggleExpandedBoy}>
            <View style={styles.header}>
              <Text style={styles.headerText}>అబ్బాయి వివరాలు</Text>
              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={this.state.collapsedBoy} align="center">
            <View style={styles.content}>
              <Grid>

                {/* Start of Map*/}
                <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}>
                  <Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>జన్మస్థానం</Text></Col>
                  {/* </Col><Col><Row><Text>{this.state.Bcoord.latitude}</Text></Row><Row><Text>{this.state.Bcoord.longitude}</Text></Row></Col> */}
                </Row>
                <Row style={{ height: 200, backgroundColor: '#99e0d5' }}>

                  <MapView
                    style={{ flex: 1 }}

                    showsUserLocation
                    followUserLocation
                    onRegionChange={this.onRegionChangeB.bind(this)}
                    initialRegion={this.state.Bcoord}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: this.state.Bcoord.latitude,
                        longitude: this.state.Bcoord.longitude
                      }}
                      title={"title"}
                      description={"description"}
                    />

                  </MapView>
                </Row>
                {/* End of Map*/}

                <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టినరోజు</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    date={this.state.Bdate}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ Bdate: date }) }} /></Col></Row>
                <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టిన సమయం</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    time={this.state.Btime}
                    mode="time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(time) => { this.setState({ Btime: time }) }} /></Col></Row>

              </Grid>
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}
          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={this.toggleExpandedGirl}>
            <View style={styles.header}>
              <Text style={styles.headerText}>అమ్మాయి వివరాలు</Text>
              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={this.state.collapsedGirl} align="center">
            <View style={styles.content}>
              <Grid>
                {/* Start of Map*/}
                <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}>
                  <Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>జన్మస్థానం</Text></Col>
                  {/* </Col><Col><Row><Text>{this.state.Bcoord.latitude}</Text></Row><Row><Text>{this.state.Bcoord.longitude}</Text></Row></Col> */}
                </Row>
                <Row style={{ height: 200, backgroundColor: '#99e0d5' }}>

                  <MapView
                    style={{ flex: 1 }}

                    showsUserLocation
                    followUserLocation
                    onRegionChange={this.onRegionChangeG.bind(this)}
                    initialRegion={this.state.Gcoord}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: this.state.Gcoord.latitude,
                        longitude: this.state.Gcoord.longitude
                      }}
                      title={"title"}
                      description={"description"}
                    />

                  </MapView>
                </Row>
                {/* End of Map*/}
                <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టినరోజు</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    date={this.state.Gdate}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ Gdate: date }) }} /></Col></Row>
                <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టిన సమయం</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    time={this.state.Gtime}
                    mode="time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(time) => { this.setState({ Gtime: time }) }} /></Col></Row>
              </Grid>
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}
          <Button title="Generate" type="clear" onPress={this.onButtonGenerate.bind(this)} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
