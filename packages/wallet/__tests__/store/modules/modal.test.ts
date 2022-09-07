import modal, { setRegisterStage, setTransactionStage } from 'store/modules/modal';

describe('store/modules/modal', () => {
  it('should set register stage', () => {
    const state = modal(undefined, setRegisterStage('verification'));
    expect(state.registerStage).toBe('verification');
  });

  it('should set transaction stage', () => {
    const state = modal(undefined, setTransactionStage('processing'));
    expect(state.transactionStage).toBe('processing');
  });
});
