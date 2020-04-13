import { State, Action, StateContext } from '@ngxs/store';
import { CustomResponse } from '../../services/auth/auth.service';
import { CreatePaymentIntent, UpdateBalance } from '../actions';
import { Injectable } from '@angular/core';
import { StripeService } from '../../services/stripe/stripe.service';
import { UserAPIService } from '../../services/api/user/user.service';

export interface DepositStateModel {
  clientSecret?: string;
  paymentComplete: boolean;
}

@Injectable()
@State<DepositStateModel>({
  name: 'deposit',
  defaults: {
    clientSecret: undefined,
    paymentComplete: false
  }
})
export class DepositState {

  public constructor(
    private _stripe: StripeService,
    private _userApi: UserAPIService
  ) { }

  @Action(CreatePaymentIntent)
  public async createPaymentIntent(ctx: StateContext<DepositStateModel>, action: CreatePaymentIntent): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._stripe.CreatePaymentIntent(action.amount);

    ctx.setState({
      ...state,
      clientSecret: res.clientSecret
    });
  }

  @Action(UpdateBalance)
  public async updateBalance(ctx: StateContext<DepositStateModel>, action: UpdateBalance): Promise<void> {
    const state = ctx.getState();
    const res: CustomResponse = await this._userApi.UpdateAccountBalance(ctx.getState().clientSecret);

    ctx.setState({
      ...state,
      paymentComplete: !!res.success
    });
  }

}
