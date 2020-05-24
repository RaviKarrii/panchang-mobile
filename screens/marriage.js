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
import GLOBAL from './locationdata.js';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';



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
      latitude: 53.41058,
      longitude: -2.97794,
      latitudeDelta: 0.1,
      longitudeDelta: 0,
    }
    ,
    Gcoord: {
      latitude: 53.41058,
      longitude: -2.97794,
      latitudeDelta: 0.1,
      longitudeDelta: 0,
    }
    ,
    Bdate: "2016-05-15",
    Btime: "00:00",
    Gdate: "2016-05-15",
    Gtime: "00:00",
  };




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
    let staticData = GLOBAL.data;

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
                    initialRegion={{
                      latitude: 17.68009,
                      longitude: 83.20161,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
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
                    initialRegion={{
                      latitude: 17.68009,
                      longitude: 83.20161,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
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
          <Button title="Generate" type="clear" />
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
