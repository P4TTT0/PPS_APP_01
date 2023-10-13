import * as echarts from 'echarts/core';
import { Component } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Router} from '@angular/router';
import { BarChart, BarSeriesOption, PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { AfterViewInit, ElementRef } from '@angular/core';

import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
  GridComponent
} from 'echarts/components';
import { DataService } from 'src/app/services/data.service';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  BarChart,
  GridComponent
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption | BarSeriesOption
>;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage {

  public chartDom : HTMLElement | any;
  public myChart : any;
  public option: EChartsOption = {};
  public chartBarDom : HTMLElement | any;
  public myBarChart : any;
  public optionBar: EChartsOption = {};
  public images : any;
  public dataSource : { value: number; name: string }[] = [];
  public category : string [] = [];
  public uglyVotes : number [] = [];
  public nameUser : string = "";

  constructor(private auth : AutheticationService, private router : Router, public data : DataService) 
  {

  }

  public OnLogoutClick()
  {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  public OnChartClick()
  {
    this.router.navigate(['/charts']);
  }

  public async OnRefreshPieChart()
  {
    this.dataSource = await this.data.getImagesToChart();

    this.chartDom = document.getElementById('main');
    this.myChart = echarts.init(this.chartDom);
    
    this.option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'Votos',
          type: 'pie',
          radius: ['0%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 15,
            borderColor: '#fff',
            borderWidth: 3
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 100,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.dataSource
        }
      ]
    };
    
    this.option && this.myChart.setOption(this.option);
  }

  public async OnRefreshBarChartClick()
  {
    this.category = await this.data.getImagesToBarChartCategory();
    this.uglyVotes = await this.data.getImagesToBarChart();

    this.chartBarDom = document.getElementById('bar');
    this.myBarChart = echarts.init(this.chartBarDom);

    this.optionBar = {
      xAxis: {
        type: 'category',
        data: this.category
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.uglyVotes,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    this.optionBar && this.myBarChart.setOption(this.optionBar);
  }

  async ngAfterViewInit() 
  {
    let userUID = await this.auth.getUserUid() || '';
    this.nameUser = await this.data.getUserNameByUID(userUID);

    this.dataSource = await this.data.getImagesToChart();

    this.chartDom = document.getElementById('main');
    this.myChart = echarts.init(this.chartDom);
    
    this.option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'Votos',
          type: 'pie',
          radius: ['0%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 15,
            borderColor: '#fff',
            borderWidth: 3
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 100,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.dataSource
        }
      ]
    };
    
    this.option && this.myChart.setOption(this.option);

    window.addEventListener('resize', this.myChart.resize);

    this.category = await this.data.getImagesToBarChartCategory();
    this.uglyVotes = await this.data.getImagesToBarChart();

    this.chartBarDom = document.getElementById('bar');
    this.myBarChart = echarts.init(this.chartBarDom);

    this.optionBar = {
      xAxis: {
        type: 'category',
        data: this.category
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.uglyVotes,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    this.optionBar && this.myBarChart.setOption(this.optionBar);

    window.addEventListener('resize', this.myBarChart.resize);
  }


}
