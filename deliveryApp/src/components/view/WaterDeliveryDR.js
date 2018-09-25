import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  Animated,
  Easing,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux'
import Header from '../common/Header'
import RNFetchBlob from 'rn-fetch-blob'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { updateDr } from '../../api/water'
import { toDashboard } from '../../api/auth'
var {height, width} = Dimensions.get('window');

class WaterDeliveryDR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
      data: null,
      datestring: null,
      success: false,
      failure: false,
      loading: false,
    };
    this.shakeAnimations = new Animated.Value(0);
    this.showSuccessAnimation = this.showSuccessAnimation.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    console.log("removeEventListener");
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onRedirect(){
    console.log("removeEventListener___B");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    toDashboard();
  }

  handleBackButtonClick() {
      // this.props.navigation.goBack(null);
      // this.props.navigation.navigate(null);
      if(this.state.datestring == null){
        this.props.navigation.goBack('waterDetails');
      }
      else{
        return true;  
      }      
  }

  onScan = () => {

    this.setState({failure: false, success: false});

    var d = new Date();
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2)+"_"+d.getSeconds();

    var options = {
      title: 'Upload DR',
      takePhotoButtonTitle: null,
      chooseFromLibraryButtonTitle: "Choose from Gallery",
      quality: 1,
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log(response);
        let source = { uri: response.uri };
        datestring = datestring+"_"+this.props.waddress.waddress_id;

        this.setState({
          imageUri: response.uri,
          data: response.data,
          datestring: datestring,
        });
      }
    });
  }
  
  submitDetails(){
    this.setState({loading: true});
    RNFetchBlob.fetch('POST', 'https://www.kobster.online/deliveryHandler.php?', {
              Authorization : "Bearer access-token",
              'Content-Type' : 'multipart/form-data',
            }, 
            [
              { name : 'request', data : '3'},
              { name : 'id_employee', data : this.props.user.id_user},
              { name : 'id_address', data : this.props.waddress.waddress_id},
              { name : 'file', data : this.state.datestring},
              { name : 'delivered', data : this.props.waddress.water_quantity[0] },
              { name : 'empty', data : this.props.waddress.water_quantity[1] },
              { name : 'image', filename : this.state.datestring+'.png', type:'image/png', data: this.state.data}
            ]
          ).then((resp) => {
            console.log(resp);
            this.setState({success: true, loading: false});
          }).catch((err) => {
            this.setState({failure: true, loading: false});
            ToastAndroid.showWithGravity(
              'Sorry uploading DR failed',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          })
  }
  showSuccessAnimation() {
      this.shakeAnimations.setValue(0);
      Animated.timing(this.shakeAnimations, {
        toValue: 1,
        duration: 2000,
      }).start();
    }

  render() {
    const scale = this.shakeAnimations.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 2],
            outputRange: [0, 1, 0.6, 1, 0.6, 0.8, 1.2]
        });
    if(this.state.success == true){
      this.showSuccessAnimation();
    }
    return (
      <View style={styles.container}>
      <Header header={"Upload DR"} />
      {this.state.loading && 
        <View  style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0110ff" />
        </View>
      }
      {this.state.datestring == null &&
      <View style={styles.detailContainer}>
        <View style={styles.qtyDetailWrapper}>
          <View style={styles.canDetail}>
            <Text style={styles.qty}>Delivered Can</Text>
            <Text style={styles.numbers}>{this.props.waddress.water_quantity[0]}</Text>
          </View>
          <View style={styles.canDetail}>
            <Text style={styles.qty}>Empty Can</Text>
            <Text style={styles.numbers}>{this.props.waddress.water_quantity[1]}</Text>
          </View>
        </View>
        <View style={styles.detailWrapper}>
          <Text style={styles.Header}>Address:</Text>
          <Text style={styles.companyName}>{this.props.waddress.waddress_details['company']}</Text>
          <Text style={styles.companyAddress}>{this.props.waddress.waddress_details['address1']}</Text>
          <Text style={styles.companyAddress}>{this.props.waddress.waddress_details['city']}</Text>
          <Text style={styles.companyAddress}>{this.props.waddress.waddress_details['postcode']}</Text>
        </View>
      </View>}
      {this.state.datestring != null && this.state.success == false && 
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={this.onScan.bind(this)}>

        {this.state.imageUri != null ?
            <Image
              style={{width: (width*80)/100, height: (height*60)/100}}
              resizeMode="contain"
              source={{
              uri: this.state.imageUri
            }}/>:null}
            <Text style={styles.welcome}>
              Tap to choose image
            </Text>
        </TouchableOpacity>
      </View>}
      {this.state.datestring == null && this.state.success != true ? 
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnWrapper} onPress={this.onScan.bind(this)}>
            <Text style={styles.btnText}>Upload</Text>
          </TouchableOpacity>
      </View>:null}
      {this.state.datestring != null && this.state.success != true ?
       <View style={[styles.btnContainer]}>
          <TouchableOpacity style={styles.btnWrapper} onPress={this.submitDetails.bind(this)}>
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
      </View> : null}
      {this.state.success == true ?
        <View style={styles.successView}>
          <Animated.Image 
            source={require("./../../assets/img/success.png")} 
            style={[{width: 140, height:140 },{transform:[{ "scale": scale }]}]} />
          <Text style={styles.successHead}>Thank You</Text>
          <Text style={styles.successText}>You have uploaded DR successfully</Text>
          <TouchableOpacity style={styles.homeWrapper} onPress={this.onRedirect.bind(this)}>
            <Text style={styles.homeText}>Back to Home</Text>
          </TouchableOpacity>
        </View>:null
      }        
      </View>
    );
  }
}

const mapStateToProps = function(store) {
    return {
      loading: store.AuthState.loading,
      user: store.AuthState.user,
      waddress: store.WaterState
    };
  };
  
export default connect(mapStateToProps)(WaterDeliveryDR);

const styles = StyleSheet.create({
  loadingContainer:{
    flex:1,
    alignItems: 'center',
    marginTop: 140,
    position: 'absolute',
    elevation: 3,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  detailContainer:{
    flex: 1,
  },
  detailWrapper:{
    padding: 16,
    margin: 16,
    height: 200,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 6
    },
    shadowRadius: 0,
    shadowOpacity: 1.0
  },
  qtyDetailWrapper:{
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    
  },
  canDetail:{
    backgroundColor: '#075dff',
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
    margin: 8,
    width: 200,

  },
  Header:{
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  companyName:{
    color: '#343434',
    fontSize: 20,
    marginBottom: 4,
  },
  companyAddress:{
    color: '#343434',
    fontSize: 18,
    marginBottom: 4,
  },
  qty:{
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  numbers: {
    color: '#f1f1f1',
    fontSize: 24,
    
  },
  imageContainer: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    margin: 16,
    padding: 16,
    borderRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    alignItems: 'center'
  },
  welcome: {
    marginTop: 24,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderRadius: 16,
    color: '#383838',
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  scanButton: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30
  },
  btnContainer:{
    padding:8,
  },
  btnWrapper:{
    height: 50,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#841584',
  },
  homeWrapper:{
    height: 50,
    borderRadius: 4,
    padding: 10,
  },
  btnText:{
    color: '#fdfdfd',
    textAlign: 'center',
    fontSize: 20,
  },
  homeText:{
    color: '#22a5ff',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 32,
    paddingLeft: 32,
  },
  successView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successHead:{
    marginBottom: 8,
    marginTop: 8,
    color: '#841584',
    fontSize: 28,
    fontWeight: 'bold',
  },
  successText:{
    marginBottom: 8,
    marginTop: 8,
    color: '#841584',
    fontSize: 18,
    fontWeight: 'bold',
  }
});