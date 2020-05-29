/*Example of Collapsible - Accordion - Expandable View in React Native*/
import React from 'react';
//import react in our project
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Picker,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Col, Row, Grid } from "react-native-easy-grid";
import GLOBAL from './data.js';



export class Marriage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      response: "",
      match_only: {
        "match_status": 2,
        "message": "దయచేసి వివరాలు ఇవ్వండి",
        "varna": {
          "bride": "Kshatriya",
          "bridegroom": "Brahmin",
          "point": 0,
          "message": " Varna represents the working attitude and capacity.  The  bridegroom’s capacity needs to be higher than that of the bride for smooth running of the family. The bridegroom’s varna is Brahmin Varna while the bride comes under Kshatriya Varna. This type of combination is very much favorable for a union. For this couple Varna Koot is Good."
        },
        "vasya": {
          "bride": "Manava",
          "bridegroom": "Jalachara",
          "point": 0,
          "message": "Vasya was used to determine whether there will be a dedicated and compatible relationship between two people. The bridegroom’s Vasya is Jalachara Vasya while the bride comes under Manava Vasya. This is a normal match and not excellent or worst. For this couple Vasya Koot is Normal. However, if other gunas are matched well, then this alliance may be taken into consideration."
        },
        "tara": {
          "bride": "Moola",
          "bridegroom": "Uttara Bhadrapada",
          "point": 0,
          "message": "Tara is used to calculate the health and well-being of the bride and groom after marriage. The bridegroom and bride are in different Tara Group. The bridegroom's nakshatra Uttara Bhadrapada is 20th position from bride's nakshatra Moola and this is benefic. At the same time The bride's nakshatra Moola is 7th position from bridegroom's nakshatra Uttara Bhadrapada and this is malefic. This is a normal match. For this couple Tara Koot is Normal. But if other gunas are matched well, then this alliance may be taken into consideration."
        },
        "yoni": {
          "bride": "Swah",
          "bridegroom": "Gau",
          "point": 0,
          "message": "Yoni indicates the physical and sexual compatibility between a couple.The bridegroom’s Yoni is Gau while the bride comes under Swah Yoni. This is a preferable combination. For this couple Yoni Koot is Average."
        },
        "graha_maitri": {
          "bride": "Jupiter",
          "bridegroom": "Jupiter",
          "point": 0,
          "message": "Graha Maitri is used to examine the strength of the love between the couple. This is achieved by comparing the sign lords of the moon in the chart of the bride and groom.The bridegroom and the bride both belong to same Rasi Lord Jupiter.The bridegroom’s Rasi is Meena while the bride's Rasi is Dhanu. This is so far the best compatible match. For this couple Graha Maitri Koot is Excellent."
        },
        "gana": {
          "bride": "Rakshasa",
          "bridegroom": "Manushya",
          "point": 0,
          "message": "Gana is used to identify an individuals temperament.The bridegroom’s Gana is Manushya while the bride comes under Rakshasa Gana. This is inauspicious combination. For this couple Gana Koot is Not Good."
        },
        "bhakoot": {
          "bride": "Dhanu",
          "bridegroom": "Meena",
          "point": 0,
          "message": "Bhakoot or Rashikoot testing is used to verify the overall health, welfare and prosperity of a family after marriage. It is believed that Bhakoot Dosha can affect the intimacy between the couple and cause delays in pregnancy.The bridegroom’s Zodiac sign is Meena while the bride's Zodiac sign is Dhanu. This is an excellent combination from the happiness and prosperity point of view. For this couple Bhakoot Koot is Excellent."
        },
        "nadi": {
          "bride": "Adi",
          "bridegroom": "Madhya",
          "point": 0,
          "message": "Nadi testing is to check the genetic compatibility of the bride and groom to ensure they are capable of producing healthy children. Nadi Kuot is given supreme priority during match making.The bridegroom belongs to Madhya Nadi while the while the bride comes under Adi Nadi. This is considered to be extremely good combination according to nadi compatibility. For this couple Nadi Koot is Excellent."
        },
        "total_point": 0,
        "sub_message": [
          "There is substantial difference in the level of Mangal Dosha compatibility of both the horoscopes. Please consult an astrologer before proceeding to marriage."
        ]
      },
      userTypes: [{userType: 'admin', userName: 'Admin User'}, {userType: 'employee', userName: 'Employee User'}, {userType: 'dev', userName: 'Developer User'}],
      selectedLB: "test",
      selectedLG: "test",
    };
  }
  

  loadUserTypes = () => {
    return this.state.userTypes.map(user => (
       <Picker.Item label={user.label} value={user.value} />
    ))
  }

  async getData(getreq) {
    console.log(GLOBAL.url)
    try {
      let resp = await fetch(GLOBAL.url + getreq, {
        method: 'get',
        headers: new Headers({
          'Authorization': 'Bearer ' + GLOBAL.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
      });
      var response = await resp.json();
    } catch (err) {
      console.log("Error fetching data--", err);
    }
    return response;
  }
  async onButtonGenerate() {

    var getreq = "?ayanamsa=1&bride_dob=" + this.state.Gdate + "T" + this.state.Gtime + ":00%2B05:30&bride_coordinates=" + this.state.Gcoord.latitude + "," + this.state.Gcoord.longitude + "&bridegroom_dob=" + this.state.Bdate + "T" + this.state.Btime + ":00%2B05:30&bridegroom_coordinates=" + this.state.Bcoord.latitude + "," + this.state.Bcoord.longitude;
    console.log(getreq)
    var resp = await this.getData(getreq)
    this.setState({ response: resp });
    this.setState({ match_only: this.state.response["response"]["result"] })
    console.log(this.state.response["response"]["result"]["message"])
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

  componentWillMount(){
    var data = GLOBAL.locdata;
    this.setState({userTypes : data});
}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.Btime !== this.state.Btime) {
      this.setState({ collapsedBoy: true })
    }
    if (prevState.Gtime !== this.state.Gtime) {
      this.setState({ collapsedGirl: true })
    }
    if (prevState.selectedLB !== this.state.selectedLB) {
      var split = this.state.selectedLB.split("-")
      this.setState({Bcoord : {
        latitude: split[0],
        longitude: split[1],
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      }})
      
    }
    if (prevState.selectedLG !== this.state.selectedLG) {
      var split = this.state.selectedLG.split("-")
      this.setState({Gcoord : {
        latitude: split[0],
        longitude: split[1],
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      }})
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
                  <Col>
                  {/* MAP Here */}
                  <Picker selectedValue={this.state.selectedLB} 
                          onValueChange={(itemValue, itemIndex) => this.setState({selectedLB: itemValue})} >
                    <Picker.Item label="--Select--" value="test"/>
                   {this.loadUserTypes()}
                  </Picker>
                  </Col>

                  </Row>
                {/* End of Map*/}

                <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టినరోజు</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    date={this.state.Bdate}
                    showIcon={false}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ Bdate: date }) }} /></Col></Row>
                <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టిన సమయం</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    date={this.state.Btime}
                    mode="time"
                    format={'HH:mm'}
                    showIcon={false}
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
            <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}>
                  <Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>జన్మస్థానం</Text></Col>
                
                  {/* MAP Here */}
                  <Col>
                  <Picker selectedValue={this.state.selectedLG} 
                          onValueChange={(itemValue, itemIndex) => this.setState({selectedLG: itemValue})} >
                    <Picker.Item label="--Select--" value="test"/>
                    {this.loadUserTypes()}
                  </Picker>
                  </Col>

                  </Row>
                {/* End of Map*/}
                <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టినరోజు</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    date={this.state.Gdate}
                    showIcon={false}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ Gdate: date }) }} /></Col></Row>
                <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>పుట్టిన సమయం</Text></Col>
                  <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><DatePicker
                    date={this.state.Gtime}
                    showIcon={false}
                    mode="time"
                    format={'HH:mm'}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(time) => { this.setState({ Gtime: time }) }} /></Col></Row>
              </Grid>
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}
          <Button title="Generate" type="clear" onPress={this.onButtonGenerate.bind(this)} />



          {/* Data Starts */}
          <Row style={{ height: 60, backgroundColor: '#474545' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>{this.state.match_only["message"]}</Text></Col></Row>
          <Row style={{ height: 60, backgroundColor: 'white' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'black', fontWeight: 'bold' }}>పేరు</Text></Col>
            <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'black', fontWeight: 'bold' }}>ఉన్నవి</Text></Col>
            <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'black', fontWeight: 'bold' }}>వచ్చినవి</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#99e0ac' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>వర్ణ కూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>1</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["varna"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#e09999' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>వశ్యకూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>2</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["vasya"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#a099e0' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>తారా కూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>3</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["tara"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>యోని కూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>4</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["yoni"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#d095db' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>గ్రహమైత్రి కూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>5</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["graha_maitri"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#99e0ac' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>గణ కూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>6</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["gana"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#e09999' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>రాశి కూటం</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>7</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["bhakoot"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#a099e0' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>నాడీ పొంతన</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>8</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["nadi"]["point"]}</Text></Col></Row>
            <Row style={{ height: 60, backgroundColor: '#99e0d5' }}><Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ left: 10, color: 'white', fontWeight: 'bold' }}>మొత్తం గుణములు</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>36</Text></Col>
              <Col style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.match_only["total_point"]}</Text></Col></Row>

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
