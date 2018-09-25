        import React, { Component } from 'react';
        import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
        import { connect } from 'react-redux'
        import Geocoder from 'react-native-geocoder';
        import {
          StyleSheet,
          View,
          Text,
          ActivityIndicator,
          TouchableOpacity,
          Dimensions,
          Button 
        } from 'react-native';
        import Header from '../common/Header'
        import colors from '../../assets/styles/colors.js';
        import { getAddresses } from '../../api/address'
        import { selectAddress } from '../../api/water'

        const { width, height } = Dimensions.get('window');
        const SCREEN_HEIGHT = height;
        const SCREEN_WIDTH = width;
        const ASPECT_RATIO = width / height;
        const LATITUDE_DELTA = 0.0922;
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        class Addresses extends Component {
          constructor(props) {
            super(props);
            this.state = { 
              location: false,
              markers: [],
              // address: ['Kobster E Shop Pvt Ltd (Kobster.com) 51-B, Mount Poonamallee Main Road, St. Thomas Mount, Chennai – 600016. (End of Kathipara Flyover - Towards Porur)','Kobster E Shop Pvt Ltd (Kobster.com)64/2, 6th cross, 3rd main road,Near Idgah Maidan, Chamrajpet,Bengaluru-560018.'],
              address_updated: false,
              selectedAddress: [],
              selectedId: null,
              initialPosition:{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 0.0922,
                longitudeDelta: LONGITUDE_DELTA,
                distanceFilter: 5,
              },
              markerPosition:{
                latitude: 0,
                longitude: 0,
              }
            };
            this.fetchAddress = this.fetchAddress.bind(this);
            this.onSelect = this.onSelect.bind(this);
          }

          watchID = null;
          componentWillMount(){
            getAddresses(this.props.user.id_user);
            // this.fetchAddress();
            // var test = navigator.geolocation.requestAuthorization();
            // console.log(test);
            navigator.geolocation.getCurrentPosition((position) => {
              var lat = parseFloat(position.coords.latitude);
              var lon = parseFloat(position.coords.longitude);
              console.log(position);
              var initialRegion = {
                latitude: lat,
                longitude: lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }

              this.setState({
                  location: true,
                  initialPosition: initialRegion
                })
            },
            (error) => console.log(error),
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 10000, 
              distanceFilter: 10 
            })

            this.watchID = navigator.geolocation.watchPosition((position)=>{
              var lat = parseFloat(position.coords.latitude);
              var lon = parseFloat(position.coords.longitude);
              var lastRegion ={
                latitude: lat,
                longitude: lon,
                latitudeDelta: LATITUDE_DELTA/15,
                longitudeDelta: LONGITUDE_DELTA/15,
              }
              this.setState({initialPosition: lastRegion})
            },
            (error) => console.log(error),
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 10000, 
              distanceFilter: 10 
            })
          }

          fetchAddress(){
            // Address Geocoding
              console.log(this.props.waddress);
              var address = [];
              this.props.waddress.map(function(address){
                console.log(address);
                Geocoder.geocodeAddress(address['location_address']).then(res => {
                    // res is an Array of geocoding object (see below)
                    var position = {
                      latitude: res[0].position.lat,
                      longitude: res[0].position.lng
                    }
                    var address_details = {
                      position: position,
                      company: address['company'],
                      address1: address['address1'],
                      city: address['city'],
                      postcode: address['postcode'],
                      phone: address['phone'],
                      address: address['location_address'],
                      displayAddress: address['show_address'],
                      id: address['id_address'],
                    }
                    
                    this.setState({ address_updated: true, markers: this.state.markers.concat(address_details) })
                })
                .catch(err => {console.log(err)})  
              }.bind(this))
          }

          onSelect(id, address){
            console.log(id);
            console.log(address);
            selectAddress(id, address);
          }

          componentWillUnmount(){
            navigator.geolocation.clearWatch(this.watchID);
          }

          markerOnPress (coord) {
            TIME_FOR_ANIMATION = 700;
            this.mapview.animateToCoordinate(coord);
            setTimeout(() => {
              this.markerRef.showCallout();
            }, TIME_FOR_ANIMATION);
          }
          render() {
            
            let {markers} = this.state.markers;
            var i =0;
            if(this.state.address_updated == false && this.props.waddress.length > 0 && this.state.markers.length <= 0){
              this.fetchAddress();
            }

            return (
              <View  style={styles.container}>
                <Header header={"Select Address"} />
                {this.props.loading == true || this.state.location == false ?
                  <View  style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0110ff" />
                  </View>:null
                }
                <MapView 
                  // ref="map"
                  // ref = {(ref)=>this.mapView=ref}
                  ref={component => this._map = component}
                  style={ styles.map }
                  provider={PROVIDER_GOOGLE}  
                  followUserLocation = {true}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  loadingEnabled = {true}
                  loadingIndicatorColor = {"#0000ff"}
                  loadingBackgroundColor = {"#00ff00"}
                  region={this.state.initialPosition}>
                  {this.props.waddress.length > 0 && this.state.markers != undefined && this.state.markers.length > 0 ?
                    this.state.markers.map((coords)=>{
                      console.log("coords");
                      console.log(coords);
                      if(coords)
                        i++;
                        return (
                          <MapView.Marker
                          onPress={(e) => {this.setState({
                                selectedAddress: {
                                    company: coords['company'],
                                    address1: coords['address1'],
                                    city: coords['city'],
                                    postcode: coords['postcode'],
                                    phone: coords['phone'],
                                  }, 
                                selectedId: coords['id']},function(){
                            this._map.animateToCoordinate(coords['position'],1);
                          })}}
                          ref={(ref) => { this.markerRef = ref; }}
                          key={coords['id']}
                          coordinate={coords['position']}
                          title={coords['company']}
                          >
                          </MapView.Marker>
                        )
                    }):null}
                </MapView>
                {this.state.selectedId > 0 ?
                  <View style={styles.selectAddressContainer}>
                    <AddressCard onSelect={this.onSelect} selectedAddress={this.state.selectedAddress} id={this.state.selectedId} />
                  </View>
                  :null}
              </View>
            );
          }
        }


        class AddressCard extends Component{
          onSelect = (e,v) => {
            console.log(e);
            console.log(v);
          }

          render(){
            return(
                  <View style={styles.selectAddressWrapper}>
                    <View style={styles.addressContainer}>
                      <Text style={[styles.address, styles.head]}>
                        {this.props.selectedAddress['company']}
                      </Text>
                      <Text style={styles.address}>
                        {this.props.selectedAddress['address1']}
                      </Text>
                      <Text style={styles.address}>
                        {this.props.selectedAddress['city']}
                      </Text>
                      <Text style={styles.address}>
                        {this.props.selectedAddress['postcode']}
                      </Text>
                      {this.props.selectedAddress['phone'] ?
                      <Text style={styles.address}>
                        {this.props.selectedAddress['phone']}
                      </Text>:null}
                    </View>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity style={styles.btnWrapper} onPress={(e)=>{this.props.onSelect(this.props.id, this.props.selectedAddress)}}>
                        <Text style={styles.btnText}>Next</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              )
          }
        }

        const mapStateToProps = function(store) {
          console.log(store.AddressState.waddress);
            return {
              loading: store.AuthState.loading,
              user: store.AuthState.user,
              waddress: store.AddressState.waddress
            };
          };
          
        export default connect(mapStateToProps)(Addresses);


        const styles = StyleSheet.create({
          loadingContainer:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 50,
            bottom: 0,
            right: 0,
            left: 0,
          },
          container: {
            flex: 1,
          },
          map: {
            flex:1,
          },
          selectAddressContainer:{
            width: SCREEN_WIDTH,
            position: 'absolute',
            justifyContent: 'center',
            bottom: 0,
          },
          addressContainer: {
            marginBottom: 8,
          },
          selectAddressWrapper: {    
            backgroundColor: '#fff',
            padding: 16,
            margin: 16,
            borderRadius: 4,
          },
          address: {
            color: '#000',
          },
          head: {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#000',
            marginBottom: 4,
          },
          hide: {

          },
          btnWrapper:{
            height: 50,
            borderRadius: 4,
            padding: 10,
            backgroundColor: '#841584',
          },
          btnText:{
            color: '#fdfdfd',
            textAlign: 'center',
            fontSize: 20,
          },
          btnContainer:{
            marginTop: 8,
          },
        });