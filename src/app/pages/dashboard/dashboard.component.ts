import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GraphPoint, Transaction, User } from '@moneyshare/common-types';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetGraphData, GetTransactionsPreview } from '../../ngxs/actions';
import * as CanvasJS from '../../../lib/canvas.min';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MoneyBottomSheetComponent } from '../../components/money-bottom-sheet/money-bottom-sheet.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  @Select(State => State.user.user) public user$: Observable<User>;
  @Select((State) => State.dashboard.transactions) public transactions$: Observable<Transaction[]>;
  @Select((State) => State.dashboard.graphData) public graphData$: Observable<GraphPoint[]>;
  @Dispatch() private getGraphData = (): GetGraphData => new GetGraphData();

  public constructor(
    private _store: Store,
    private _bottomSheet: MatBottomSheet
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(new GetTransactionsPreview()).subscribe(() => {
      this.getGraphData();
    });

    this.graphData$.subscribe((data: GraphPoint[]) => {
      if (data.length) this.renderGraph(data);
    });
  }

  private renderGraph = (dataPoints: GraphPoint[]): void => {
    console.log(dataPoints);
    const chart = new CanvasJS.Chart('chart-container', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Balance History'
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: 'line',
        indexLabelFontSize: 16,
        dataPoints: JSON.parse(JSON.stringify(dataPoints))
      }]
    });
    chart.render();
  }

  public moneyOptions = (): void => {
    this._bottomSheet.open(MoneyBottomSheetComponent);
  }

}
