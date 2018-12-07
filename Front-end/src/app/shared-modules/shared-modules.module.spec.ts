import { SharedModulesModule } from './shared-modules.module';

describe('SharedModulesModule', () => {
  let sharedModulesModule: SharedModulesModule;

  beforeEach(() => {
    sharedModulesModule = new SharedModulesModule();
  });

  it('should create an instance', () => {
    expect(sharedModulesModule).toBeTruthy();
  });
});
