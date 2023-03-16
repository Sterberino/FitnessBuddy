import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../Styles/lineChartStyles.css"
import "../Styles/nutritionPageStyles.css"


class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
            toolbar : {
                show : false
            },
            zoom : {
                enabled : false
            },
            width : "100%",
            height: 200,
            offsetY : 18
            
        },
        dataLabels : {
            enabled : false
        },
       
        colors : ["rgba(190, 190, 190, 1)"],
        stroke : {
            width : 2,
            lineCap : "round"
        },
        grid : {
            borderColor : "rgba(190,190,190,0.25)",
            padding : {
                top: -15,
                right: 0,
                bottom: -8,
                left: 12
            }
        },
        markers : {
            strokeColors : "rgba(190, 190, 190, 1)"
        },
        yaxis : {
            lines: {
                show: false  //or just here to disable only x axis grids
               },
            tickAmount : 3,
            show : true,
            labels : {
                show : true,
                floating : true,
                style : {
                    colors : "rgba(190, 190, 190, 1)"
                }
            }
        },
        xaxis: {
            categories: props.data.map(item => item.x),
            tickAmount: 3,
            lines: {
                show: false  //or just here to disable only x axis grids
               },
            labels : {
                show : true,
                floating : true,
                style : {
                    colors : "rgba(190, 190, 190, 1)"
                }
            },
            axisBorder : {
                show : false
            },
            axisTicks: {
                show: false,
              },
            crosshairs : {
                show : false
            }, 
            type : "category"
        }, 
        fill : {
            type: "gradient",
            gradient : {
                type : "vertical",
                opacityFrom : 1,
                opacityTo : 0,
                stops : [0, 100],
                colorStops : [
                    {
                        offset : 0,
                        opacity: 0.2,
                        color : "rgb(190,190,190)"
                    },
                    {
                        offset : 100,
                        opacity: 0,
                        color :"rgb(190,190,190)"
                    }

                ]
            }
        }
      },
      series: [
        {
          name: "Weight (lb)",
          data: props.data.map(item => item.y)
        }
      ]
    };
  }




  render() {
    return (
        <div>
            <div className="weight-progress-header">
                <div className="title">{"Weight"}</div>
                <img className="add-button" src = {`${process.env.PUBLIC_URL}/Images/Plus-sign.png`} />
                <div className="nutrient-amount">{"last 90 days"}</div>
            </div>
           
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
            />
        </div>
          
            
            
    
    );
  }
}

export default AreaChart;