import React from 'react';
import './TeslaBattery.css';

import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaStats from '../components/TeslaStats/TeslaStats';

import { getModelData } from '../services/BatteryService';

class TeslaBattery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          carstats: [],
          config: {
            speed: 55,
            temperature: 20,
            climate: true,
            wheels: 19
          }
        }
        this.calculateStats = this.calculateStats.bind(this);
        this.statsUpdate = this.statsUpdate.bind(this);
    }
    
    calculateStats = (models, value) => {
        const dataModels = getModelData();
        return models.map(model => {
          // ES6 Object destructuring Syntax,
          // takes out required values and create references to them
          const { speed, temperature, climate, wheels } = value;
          const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
          return {
            model,
            miles
          };
        });
    }
        
    statsUpdate() {
        const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
        // Fetch model info from BatteryService and calculate then update state
        this.setState({
            carstats: this.calculateStats(carModels, this.state.config)
        })  
    }
        
    componentDidMount() {
        this.statsUpdate(); 
    }

    render() {
        // ES6 Object destructuring Syntax,
        // takes out required values and create references to them
        const { config, carstats } = this.state;
        return (
        <form className="tesla-battery">
            <h1>Range Per Charge</h1>
            <TeslaCar wheelsize={config.wheels}/>
            <TeslaStats carstats={carstats}/>
            <TeslaNotice />
        </form>
        )
    }
}
export default TeslaBattery;