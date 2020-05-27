import React, { Component,useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider,Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { G, Line, Defs, LinearGradient, Stop  } from 'react-native-svg'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'

const imgIron = require('./assets/images/iron.png')
const imgWood = require('./assets/images/wood.png')
const imgConcrete = require('./assets/images/concrete.png')
const imgPlastic = require('./assets/images/plastic.png')

const contentInset = { top: 20, bottom: 20 }
const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30
const zero = 0
const one = 1



export default class HelloWorldApp extends Component {

  constructor(){
    super();

    this.state={
 
      imageURL : 'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg',
      hierroString: './assets/images/iron.png',
      maderaString: './assets/images/wood.png',
      concretroString: './assets/images/concrete.png',
      plasticoString: './assets/images/plastic.png',
      actualMaterial : 'iron',
      actualMaterialImg : imgIron,
      options : [
        {
          key: 'iron',
          text: 'Hierro',
        },
        {
          key: 'wood',
          text: 'Madera',
        },
        {
          key: 'concrete',
          text: 'Concreto',
        },
        {
          key: 'plastic',
          text: 'Plástico',
        }],
      diametro:zero,
      longitudInicial:zero,
      longitudFinal:zero,
      areaInicial:one,
      areaFinal:one,
      fuerza:zero,
      esfuerzo:zero,
      data :[0, 0.35, 0.45, 0.52, 0.75, 1.4, 1.75, 2, 2.5, 3.25, 3.45, 3.12],
     
 
    }
  }


  
  
  
 
  changeImage = (value) => {

    switch (value) {
      case 'iron':
        this.setState({actualMaterialImg: imgIron})
        break;
      case 'wood':
        this.setState({actualMaterialImg: imgWood})
        break;
      case 'concrete':
        this.setState({actualMaterialImg: imgConcrete})
        break;
      case 'plastic':
        this.setState({actualMaterialImg: imgPlastic})
        break;
      default:
        this.setState({actualMaterialImg: imgIron})
        break;
    }

    this.setState({actualMaterial: value})
    
  }



  checkNumberInput = (text,variable) => {
    var numericRegex = /^([0-9]{0,15})+$/
    if (numericRegex.test(text) ) {

      let number = parseInt(text);
      
      

      switch (variable) {
        case 'diametro':
          (number > 15 || number < 0) ? this.setState({ diametro: 0 }) : this.setState({ diametro: text })
          break;
        case 'longitudInicial':
          (number > 15 || number < 0) ? this.setState({ longitudInicial: 0 }) : this.setState({ longitudInicial: text })
          break;
        case 'longitudFinal':
          (number > 15 || number < 0) ? this.setState({ longitudFinal: 0 }) : this.setState({ longitudFinal: text })
          break;
        case 'areaInicial':
          (number > 15 || number < 1) ? this.setState({ areaInicial: 0 }) : this.setState({ areaInicial: text, esfuerzo:parseInt(this.state.fuerza)/text })
          
          break;
        case 'areaFinal':
          (number > 15 || number < 0) ? this.setState({ areaFinal: 0 }) : this.setState({ areaFinal: text })
          break;
        case 'fuerza':
          (number > 15 || number < 0) ? this.setState({ fuerza: 0 }) : this.setState({ fuerza: text, esfuerzo:text/parseInt(this.state.areaInicial) })
          
          break;
      
        default:
          break;
      }

      

   
    }
  }






  render() {


    
    const Gradient = () => (
      <Defs key={'gradient'}>
          <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
              <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
              <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
          </LinearGradient>
      </Defs>
    )

    var data2 = [
      0,
      this.state.esfuerzo
    ]

    var dataFinal = [
      {
        data:this.state.data,
        svg:{
          strokeWidth:2,
          stroke:'url(#gradient)'
        },
      },
      {
        data:data2,
        svg: { stroke: 'green' },
      }
    ]

    

    const CustomGrid = ({ x, y, data, ticks }) => (
      <G>
          {
              // Horizontal grid
              ticks.map(tick => (
                  <Line
                      key={ tick }
                      x1={ '0%' }
                      x2={ '100%' }
                      y1={ y(tick) }
                      y2={ y(tick) }
                      stroke={ 'rgba(0,0,0,0.2)' }
                  />
              ))
          }
          {
              // Vertical grid
              data.map((_, index) => (
                  <Line
                      key={ index }
                      y1={ '0%' }
                      y2={ '100%' }
                      x1={ x(index) }
                      x2={ x(index) }
                      stroke={ 'rgba(0,0,0,0.2)' }
                  />
              ))
          }
      </G>
  )
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('./assets/images/robot-dev.png')
                : require('./assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
      

          <Text style={styles.getStartedText}>
            Bienvenido Ingeniero(a) Físico(a)
          </Text>
        </View>

        <View>
        <Text style={styles.getStartedText}>
            App para calcular ensayos de compresión.
          </Text>
        </View>

        <View>
          <Divider style={styles.divider}/>
        </View>

        <View>


          <Text style={styles.textGrayBg}>
            Materiales 
          </Text>

          

          <View style={styles.form1}>
            {/* <RadioButton options={this.state.options} onPress={this.changeImage()} /> */}

            <View>
              {this.state.options.map(item => {
                return (
                  <View key={item.key} style={styles.buttonContainer}>
                    <Text style={styles.mediumFont}>{item.text}</Text>
                    <TouchableOpacity
                      style={styles.circle}
                      onPress={   () => {this.changeImage(item.key)  }}
                    >
                      {this.state.actualMaterial === item.key && <View style={styles.checkedCircle} />}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View> 


          </View>
           
        </View>

		  <View style={styles.welcomeContainer}>
          <Image
            source={this.state.actualMaterialImg}
                
            
            style={styles.welcomeImage}
          />
        </View>


          <View>
           <Text style={styles.textGrayBg}>
            Datos 
          </Text>
           </View>


          <View style={styles.form1}>
          <View style={styles.marginTop}>
           <Input
            label="Diámetro (mm)"
            placeholder="Diámetro (mm)"
            value={this.state.diametro}
            leftIcon={{ type: 'font-awesome', name: 'dashcube' }}
            onChangeText={value => this.checkNumberInput(value,'diametro') }

            
            
            />
            
           </View>

           <View style={styles.marginTop}>
           <Input
            label="Longitud Inicial (mm)"
            placeholder="Longitud Inicial (mm)"
            leftIcon={{ type: 'font-awesome', name: 'fast-backward' }}
            value={this.state.longitudInicial}
            onChangeText={value => this.checkNumberInput(value,'longitudInicial') }
            />
           </View>

           <View style={styles.marginTop}>
           <Input
            label="Longitud Final (mm)"
            placeholder="Longitud Final (mm)"
            leftIcon={{ type: 'font-awesome', name: 'fast-forward' }}
            value={this.state.longitudFinal}
            onChangeText={value => this.checkNumberInput(value,'longitudFinal')}
            />
           </View>

           <View style={styles.marginTop}>
           <Input
            label="Área Inicial (m2)"
            placeholder="Área Inicial (m2)"
            leftIcon={{ type: 'font-awesome', name: 'area-chart' }}
            value={this.state.areaInicial}
            onChangeText={value => this.checkNumberInput(value,'areaInicial')}
            />
           </View>

           <View style={styles.marginTop}>
           <Input
            label="Área Final (m2)"
            placeholder="Área Final (m2)"
            leftIcon={{ type: 'font-awesome', name: 'area-chart' }}
            value={this.state.areaIareaFinalnicial}
            onChangeText={value => this.checkNumberInput(value,'areaFinal')}
            />
           </View>

           <View style={styles.marginTop}>
           <Input
            label="Fuerza (N)"
            placeholder="Fuerza (N)"
            leftIcon={{ type: 'font-awesome', name: 'send' }}
            value={this.state.fuerza}
            onChangeText={value => this.checkNumberInput(value,'fuerza')}
            />
           </View>

          </View>
          


          <View>
           <Text style={styles.textGrayBg}>
            Resultados 
          </Text>
           </View>

           <View style={styles.form1}>

                <View style={styles.marginTop}>
                
                <Text>
                Esfuerzo de Ingeniería (MP) : {this.state.fuerza/this.state.areaInicial}
                </Text>
               
                </View>

                <View style={styles.marginTop}>

                <Text>
                Deformación en Ingeniería £ (mm) : {(this.state.longitudInicial - this.state.longitudFinal)/this.state.longitudFinal }
                </Text>
               
              
                </View>

                <View style={styles.marginTop}>

                <Text>
                Módulo de eslasticidad E (Mpa) : {(this.state.fuerza/this.state.areaInicial)/((this.state.longitudInicial - this.state.longitudFinal)/this.state.longitudFinal)}
                </Text>


                </View>

                <View style={styles.marginTop}>

                <Text>
                % de Elongación (% EL) : {((this.state.longitudFinal - this.state.longitudInicial)/this.state.longitudInicial)*100}
                </Text>


                </View>

                <View style={styles.marginTop}>

                <Text>
                % Reducción de área (% RA) : {((this.state.areaFinal - this.state.areaInicial)/this.state.areaInicial)*100}
                </Text>


                </View>




           </View>

           <View>
          <Divider style={styles.divider}/>
        </View>

           <View>
           <Text style={styles.textGrayBg}>
            Gráficas 
          </Text>
           </View>

           <View>
          <Divider style={styles.divider}/>
        </View>


           <View >
           <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={this.state.data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={dataFinal}
                        contentInset={verticalContentInset}
                        
                    >
                         <CustomGrid belowChart={true}/>
                        <Gradient/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={this.state.data}
                        
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
           </View>

           <View>
          <Divider style={styles.divider}/>
        </View>

        <View>
          <Divider style={styles.divider}/>
        </View>






       
      </ScrollView>

      

   
    </View>
    );
  }
}



const styles = StyleSheet.create({

  mediumFont: {
    fontSize:17
  },

  iconGray: {
    color:'#ccc'
  },

  marginTop : {
    marginTop:20
  },

  buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
	},

	circle: {
		height: 40,
		width: 40,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	checkedCircle: {
		width: 36,
		height: 36,
		borderRadius: 7,
		backgroundColor: '#794F9B',
	},


  divider : {
    paddingVertical:20,
    backgroundColor:'#fff'
  },

  getStartedText2: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingTop:10,
    
  },

  form1 : {
    paddingHorizontal:20,
    marginLeft:10,
    paddingTop:10,
  },

  textGrayBg : {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    backgroundColor:'#dedede',
    paddingVertical:10,
  },

  header : {

    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

